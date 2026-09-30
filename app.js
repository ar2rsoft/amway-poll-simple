(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Тексты и вопросы (перенесены из double-energy-frontend/src/locales и
  // double-energy-backend/src/main/resources/db/migration/*.sql)
  // ---------------------------------------------------------------------------
  const I18N = {
    ru: {
      first: {
        title: "Онлайн диагностика",
        description:
            "Проверьте уровень своей энергии и восстановления.\nИногда усталость накапливается незаметно — этот короткий опрос поможет понять, есть ли сигналы, на которые стоит обратить внимание.",
        start: "Начать",
        disclaimer:
            "Разработан совместно с Научно&#8209;исследовательским институтом профилактической медицины им. академика Е.Д. Даленова",
      },
      form: {
        subtitle: "Проверьте уровень своей энергии и восстановления",
        question: "Вопрос",
        answers: ["нет", "иногда", "часто"],
        prev: "Назад",
        result: "Результат",
        points: ["0 баллов", "{n} балл", "{n} балла", "{n} баллов"],
        pointsShort: "б.",
      },
      last: {
        title: "Результат диагностики",
        retry: "Пройти повторно",
        buy: "Купить",
        productDescription:
            "Nutrilite™ Double Energy – это ключ к заботе о себе и своей семье, поддержанию общего состояния здоровья, повышению уровня энергии.\n\nNutrilite™ Double Energy — это системное решение, созданное для комплексной поддержки организма, восстановления ресурса и профилактики дефицитных состояний. Теперь с улучшенной формулой Омега-3 Комплекс Плюс, обеспечивающей более высокую усвояемость и экологичность.\n\nЭффективность данного подхода была подтверждена в исследовании Научно-исследовательского института профилактической медицины им. академика Е. Д. Даленова.",
        results: {
          low: "По результатам теста, у вас низкий риск наличия дефицитов витаминов и минералов",
          medium: "По результатам теста, у вас возможные субклинические дефициты витаминов и минералов",
          high: "По результатам теста, у вас высокая вероятность полидефицита витаминов и минералов",
        },
        history: "История прохождений",
        date: "Дата",
        score: "Баллы",
        interpretation: "Интерпретация",
        dynamicsTitle: "Динамика",
        dynamics: {
          decreased: "Уровень риска снизился (улучшение)",
          same: "Уровень риска остался на прежнем уровне",
          increased: "Уровень риска повысился",
        },
      },
      questions: [
        "Чувствуете ли вы усталость, снижение энергии, необходимость часто стимулировать себя кофе или сладким?",
        "Отмечаете ли вы трудности с концентрацией, забывчивость или ощущение «тумана в голове»?",
        "Часто ли вы испытываете раздражительность, снижение настроения, тревожность или повышенную эмоциональную утомляемость?",
        "Есть ли нарушения сна или ощущение, что сон не приносит полноценного восстановления?",
        "Бывают ли у вас мышечные судороги, боли, скованность или медленное восстановление после физической нагрузки?",
        "Стали ли вы чаще болеть или дольше восстанавливаться после инфекций?",
        "Замечаете ли вы сухость кожи, ломкость ногтей или ухудшение качества волос?",
        "Часто ли у вас вздутие, нестабильный стул или ощущение тяжести после еды?",
        "Отмечаете ли вы усталость глаз, повышенную чувствительность к свету или снижение зрения?",
        "Есть ли у вас несколько факторов риска: редкое потребление рыбы и овощей, стресс, диеты, редкое пребывание на солнце?",
      ],
    },

    kz: {
      first: {
        title: "Сауалнама",
        description:
            "Энергия мен қалпына келу деңгейіңізді тексеріңіз.\nКейде шаршау байқалмай жинала береді — осы қысқа сауалнама назар аударуға тұрарлық белгілер бар-жоғын түсінуге көмектеседі.",
        start: "Бастау",
        disclaimer:
            "Академик Е.Д. Даленов атындағы Профилактикалық медицина ғылыми&#8209;зерттеу институтымен бірлесіп әзірленген",
      },
      form: {
        subtitle: "Энергия мен қалпына келу деңгейіңізді тексеріңіз",
        question: "Сұрақ",
        answers: ["жоқ", "кейде", "жиі"],
        prev: "Артқа",
        result: "Нәтиже",
        points: ["{n} ұпай"],
        pointsShort: "ұпай",
      },
      last: {
        title: "Диагностика нәтижесі",
        retry: "Қайта өту",
        buy: "Сатып алу",
        productDescription:
            "Nutrilite™ Double Energy – өзіңізге және отбасыңызға қамқорлық жасаудың, жалпы денсаулық жағдайын қолдаудың, энергия деңгейін арттырудың кілті.\n\nNutrilite™ Double Energy — ағзаны кешенді қолдау, ресурсты қалпына келтіру және тапшылық жағдайларының алдын алу үшін жасалған жүйелі шешім. Енді сіңімділігі мен экологиялық тазалығы жоғары Омега-3 Комплекс Плюс жақсартылған формуласымен.\n\nБұл тәсілдің тиімділігі академик Е.Д. Даленов атындағы Профилактикалық медицина ғылыми-зерттеу институтының зерттеуінде расталды.",
        results: {
          low: "Тест нәтижесі бойынша сізде дәрумен мен минералдар тапшылығының қаупі төмен.",
          medium: "Тест нәтижесі бойынша сізде дәрумен мен минералдардың субклиникалық тапшылығы болуы мүмкін.",
          high: "Тест нәтижесі бойынша сізде дәрумен мен минералдардың полидефицитінің жоғары ықтималдығы бар.",
        },
        history: "Өту тарихы",
        date: "Күні",
        score: "Ұпай",
        interpretation: "Түсіндірме",
        dynamicsTitle: "Динамика",
        dynamics: {
          decreased: "Қауіп деңгейі төмендеді (жақсару)",
          same: "Қауіп деңгейі бұрынғы қалпында қалды",
          increased: "Қауіп деңгейі артты",
        },
      },
      questions: [
        "Сіз шаршауды, энергияңыздың төмендеуін, өзіңізді жиі кофе немесе тәттімен ширату қажеттілігін сезесіз бе?",
        "Зейіннің төмендеуі, ұмытшақтық немесе «бастағы тұман» сезімін байқайсыз ба?",
        "Сіз ашушаңдықты, көңіл-күйдің төмендеуін, мазасыздықты немесе эмоционалдық шаршауды жиі сезесіз бе?",
        "Ұйқы бұзылыстары немесе ұйқы толық қалпына келтірмейді деген сезім бар ма?",
        "Бұлшықет құрысуы, ауырсынуы, қаттылығы немесе дене шынықтырудан кейін баяу қалпына келу болады ма?",
        "Жиі ауыратын болдыңыз ба немесе инфекциядан кейін ұзақ қалпына келесіз бе?",
        "Терінің құрғауын, тырнақтардың сынғыштығын немесе шаштың нашарлауын байқайсыз ба?",
        "Іштің кебуі, тұрақсыз нәжіс немесе тамақтан кейін ауырлық сезімі жиі болады ма?",
        "Көздің шаршауын, жарыққа сезімталдықтың жоғарылауын немесе көру қабілетінің төмендеуін байқайсыз ба?",
        "Сізде бірнеше қауіп факторы бар ма: балық пен көкөністерді сирек тұтыну, стресс, диета, күн сәулесінде сирек болу?",
      ],
    },

    mn: {
      first: {
        title: "Онлайн оношилгоо",
        description:
            "Энерги болон сэргэлтийнхээ түвшинг шалгаарай.\nЗаримдаа ядаргаа мэдрэгдэхгүй хуримтлагддаг — энэхүү богино асуумж нь анхаарал хандуулах ёстой шинж тэмдэг байгаа эсэхийг тодорхойлоход тусална.",
        start: "Эхлэх",
        disclaimer:
            "Академич Е.Д. Даленовын нэрэмжит Урьдчилан сэргийлэх анагаах ухааны эрдэм шинжилгээний хүрээлэнтэй хамтран боловсруулав",
      },
      form: {
        subtitle: "Энерги болон сэргэлтийнхээ түвшинг шалгаарай",
        question: "Асуулт",
        answers: ["үгүй", "заримдаа", "байнга"],
        prev: "Буцах",
        result: "Үр дүн",
        points: ["{n} оноо"],
        pointsShort: "оноо",
      },
      last: {
        title: "Оношилгооны үр дүн",
        retry: "Дахин оролдоно уу",
        buy: "Худалдан авах",
        productDescription:
            "Nutrilite™ Double Energy – энэ бол өөртөө болон гэр бүлдээ анхаарал халамж тавих, эрүүл мэндийн ерөнхий байдлыг дэмжих, эрч хүчний түвшинг нэмэгдүүлэх түлхүүр юм.\n\nNutrilite™ Double Energy — бие махбодыг иж бүрэн дэмжих, нөөцийг сэргээх болон дутагдалд орохоос сэргийлэхэд зориулсан системтэй шийдэл юм.\n\nЭнэхүү хандлагын үр дүнг академич Е. Д. Даленовын нэрэмжит Урьдчилан сэргийлэх анагаах ухааны эрдэм шинжилгээний хүрээлэнгийн судалгаагаар нотолсон болно.",
        results: {
          low: "Тестийн дүнгээс харахад витамин, эрдэс бодисын дутагдалд орох эрсдэл бага байна.",
          medium: "Тестийн дүнгээс харахад витамин, эрдэс бодисын далд (субклиник) дутагдал байж болзошгүй.",
          high: "Тестийн дүнгээс харахад витамин, эрдэс бодисын олон төрлийн дутагдал үүсэх магадлал өндөр байна.",
        },
        history: "Түүх",
        date: "Огноо",
        score: "Оноо",
        interpretation: "Тайлбар",
        dynamicsTitle: "Өөрчлөлт",
        dynamics: {
          decreased: "Эрсдэлийн түвшин буурсан",
          same: "Эрсдэлийн түвшин өмнөх хэвээр байна",
          increased: "Эрсдэлийн түвшин нэмэгдсэн",
        },
      },
      questions: [
        "Та ядрах, эрч хүч буурах, өөрийгөө кофе, чихэрлэг зүйлээр байнга идэвхжүүлэх хэрэгцээтэй байдаг уу?",
        "Анхаарал төвлөрүүлэхэд хүндрэлтэй, мартамхай, эсвэл «тархи манартсан» мэдрэмж төрдөг үү?",
        "Та цухалдах, сэтгэл санаа муудах, түгшүүр, сэтгэл хөдлөлийн ядаргааг байнга мэдэрдэг үү?",
        "Унтах байдал алдагдсан эсвэл унтсаны дараа сэргэхгүй мэдрэмж төрдөг үү?",
        "Булчингийн татвалзах, өвдөх, хөшингөшөх, биеийн дасгал хийсний дараа удаан сэргэх зэрэг асуудал байдаг уу?",
        "Та сүүлийн үед илүү олон удаа өвдөж, халдварын дараа удаан сэргэдэг болсон уу?",
        "Арьс хуурайших, хумс хэврэгших, үс муудах байдлыг анзаардаг уу?",
        "Гэдэс дүүрэх, тогтворгүй өтгөн ялгадас, хооллосны дараа дарамтлах мэдрэмж байнга гардаг уу?",
        "Нүд ядрах, гэрэлд мэдрэмтгий байх, харааны чадвар буурахыг анзаардаг уу?",
        "Танд хэд хэдэн эрсдэлт хүчин зүйл байна уу: загас, ногоо ховор хэрэглэдэг, стресс, диет, нарны гэрэлд ховор гардаг?",
      ],
    },

    uz: {
      first: {
        title: "Onlayn diagnostika",
        description:
            "Energiya va tiklanish darajangizni tekshiring.\nBa’zan charchoq sezdirmasdan to‘planib boradi — ushbu qisqa so‘rovnoma e’tibor berish kerak bo‘lgan belgilar bor-yo‘qligini tushunishga yordam beradi.",
        start: "Boshlash",
        disclaimer:
            "Akademik Ye.D. Dalenov nomidagi Profilaktik tibbiyot ilmiy&#8209;tadqiqot instituti bilan hamkorlikda ishlab chiqilgan",
      },
      form: {
        subtitle: "Energiya va tiklanish darajangizni tekshiring",
        question: "Savol",
        answers: ["yo‘q", "ba’zan", "tez-tez"],
        prev: "Orqaga",
        result: "Natija",
        points: ["{n} ball"],
        pointsShort: "ball",
      },
      last: {
        title: "Diagnostika natijasi",
        retry: "Qayta o‘tish",
        buy: "Sotib olish",
        productDescription:
            "Nutrilite™ Double Energy – o‘zingiz va oilangizga g‘amxo‘rlik qilish, umumiy salomatlikni qo‘llab-quvvatlash va energiya darajasini oshirishning kalitidir.\n\nNutrilite™ Double Energy — organizmni kompleks qo‘llab-quvvatlash, resursni tiklash va tanqislik holatlarining oldini olish uchun yaratilgan tizimli yechim. Endi yuqori o‘zlashtirilish va ekologik tozalikni ta’minlaydigan Omega-3 Kompleks Plyus yaxshilangan formulasi bilan.\n\nUshbu yondashuvning samaradorligi akademik Ye. D. Dalenov nomidagi Profilaktik tibbiyot ilmiy-tadqiqot institutining tadqiqotida tasdiqlangan.",
        results: {
          low: "Test natijalariga ko‘ra, sizda vitamin va minerallar tanqisligi xavfi past",
          medium: "Test natijalariga ko‘ra, sizda vitamin va minerallarning subklinik tanqisligi bo‘lishi mumkin",
          high: "Test natijalariga ko‘ra, sizda vitamin va minerallar politanqisligi ehtimoli yuqori",
        },
        history: "O‘tishlar tarixi",
        date: "Sana",
        score: "Ballar",
        interpretation: "Izoh",
        dynamicsTitle: "Dinamika",
        dynamics: {
          decreased: "Xavf darajasi pasaydi (yaxshilanish)",
          same: "Xavf darajasi avvalgi holatida qoldi",
          increased: "Xavf darajasi oshdi",
        },
      },
      questions: [
        "Charchoq, energiya pasayishi, o‘zingizni tez-tez qahva yoki shirinlik bilan tetiklashtirish ehtiyojini his qilasizmi?",
        "Diqqatni jamlashda qiyinchilik, unutuvchanlik yoki «boshdagi tuman» hissini sezasizmi?",
        "Tez-tez asabiylashish, kayfiyat tushishi, xavotir yoki kuchli hissiy charchoqni his qilasizmi?",
        "Uyqu buzilishlari bormi yoki uyqu to‘liq tiklanish bermayotgandek tuyuladimi?",
        "Mushaklarda tortishish, og‘riq, qotish yoki jismoniy mashqlardan keyin sekin tiklanish kuzatiladimi?",
        "Tez-tez kasal bo‘ladigan yoki infeksiyalardan keyin uzoqroq tiklanadigan bo‘ldingizmi?",
        "Teri quruqligi, tirnoqlarning mo‘rtligi yoki soch sifatining yomonlashishini sezasizmi?",
        "Tez-tez qorin dam bo‘lishi, beqaror ich kelishi yoki ovqatdan keyin og‘irlik hissi bo‘ladimi?",
        "Ko‘z charchashi, yorug‘likka sezuvchanlik oshishi yoki ko‘rishning pasayishini sezasizmi?",
        "Sizda bir nechta xavf omillari bormi: baliq va sabzavotlarni kam iste’mol qilish, stress, parhezlar, quyoshda kam bo‘lish?",
      ],
    },

    en: {
      first: {
        title: "Online diagnostics",
        description:
            "Check your energy and recovery levels.\nFatigue can build up unnoticed — this short survey will help you understand whether there are signals worth paying attention to.",
        start: "Start",
        disclaimer:
            "Developed in collaboration with the Academician E.D. Dalenov Research Institute of Preventive Medicine",
      },
      form: {
        subtitle: "Check your energy and recovery levels",
        question: "Question",
        answers: ["no", "sometimes", "often"],
        prev: "Back",
        result: "Result",
        points: ["0 points", "{n} point", "{n} points", "{n} points"],
        pointsShort: "pts",
      },
      last: {
        title: "Diagnostic result",
        retry: "Take again",
        buy: "Buy",
        productDescription:
            "Nutrilite™ Double Energy is the key to caring for yourself and your family, supporting overall health and boosting energy levels.\n\nNutrilite™ Double Energy is a systemic solution designed for comprehensive support of the body, resource recovery and prevention of deficiency conditions. Now with an improved Omega-3 Complex Plus formula that provides higher bioavailability and environmental sustainability.\n\nThe effectiveness of this approach was confirmed in a study by the Academician E. D. Dalenov Research Institute of Preventive Medicine.",
        results: {
          low: "According to the test results, you have a low risk of vitamin and mineral deficiencies",
          medium: "According to the test results, you may have subclinical vitamin and mineral deficiencies",
          high: "According to the test results, you have a high probability of multiple vitamin and mineral deficiencies",
        },
        history: "History",
        date: "Date",
        score: "Points",
        interpretation: "Interpretation",
        dynamicsTitle: "Dynamics",
        dynamics: {
          decreased: "Risk level has decreased (improvement)",
          same: "Risk level has remained the same",
          increased: "Risk level has increased",
        },
      },
      questions: [
        "Do you feel tired, low on energy, or often need coffee or sweets to keep yourself going?",
        "Do you notice difficulty concentrating, forgetfulness or a feeling of “brain fog”?",
        "Do you often experience irritability, low mood, anxiety or increased emotional exhaustion?",
        "Do you have sleep problems or feel that sleep does not fully restore you?",
        "Do you experience muscle cramps, pain, stiffness or slow recovery after physical activity?",
        "Have you started getting sick more often or taking longer to recover from infections?",
        "Do you notice dry skin, brittle nails or deterioration in hair quality?",
        "Do you often have bloating, irregular bowel movements or a feeling of heaviness after eating?",
        "Do you notice eye strain, increased sensitivity to light or decreased vision?",
        "Do you have several risk factors: rarely eating fish and vegetables, stress, diets, rarely being in the sun?",
      ],
    },
  };

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
  //   data-lang="ru|kz|mn|uz|en" data-logo="путь к логотипу" data-product="путь к фото продукта"
  //   data-buy="ссылка на страницу покупки"
  // Если data-logo / data-product / data-buy не указаны, элемент просто не выводится
  function readOptions({lang, logo, product, buy} = {}) {
    return {lang: detectLocale(lang), logo, product, buy};
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
          <img src="${asset("double-energy.svg")}" class="de-welcome__logo" alt="Double Energy">
          <p class="de-text">${t.first.description}</p>
          <p class="de-caption">${t.first.disclaimer}</p>
          <button type="button" class="de-btn de-welcome__start" data-action="start">${t.first.start}${ARROW}</button>
          
        </div>
        <div class="de-welcome__image de-welcome__image--${current.lang}"></div>
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
