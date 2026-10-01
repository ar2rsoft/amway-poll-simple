(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Тексты и вопросы лежат в langs/<код языка>.yaml. При сборке (build.mjs)
  // все файлы собираются в объект { ru: {...}, mn: {...}, ... } и
  // подставляются вместо __I18N__
  // ---------------------------------------------------------------------------
  const I18N = __I18N__;

  // Название продукта одинаково во всех языках
  const PRODUCT = "Nutrilite™ Double Energy";

  // Интерпретация суммы баллов (legend в БД)
  const LEGENDS = [
    {min: 0, max: 6, key: "low", badge: "de-badge--green"},
    {min: 7, max: 13, key: "medium", badge: "de-badge--orange"},
    {min: 14, max: 20, key: "high", badge: "de-badge--red"},
  ];

  const STORAGE = {
    step: "double-energy-step",
    answers: "double-energy-answers",
    history: "double-energy-history",
  };

  // Сколько последних прохождений хранить в истории
  const HISTORY_LIMIT = 20;

  const BUTTON_SELECTOR = ".double-energy-poll-button";
  const INLINE_SELECTOR = ".double-energy-poll";

  const ARROW =
      '<svg class="de-btn__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>';

  // Картинки лежат в assets/ рядом с app.js — путь считаем от самого скрипта,
  // чтобы опросник работал на странице из любой папки
  const ASSETS = new URL("assets/", document.currentScript?.src || location.href).href;

  const asset = (name) => ASSETS + name;

  // ---------------------------------------------------------------------------
  // Язык: data-lang → window.amw.languageCode → <html lang> → первая часть
  // адреса (/kz/...) → ru
  // ---------------------------------------------------------------------------
  function normalizeLocale(code) {
    const c = String(code || "").toLowerCase().split("-")[0];
    return c === "kk" ? "kz" : c;
  }

  function detectLocale(code) {
    const candidates = [
      code,
      window.amw?.languageCode,
      document.documentElement.lang,
      location.pathname.split("/")[1],
    ];
    return candidates.map(normalizeLocale).find((c) => I18N[c]) || "ru";
  }

  // Параметры опросника берутся из data-атрибутов кнопки (или блока):
  //   data-lang="код языка (имя файла в langs/)" data-logo="путь к логотипу" data-product="путь к фото продукта"
  //   data-buy="ссылка на страницу покупки" data-energy-logo="путь к логотипу Double Energy"
  //   data-form-image="путь к картинке на первом экране"
  // Если data-logo / data-product / data-buy / data-energy-logo / data-form-image
  // не указаны, элемент просто не выводится
  function readOptions({lang, logo, product, buy, energyLogo, formImage} = {}) {
    return {lang: detectLocale(lang), logo, product, buy, energyLogo, formImage};
  }

  // Параметры текущей отрисовки. Каждый экземпляр опросника выставляет свои
  // перед render(), поэтому встроенный и всплывающий опросники не мешают друг другу
  let current = readOptions();
  let t = I18N[current.lang];

  function useOptions(options) {
    current = options;
    t = I18N[options.lang];
  }

  // Правило множественного числа из boot/i18n.js
  function pluralIndex(n, length) {
    if (length === 1 || n === 0) return 0;
    const teen = n > 10 && n < 20;
    if (!teen && n % 10 === 1) return 1;
    if (!teen && n % 10 >= 2 && n % 10 <= 4) return 2;
    return 3;
  }

  function points(n) {
    const forms = t.form.points;
    return forms[pluralIndex(n, forms.length)].replace("{n}", n);
  }

  // Диапазоны идут по возрастанию, поэтому достаточно проверить верхнюю границу
  const getLegend = (score) => LEGENDS.find((l) => score <= l.max) ?? LEGENDS.at(-1);

  const interpretation = (score) => t.last.results[getLegend(score).key];

  // ---------------------------------------------------------------------------
  // Состояние (только в браузере, в localStorage)
  // ---------------------------------------------------------------------------
  function load(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* приватный режим и т.п. — работаем без сохранения */
    }
  }

  const state = {
    step: load(STORAGE.step, 0),
    answers: load(STORAGE.answers, {}),
    history: load(STORAGE.history, []),
  };

  // Меняет поле состояния и сразу сохраняет его
  function update(key, value) {
    state[key] = value;
    save(STORAGE[key], value);
  }

  const isAnswered = (i) => typeof state.answers[i] === "number";

  const totalScore = () =>
      t.questions.reduce((sum, _, i) => sum + (isAnswered(i) ? state.answers[i] : 0), 0);

  const allAnswered = () => t.questions.every((_, i) => isAnswered(i));

  // ---------------------------------------------------------------------------
  // Разметка шагов. Переносы строк в текстах выводит CSS (white-space: pre-line),
  // поэтому текст внутри .de-title / .de-text пишем без лишних пробелов
  // ---------------------------------------------------------------------------
  // Шапка состоит только из логотипа, поэтому без data-logo её нет совсем
  function renderHeader() {
    if (!current.logo) return "";
    return `
      <header class="de-header">
        <div class="de-container">
          <img src="${current.logo}" class="de-logo" alt="Nutrilite">
        </div>
      </header>`;
  }

  const renderTitle = (text) =>
      `<div class="de-container"><h1 class="de-title">${text}</h1></div>`;

  function renderWelcome() {
    return `
      ${renderTitle(t.first.title)}
      <div class="de-welcome">
        <div class="de-welcome__content">
          ${current.energyLogo ? `<img src="${current.energyLogo}" class="de-welcome__logo" alt="Double Energy">` : ""}
          <p class="de-text">${t.first.description}</p>
          <p class="de-caption">${t.first.disclaimer}</p>
          <button type="button" class="de-btn de-welcome__start" data-action="start">${t.first.start}${ARROW}</button>
          
        </div>
        ${current.formImage ? `<div class="de-welcome__image" style="background-image: url('${current.formImage}')"></div>` : ""}
      </div>`;
  }

  // Балл ответа совпадает с его индексом в t.form.answers: 0 / 1 / 2
  const answerLabel = (score) => `${score} — ${t.form.answers[score]}`;

  function renderAnswer(qi, score) {
    const selected = state.answers[qi] === score;
    return `
      <td class="de-answer${selected ? " is-selected" : ""}">
        <label class="de-radio">
          <input type="radio" name="de-q${qi}" value="${score}" data-question="${qi}"${selected ? " checked" : ""}>
          <span class="de-radio__mark"></span>
          <span class="de-answer__hint">${answerLabel(score)}</span>
        </label>
      </td>`;
  }

  function renderForm() {
    const scores = t.form.answers.map((_, score) => score);
    const header = scores.map((score) => `<th>${answerLabel(score)}</th>`).join("");

    const rows = t.questions.map((question, qi) => `
      <tr class="de-question" data-index="${qi}">
        <td class="de-question__text"><b>${qi + 1}.</b><span>${question}</span></td>
        ${scores.map((score) => renderAnswer(qi, score)).join("")}
      </tr>`).join("");

    return `
      ${renderTitle(PRODUCT)}
      <div class="de-container de-form">
        <p class="de-subtitle">${t.form.subtitle}</p>
        <table class="de-table">
          <tbody>
            <tr class="de-table__header">
              <th class="de-table__question-col">${t.form.question}</th>
              ${header}
            </tr>
            ${rows}
          </tbody>
        </table>
        <div class="de-actions">
          <button type="button" class="de-btn de-btn--flat de-btn--back" data-action="back">${ARROW}${t.form.prev}</button>
          <button type="button" class="de-btn de-btn--lg" data-action="result"${allAnswered() ? "" : " disabled"}>${t.form.result}${ARROW}</button>
        </div>
      </div>`;
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  // Снижение баллов — улучшение, рост — ухудшение. Иконка — assets/<key>.svg
  const DYNAMICS_MOD = {decreased: "good", increased: "bad", same: "same"};

  function renderDynamics(list, idx) {
    if (idx === 0) return '<span class="de-muted">—</span>';

    const diff = list[idx].score - list[idx - 1].score;
    const key = diff < 0 ? "decreased" : diff > 0 ? "increased" : "same";
    const delta = diff === 0 ? "" : ` (${diff > 0 ? "+" : ""}${Math.abs(diff)} ${t.form.pointsShort})`;

    return `<span class="de-dyn de-dyn--${DYNAMICS_MOD[key]}"><img src="${asset(`${key}.svg`)}" alt="">${t.last.dynamics[key]}${delta}</span>`;
  }

  function renderHistory() {
    const list = state.history;
    if (list.length <= 1) return "";

    const rows = list.map((res, idx) => `
      <tr>
        <td>${formatDate(res.createdAt)}</td>
        <td class="de-center de-history__score">${points(res.score)}</td>
        <td>${interpretation(res.score)}</td>
        <td class="de-center">${renderDynamics(list, idx)}</td>
      </tr>`).join("");

    return `
      <div class="de-history">
        <div class="de-container">
          <h2 class="de-h5">${t.last.history}</h2>
          <div class="de-history__scroll">
            <table class="de-history__table">
              <thead>
                <tr>
                  <th>${t.last.date}</th>
                  <th class="de-center">${t.last.score}</th>
                  <th>${t.last.interpretation}</th>
                  <th class="de-center">${t.last.dynamicsTitle}</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  // Ссылка на покупку (data-buy). Без ссылки выводим только содержимое
  function buyLink(className, content) {
    if (!current.buy) return content;
    return `<a href="${current.buy}" class="${className}" target="_blank" rel="noopener">${content}</a>`;
  }

  function renderResult() {
    const score = totalScore();

    return `
      ${renderTitle(t.last.title)}
      <div class="de-result">
        <div class="de-container de-result__grid">
          <div class="de-result__info">
            <div class="de-result__points">${points(score)}</div>
            <div class="de-badge ${getLegend(score).badge}">${interpretation(score)}</div>
            <p class="de-text de-result__description">${t.last.productDescription}</p>
          </div>
          <div class="de-result__product">
            ${buyLink("de-result__link", `
              ${current.product ? `<img src="${current.product}" alt="Nutrilite Double Energy">` : ""}
              <div class="de-h5">${PRODUCT}</div>`)}
            ${current.buy ? buyLink("de-btn de-result__buy", t.last.buy) : ""}
          </div>
          <div class="de-result__retry">
            <button type="button" class="de-btn" data-action="retry">${t.last.retry}</button>
          </div>
        </div>
        ${renderHistory()}
      </div>`;
  }

  const STEPS = [renderWelcome, renderForm, renderResult];

  // ---------------------------------------------------------------------------
  // Экземпляр опросника: root — куда рисуем, scroller — что прокручиваем
  // (window для встроенного на страницу, окно модалки для всплывающего)
  // ---------------------------------------------------------------------------
  function createSurvey(container, scroller) {
    container.classList.add("de-survey");
    container.innerHTML = '<div class="de-main"></div>';

    const app = container.querySelector(".de-main");
    const isWindow = scroller === window;
    let options = current;

    // У window и у элемента одинаковый метод scrollTo
    const scrollTo = (top, smooth) => scroller.scrollTo({top, behavior: smooth ? "smooth" : "auto"});

    function offsetTop(el) {
      const top = el.getBoundingClientRect().top;
      return isWindow
          ? top + window.scrollY
          : top - scroller.getBoundingClientRect().top + scroller.scrollTop;
    }

    // Без аргумента перерисовывает с последними переданными параметрами
    function render(next = options) {
      options = next;
      useOptions(options);

      container.querySelector(".de-header")?.remove();
      app.insertAdjacentHTML("beforebegin", renderHeader());

      if (!STEPS[state.step]) update("step", 0);
      if (state.step === 2 && !allAnswered()) update("step", 1);

      app.className = `de-main de-main--step${state.step}`;
      app.innerHTML = STEPS[state.step]();
    }

    function goTo(step) {
      update("step", step);
      render();
      scrollTo(isWindow ? offsetTop(container) : 0);
    }

    function selectAnswer(questionIndex, score) {
      update("answers", {...state.answers, [questionIndex]: score});

      // Обновляем только подсветку ячеек, чтобы не сбивать прокрутку
      const row = app.querySelector(`.de-question[data-index="${questionIndex}"]`);
      row.querySelectorAll(".de-answer").forEach((cell) => {
        cell.classList.toggle("is-selected", cell.querySelector("input").checked);
      });
      app.querySelector('[data-action="result"]').disabled = !allAnswered();

      const next = app.querySelector(`.de-question[data-index="${questionIndex + 1}"]`);
      if (next) scrollTo(offsetTop(next) - 80, true);
    }

    function showResult() {
      if (!allAnswered()) return;
      const entry = {createdAt: new Date().toISOString(), score: totalScore()};
      update("history", [...state.history, entry].slice(-HISTORY_LIMIT));
      goTo(2);
    }

    function retry() {
      update("answers", {});
      goTo(1);
    }

    const actions = {
      start: () => goTo(1),
      back: () => goTo(0),
      result: showResult,
      retry,
    };

    app.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (button && !button.disabled) actions[button.dataset.action]?.();
    });

    // Вся ячейка ответа — это <label>, поэтому достаточно отслеживать change у radio
    app.addEventListener("change", (event) => {
      const input = event.target;
      if (input.dataset.question !== undefined) {
        selectAnswer(Number(input.dataset.question), Number(input.value));
      }
    });

    return {render};
  }

  // ---------------------------------------------------------------------------
  // Всплывающее окно
  // ---------------------------------------------------------------------------
  let modal = null;
  let modalScroll = null;
  let modalSurvey = null;

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "de-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="de-modal__window">
        <button type="button" class="de-modal__close" aria-label="Close">&times;</button>
        <div class="de-modal__scroll"><div class="de-modal__survey"></div></div>
      </div>`;
    document.body.appendChild(modal);

    modalScroll = modal.querySelector(".de-modal__scroll");
    modalSurvey = createSurvey(modal.querySelector(".de-modal__survey"), modalScroll);

    modal.querySelector(".de-modal__close").addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
  }

  // params: {lang, logo, product, buy} — всё необязательно, см. readOptions
  function open(params) {
    if (!modal) buildModal();
    modalSurvey.render(readOptions(params));
    modal.setAttribute("aria-label", t.first.title);
    modalScroll.scrollTop = 0;
    modal.classList.add("is-open");
    document.documentElement.classList.add("de-modal-open");
  }

  function close() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.documentElement.classList.remove("de-modal-open");
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(BUTTON_SELECTOR);
    if (!button) return;
    event.preventDefault();
    open(button.dataset);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) close();
  });

  // ---------------------------------------------------------------------------
  // Встроенный на страницу опросник: <div class="double-energy-poll"></div>
  // ---------------------------------------------------------------------------
  function mountInline() {
    document.querySelectorAll(INLINE_SELECTOR).forEach((el) => {
      createSurvey(el, window).render(readOptions(el.dataset));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountInline);
  } else {
    mountInline();
  }

  window.DoubleEnergyPoll = {open, close};
})();
