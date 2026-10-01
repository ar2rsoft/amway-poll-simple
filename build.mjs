// Сборка опросника:
//   langs/*.yaml + app.js → app.min.js
//   style.css             → style.min.css
//
// node build.mjs          — минифицированная сборка (для релиза)
// node build.mjs --watch  — пересборка при изменении app.js, style.css или langs/*.yaml
import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import {load as loadYaml} from "js-yaml";

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const LANGS_DIR = path.join(ROOT, "langs");
// Эталонный язык: остальные должны содержать те же ключи
const BASE_LANG = "ru";
const QUESTIONS_COUNT = 10;

const watch = process.argv.includes("--watch");

// Собирает пути всех ключей: first.title, form.answers, ...
// Массивы считаются листьями — их длина проверяется отдельно
function keyPaths(obj, prefix = "") {
  return Object.entries(obj).flatMap(([key, value]) => {
    const p = prefix ? `${prefix}.${key}` : key;
    return value && typeof value === "object" && !Array.isArray(value) ? keyPaths(value, p) : [p];
  });
}

function loadLangs() {
  const files = fs.readdirSync(LANGS_DIR).filter((f) => /\.ya?ml$/.test(f)).sort();
  const langs = {};
  for (const file of files) {
    const code = path.basename(file).replace(/\.ya?ml$/, "");
    try {
      langs[code] = loadYaml(fs.readFileSync(path.join(LANGS_DIR, file), "utf8"));
    } catch (e) {
      throw new Error(`langs/${file}: ошибка YAML\n${e.message}`);
    }
  }
  return langs;
}

function validate(langs) {
  const base = langs[BASE_LANG];
  if (!base) throw new Error(`Нет эталонного файла langs/${BASE_LANG}.yaml`);
  const baseKeys = keyPaths(base);
  const errors = [];

  for (const [code, data] of Object.entries(langs)) {
    const keys = new Set(keyPaths(data ?? {}));
    const missing = baseKeys.filter((k) => !keys.has(k));
    if (missing.length) errors.push(`${code}: нет ключей ${missing.join(", ")}`);

    if (data?.questions?.length !== QUESTIONS_COUNT) {
      errors.push(`${code}: вопросов ${data?.questions?.length ?? 0}, нужно ${QUESTIONS_COUNT}`);
    }
    if (data?.form?.answers?.length !== base.form.answers.length) {
      errors.push(`${code}: вариантов ответа должно быть ${base.form.answers.length}`);
    }
    // points: либо одна форма для всех чисел, либо 4 формы как в ru
    if (![1, 4].includes(data?.form?.points?.length)) {
      errors.push(`${code}: form.points должен содержать 1 или 4 формы`);
    }
  }

  if (errors.length) throw new Error(`Ошибки в переводах:\n  ${errors.join("\n  ")}`);
}

// Подставляет переводы вместо __I18N__ при чтении app.js. Переводы читаются
// заново при каждой пересборке, поэтому в --watch режиме изменения в
// langs/*.yaml подхватываются без перезапуска
const i18nPlugin = {
  name: "i18n",
  setup(build) {
    build.onLoad({filter: /[\\/]app\.js$/}, async (args) => {
      try {
        const langs = loadLangs();
        validate(langs);
        console.log(`Языки: ${Object.keys(langs).join(", ")}`);
        const source = await fs.promises.readFile(args.path, "utf8");
        const placeholder = /\bI18N = __I18N__;/;
        if (!placeholder.test(source)) throw new Error("В app.js нет строки const I18N = __I18N__;");
        // Функция вместо строки — чтобы $ в переводах не воспринимались как шаблон замены
        const contents = source.replace(placeholder, () => `I18N = ${JSON.stringify(langs)};`);
        return {contents, loader: "js"};
      } catch (e) {
        return {errors: [{text: e.message}]};
      }
    });
  },
};

const common = {
  minify: !watch,
  target: "es2020",
  charset: "utf8",
  logLevel: "info",
};

const jsOptions = {
  ...common,
  entryPoints: [path.join(ROOT, "app.js")],
  outfile: path.join(ROOT, "app.min.js"),
  // Плагины esbuild работают только в режиме bundle; импортов в app.js нет,
  // так что на результат это не влияет
  bundle: true,
  plugins: [i18nPlugin],
};

const cssOptions = {
  ...common,
  entryPoints: [path.join(ROOT, "style.css")],
  outfile: path.join(ROOT, "style.min.css"),
};

if (watch) {
  const js = await esbuild.context(jsOptions);
  const css = await esbuild.context(cssOptions);
  await Promise.all([js.watch(), css.watch()]);

  // esbuild следит только за файлами сборки — yaml отслеживаем сами
  fs.watch(LANGS_DIR, (_, file) => {
    if (file && /\.ya?ml$/.test(file)) js.rebuild().catch(() => {});
  });
  console.log("Слежу за изменениями… (Ctrl+C — выход)");
} else {
  try {
    await esbuild.build(jsOptions);
    await esbuild.build(cssOptions);
  } catch {
    process.exit(1);
  }

  const size = (f) => fs.statSync(path.join(ROOT, f)).size;
  console.log(`app.min.js: ${size("app.min.js")} байт (было ${size("app.js")} + langs/)`);
  console.log(`style.min.css: ${size("style.min.css")} байт (было ${size("style.css")})`);
}
