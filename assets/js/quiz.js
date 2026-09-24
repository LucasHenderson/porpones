/* ==========================================================================
   PORPONÊS: quiz de língua e cultura japonesa (quiz.html)
   --------------------------------------------------------------------------
   As perguntas ficam em assets/js/quiz-perguntas.js (é lá que se edita o
   conteúdo e se colocam as ilustrações). Este arquivo só cuida do jogo:

     1. barra de dificuldade (fácil / médio / difícil), salva no navegador
     2. sorteio de 3 perguntas do nível escolhido, sem repetir a rodada anterior
     3. animação e som de acerto/erro a cada resposta
     4. tela final com a resposta certa e a explicação das 3 perguntas
        e o botão "Jogar novamente", que mantém a dificuldade atual

   Os sons e o idioma atual vêm de window.PORPONES, exposto por main.js.
   Os textos da interface do quiz ficam no objeto UI, logo abaixo (os textos
   das perguntas ficam no arquivo de perguntas).
   ========================================================================== */
(function () {
  "use strict";

  var root = document.querySelector("[data-quiz]");
  if (!root) return;

  var BANK = window.PORPONES_QUIZ || {};
  var LEVELS = ["facil", "medio", "dificil"];
  var PER_ROUND = 3;
  var STORAGE_LEVEL = "porpones-quiz-nivel";

  /* ------------------------------------------------------------------------
     Textos da interface do quiz, nos três idiomas do site.
     {chaves} entre chaves são substituídas na hora de exibir.
     ------------------------------------------------------------------------ */
  var UI = {
    pt: {
      levelFacil: "Fácil",
      levelMedio: "Médio",
      levelDificil: "Difícil",
      startTitle: "Pronto para jogar?",
      startText: "Três perguntas sorteadas entre as {total} do nível {level}. Sem tempo e sem pressa: a cada resposta você descobre na hora se acertou.",
      startBtn: "Começar o quiz",
      progress: "Pergunta {n} de {total}",
      stepsLabel: "Progresso da rodada",
      correct: "Acertou!",
      wrong: "Não foi dessa vez.",
      correctAnswer: "Resposta certa:",
      yourAnswer: "Sua resposta:",
      next: "Próxima pergunta",
      seeResult: "Ver resultado",
      scoreLabel: "acertos",
      result3: "Perfeito!",
      result2: "Quase lá!",
      result1: "Bom começo!",
      result0: "Vamos tentar de novo?",
      resultText: "Você acertou {hits} de {total} no nível {level}.",
      reviewTitle: "As respostas desta rodada",
      replay: "Jogar novamente",
      courses: "Ver os cursos",
      empty: "Nenhuma pergunta cadastrada neste nível ainda."
    },
    en: {
      levelFacil: "Easy",
      levelMedio: "Medium",
      levelDificil: "Hard",
      startTitle: "Ready to play?",
      startText: "Three questions drawn at random from the {total} in the {level} level. No timer, no rush: you find out straight away whether you got it right.",
      startBtn: "Start the quiz",
      progress: "Question {n} of {total}",
      stepsLabel: "Round progress",
      correct: "That's right!",
      wrong: "Not this time.",
      correctAnswer: "Correct answer:",
      yourAnswer: "Your answer:",
      next: "Next question",
      seeResult: "See result",
      scoreLabel: "correct",
      result3: "Perfect!",
      result2: "So close!",
      result1: "Good start!",
      result0: "Shall we try again?",
      resultText: "You got {hits} out of {total} right on the {level} level.",
      reviewTitle: "The answers for this round",
      replay: "Play again",
      courses: "See the courses",
      empty: "No questions have been added to this level yet."
    },
    ja: {
      levelFacil: "やさしい",
      levelMedio: "ふつう",
      levelDificil: "むずかしい",
      startTitle: "準備はいいですか？",
      startText: "「{level}」の{total}問から3問をランダムに出題します。制限時間はありません。答えるたびに正解がすぐ分かります。",
      startBtn: "クイズを始める",
      progress: "{total}問中 {n}問目",
      stepsLabel: "進行状況",
      correct: "正解！",
      wrong: "残念…",
      correctAnswer: "正解：",
      yourAnswer: "あなたの答え：",
      next: "次の問題",
      seeResult: "結果を見る",
      scoreLabel: "正解",
      result3: "全問正解！",
      result2: "おしい！",
      result1: "その調子！",
      result0: "もう一度挑戦しましょう",
      resultText: "「{level}」で{total}問中{hits}問正解でした。",
      reviewTitle: "今回の答え合わせ",
      replay: "もう一度遊ぶ",
      courses: "コースを見る",
      empty: "このレベルの問題はまだ登録されていません。"
    }
  };

  /* ------------------------------------------------------------------------
     Utilidades
     ------------------------------------------------------------------------ */
  function lang() {
    var value = window.PORPONES && window.PORPONES.lang;
    return UI[value] ? value : "pt";
  }

  function t(key) {
    var pack = UI[lang()];
    return (pack && pack[key]) || UI.pt[key] || "";
  }

  function fill(text, vars) {
    return text.replace(/\{(\w+)\}/g, function (all, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : all;
    });
  }

  function play(name, arg) {
    if (window.PORPONES && window.PORPONES.sound) window.PORPONES.sound.play(name, arg);
  }

  function readPref(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function savePref(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {
      /* modo privado: segue sem salvar */
    }
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* Embaralha uma cópia do array (Fisher-Yates) */
  function shuffled(list) {
    var copy = list.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function levelName(level) {
    return t("level" + level.charAt(0).toUpperCase() + level.slice(1));
  }

  function questionsOf(level) {
    return BANK[level] || [];
  }

  /* Texto da pergunta no idioma atual (volta ao português se faltar) */
  function textOf(question) {
    return question[lang()] || question.pt;
  }

  /* ------------------------------------------------------------------------
     Estado da rodada
     ------------------------------------------------------------------------ */
  var stage = root.querySelector("[data-quiz-stage]");
  var levelButtons = root.querySelectorAll("[data-level]");
  var seen = { facil: [], medio: [], dificil: [] };

  var state = {
    level: "facil",
    screen: "start",
    round: [], // { question, order: [índices das alternativas], answer: índice escolhido ou null }
    index: 0
  };

  /* Sorteia PER_ROUND perguntas evitando as da(s) rodada(s) anterior(es) */
  function drawRound(level) {
    var all = questionsOf(level);
    var pool = [];
    var i;
    for (i = 0; i < all.length; i++) {
      if (seen[level].indexOf(i) === -1) pool.push(i);
    }
    if (pool.length < PER_ROUND) {
      seen[level] = [];
      pool = [];
      for (i = 0; i < all.length; i++) pool.push(i);
    }
    var picked = shuffled(pool).slice(0, Math.min(PER_ROUND, all.length));
    seen[level] = seen[level].concat(picked);

    return picked.map(function (index) {
      var question = all[index];
      var order = [];
      for (var k = 0; k < question.pt.a.length; k++) order.push(k);
      return { question: question, order: shuffled(order), answer: null };
    });
  }

  /* ------------------------------------------------------------------------
     Telas
     ------------------------------------------------------------------------ */
  function show(node) {
    stage.innerHTML = "";
    stage.appendChild(node);
  }

  function panel(extraClass) {
    return el("div", "quiz__panel" + (extraClass ? " " + extraClass : ""));
  }

  function renderStart() {
    state.screen = "start";
    var total = questionsOf(state.level).length;
    var box = panel("quiz__start");

    var jp = el("span", "quiz__start-jp", "クイズ");
    jp.setAttribute("lang", "ja");
    box.appendChild(jp);
    box.appendChild(el("h2", null, t("startTitle")));

    if (!total) {
      box.appendChild(el("p", null, t("empty")));
      show(box);
      return;
    }

    box.appendChild(el("p", null, fill(t("startText"), { total: total, level: levelName(state.level) })));

    var btn = el("button", "btn btn--primary", t("startBtn"));
    btn.type = "button";
    btn.addEventListener("click", function () {
      startRound();
    });
    box.appendChild(btn);
    show(box);
  }

  function startRound() {
    state.round = drawRound(state.level);
    state.index = 0;
    if (!state.round.length) {
      renderStart();
      return;
    }
    renderQuestion(true);
  }

  /* Ilustração: imagem real quando `img` está preenchido; molde tracejado
     com a descrição de `hint` enquanto não estiver. */
  function renderFigure(question, stampNode) {
    var figure = el("div", "quiz__figure");
    if (question.img) {
      var img = el("img", "quiz__img");
      img.src = question.img;
      img.alt = question.alt || "";
      img.setAttribute("decoding", "async");
      figure.appendChild(img);
    } else {
      var box = el("div", "img-placeholder");
      box.setAttribute("role", "img");
      box.setAttribute("aria-label", question.hint || "");
      box.appendChild(el("span", "img-placeholder__label", question.hint || ""));
      figure.appendChild(box);
    }
    figure.appendChild(stampNode);
    return figure;
  }

  function renderSteps() {
    var steps = el("div", "quiz__steps");
    steps.setAttribute("role", "img");
    steps.setAttribute("aria-label", t("stepsLabel"));
    state.round.forEach(function (item, i) {
      var step = el("span", "quiz__step");
      if (item.answer === null) {
        if (i === state.index) step.classList.add("is-current");
      } else {
        step.classList.add(item.answer === item.question.correct ? "is-correct" : "is-wrong");
      }
      steps.appendChild(step);
    });
    return steps;
  }

  function renderQuestion(fresh) {
    state.screen = "question";
    var item = state.round[state.index];
    var question = item.question;
    var texts = textOf(question);
    var answered = item.answer !== null;

    var box = panel();

    var head = el("div", "quiz__head");
    head.appendChild(el("span", "quiz__progress", fill(t("progress"), { n: state.index + 1, total: state.round.length })));
    head.appendChild(renderSteps());
    box.appendChild(head);

    var stamp = el("span", "quiz__stamp");
    stamp.setAttribute("aria-hidden", "true");
    box.appendChild(renderFigure(question, stamp));

    box.appendChild(el("h2", "quiz__question", texts.q));

    var list = el("ul", "quiz__options");
    var buttons = [];
    item.order.forEach(function (original, position) {
      var li = el("li");
      var btn = el("button", "quiz-option");
      btn.type = "button";
      btn.setAttribute("data-no-click-sound", "");
      btn.appendChild(el("span", "quiz-option__key", String.fromCharCode(65 + position)));
      btn.appendChild(el("span", "quiz-option__text", texts.a[original]));
      btn.addEventListener("click", function () {
        answer(original);
      });
      li.appendChild(btn);
      list.appendChild(li);
      buttons.push({ node: btn, original: original });
    });
    box.appendChild(list);

    show(box);

    /* Ao trocar de idioma no meio de uma pergunta já respondida, remonta a
       tela no estado em que ela estava (sem tocar o som de novo). */
    if (answered) markAnswer(box, buttons, stamp, item, false);
    if (!fresh && !answered) {
      var first = box.querySelector(".quiz-option");
      if (first) first.focus();
    }
  }

  /* Pinta as alternativas, mostra o carimbo ○/✕ e monta o aviso + botão */
  function markAnswer(box, buttons, stamp, item, withSound) {
    var right = item.question.correct;
    var hit = item.answer === right;

    buttons.forEach(function (entry) {
      entry.node.disabled = true;
      if (entry.original === item.answer) {
        entry.node.classList.add(hit ? "is-correct" : "is-wrong");
      } else if (entry.original === right) {
        entry.node.classList.add("is-answer");
      } else {
        entry.node.classList.add("is-dim");
      }
    });

    stamp.classList.add(hit ? "quiz__stamp--correct" : "quiz__stamp--wrong", "is-on");
    stamp.textContent = hit ? "○" : "✕";

    if (withSound) play(hit ? "correct" : "wrong");

    var feedback = el("div", "quiz__feedback " + (hit ? "quiz__feedback--correct" : "quiz__feedback--wrong"));
    feedback.setAttribute("role", "status");
    feedback.appendChild(el("span", "quiz__feedback-mark", hit ? "○" : "✕"));

    var texts = textOf(item.question);
    var message = el("div");
    message.appendChild(el("strong", null, hit ? t("correct") : t("wrong")));
    if (!hit) message.appendChild(el("span", null, t("correctAnswer") + " " + texts.a[right]));
    feedback.appendChild(message);
    box.appendChild(feedback);

    var actions = el("div", "quiz__actions");
    var last = state.index >= state.round.length - 1;
    var next = el("button", "btn btn--primary", last ? t("seeResult") : t("next"));
    next.type = "button";
    next.addEventListener("click", function () {
      if (last) {
        renderResult();
        return;
      }
      state.index++;
      renderQuestion(false);
    });
    actions.appendChild(next);
    box.appendChild(actions);

    /* Foca o botão sem rolar a página: ao responder, a tela deve ficar
       exatamente onde o usuário estava. */
    if (withSound) next.focus({ preventScroll: true });
  }

  function answer(original) {
    var item = state.round[state.index];
    if (item.answer !== null) return;
    item.answer = original;
    /* Remonta a tela já com a resposta marcada (e com som e animação) */
    var box = stage.firstChild;
    var buttons = [];
    var nodes = box.querySelectorAll(".quiz-option");
    item.order.forEach(function (index, position) {
      buttons.push({ node: nodes[position], original: index });
    });
    /* Atualiza a trilha de passos do cabeçalho */
    var steps = box.querySelector(".quiz__steps");
    if (steps) steps.replaceWith(renderSteps());
    markAnswer(box, buttons, box.querySelector(".quiz__stamp"), item, true);
  }

  function renderResult(silent) {
    state.screen = "result";
    var total = state.round.length;
    var hits = 0;
    state.round.forEach(function (item) {
      if (item.answer === item.question.correct) hits++;
    });

    var box = panel("quiz__result");

    var score = el("div", "quiz__score");
    score.appendChild(el("b", null, hits + "/" + total));
    score.appendChild(el("span", null, t("scoreLabel")));
    box.appendChild(score);

    box.appendChild(el("h2", null, t("result" + Math.min(hits, 3))));
    box.appendChild(el("p", null, fill(t("resultText"), { hits: hits, total: total, level: levelName(state.level) })));

    box.appendChild(el("h3", null, t("reviewTitle")));

    var review = el("ol", "quiz__review");
    state.round.forEach(function (item) {
      var texts = textOf(item.question);
      var hit = item.answer === item.question.correct;
      var li = el("li", "quiz-review " + (hit ? "is-correct" : "is-wrong"));

      var mark = el("span", "quiz-review__mark", hit ? "○" : "✕");
      mark.setAttribute("aria-hidden", "true");
      li.appendChild(mark);

      var body = el("div");
      body.appendChild(el("p", "quiz-review__q", texts.q));

      var right = el("p", "quiz-review__line");
      right.appendChild(el("span", null, t("correctAnswer") + " "));
      right.appendChild(el("b", null, texts.a[item.question.correct]));
      body.appendChild(right);

      if (!hit && item.answer !== null) {
        var yours = el("p", "quiz-review__line quiz-review__line--yours");
        yours.appendChild(el("span", null, t("yourAnswer") + " "));
        yours.appendChild(el("b", null, texts.a[item.answer]));
        body.appendChild(yours);
      }

      body.appendChild(el("p", "quiz-review__why", texts.why));
      li.appendChild(body);
      review.appendChild(li);
    });
    box.appendChild(review);

    var actions = el("div", "quiz__actions");
    var again = el("button", "btn btn--primary", t("replay"));
    again.type = "button";
    again.addEventListener("click", function () {
      startRound();
    });
    actions.appendChild(again);

    var courses = el("a", "btn btn--ghost", t("courses"));
    courses.href = "cursos.html";
    actions.appendChild(courses);
    box.appendChild(actions);

    show(box);
    if (!silent) play("finish", hits === total);
  }

  /* ------------------------------------------------------------------------
     Barra de dificuldade
     ------------------------------------------------------------------------ */
  function syncLevelButtons() {
    Array.prototype.forEach.call(levelButtons, function (btn) {
      var active = btn.getAttribute("data-level") === state.level;
      btn.setAttribute("aria-checked", active ? "true" : "false");
      btn.setAttribute("tabindex", active ? "0" : "-1");
    });
  }

  function setLevel(level, fromUser) {
    if (LEVELS.indexOf(level) === -1 || level === state.level) return;
    state.level = level;
    savePref(STORAGE_LEVEL, level);
    syncLevelButtons();
    if (fromUser) play("select");
    /* Trocar de nível recomeça: a rodada anterior era de outra dificuldade */
    renderStart();
  }

  function initLevels() {
    var saved = readPref(STORAGE_LEVEL);
    if (LEVELS.indexOf(saved) !== -1) state.level = saved;
    syncLevelButtons();

    Array.prototype.forEach.call(levelButtons, function (btn) {
      btn.addEventListener("click", function () {
        setLevel(btn.getAttribute("data-level"), true);
      });
    });

    /* Setas trocam o nível com o teclado (padrão de radiogroup) */
    var group = root.querySelector("[data-quiz-levels]");
    if (!group) return;
    group.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      var list = Array.prototype.slice.call(levelButtons);
      var index = list.indexOf(document.activeElement);
      if (index === -1) return;
      var next = (index + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length;
      list[next].focus();
      list[next].click();
    });
  }

  /* Remonta a tela atual quando o visitante troca o idioma do site */
  function onLangChange() {
    syncLevelButtons();
    if (state.screen === "question" && state.round.length) renderQuestion(true);
    else if (state.screen === "result" && state.round.length) renderResult(true);
    else renderStart();
  }

  initLevels();
  renderStart();
  if (window.PORPONES && window.PORPONES.onLangChange) window.PORPONES.onLangChange(onLangChange);
})();
