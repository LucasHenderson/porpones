/* ==========================================================================
   PORPONÊS: JavaScript principal
   Sem dependências. Responsável por:
     1. Configuração centralizada do WhatsApp (número + mensagens por idioma)
     2. Idioma (português padrão, inglês e japonês) a partir de assets/js/translations.js
     3. Tema claro/escuro com botão animado (dentro do painel de configurações)
     4. Sons discretos da interface (Web Audio, sem arquivos de áudio)
     5. Menu lateral (mobile) e submenus
     6. Transição entre páginas e revelação de blocos ao rolar
     7. Pequenos detalhes (ano no rodapé, fallback da logo)
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. CONFIGURAÇÃO DO WHATSAPP
   --------------------------------------------------------------------------
   TODO: ANTES DE PUBLICAR O SITE, substitua o número abaixo pelo número real.
         Formato internacional, apenas dígitos, sem "+", espaços ou traços.
         Ex.: Brasil (55) + DDD (63) + número (9 0000 0000) => "5563900000000"

   Todos os botões/links do site que tiverem o atributo `data-whatsapp-link`
   ("Fale conosco" no header, CTAs de cada página, rodapé)
   são preenchidos automaticamente com o link do WhatsApp gerado a partir
   destas constantes. Não é necessário editar os arquivos HTML.

   A mensagem padrão muda conforme o idioma escolhido pelo visitante.
   Para usar uma mensagem diferente em um botão específico, adicione no HTML:
     <a data-whatsapp-link data-whatsapp-message="Sua mensagem aqui">...</a>
   (as traduções dessas mensagens ficam em assets/js/translations.js)
   -------------------------------------------------------------------------- */
const WHATSAPP_NUMBER = "5563900000000"; // TODO: substituir pelo número real (formato internacional, só dígitos)
const WHATSAPP_MESSAGES = {
  pt: "Olá! Vim pelo site do PORPONÊS e gostaria de saber mais sobre os cursos.",
  en: "Hello! I found the PORPONÊS website and would like to know more about the courses.",
  ja: "こんにちは。PORPONÊSのサイトを見て、コースについて詳しく知りたいです。"
};

(function () {
  "use strict";

  var STORAGE = { theme: "porpones-theme", lang: "porpones-lang", sound: "porpones-sound" };
  var LANG_TAGS = { pt: "pt-BR", en: "en", ja: "ja" };
  var THEME_COLORS = { light: "#f7f4ee", dark: "#1a1917" };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function forEach(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  /* localStorage pode estar indisponível (modo privado, cookies bloqueados) */
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
      /* ignora */
    }
  }

  /* ------------------------------------------------------------------------
     2. IDIOMA
     O português é o texto original dos arquivos HTML. Elementos com
     `data-i18n` têm o conteúdo trocado pela tradução em translations.js,
     usando o próprio texto em português como chave. `data-i18n-attr` faz o
     mesmo para atributos (aria-label, title, content, data-whatsapp-message).
     ------------------------------------------------------------------------ */
  var i18n = (function () {
    var dict = window.PORPONES_TRANSLATIONS || {};
    var originals = typeof WeakMap === "function" ? new WeakMap() : null;
    var current = "pt";
    var listeners = [];

    function normalize(html) {
      return html.replace(/\s+/g, " ").trim();
    }

    function remember(el) {
      if (!originals) return null;
      var data = originals.get(el);
      if (!data) {
        data = { html: null, attrs: {} };
        originals.set(el, data);
      }
      return data;
    }

    function lookup(key, lang) {
      var entry = dict[key];
      return entry && typeof entry[lang] === "string" ? entry[lang] : null;
    }

    function apply(lang) {
      if (!LANG_TAGS[lang]) lang = "pt";
      current = lang;
      var missing = [];

      forEach(document.querySelectorAll("[data-i18n]"), function (el) {
        var data = remember(el);
        if (!data) return;
        if (data.html === null) data.html = normalize(el.innerHTML);
        var text = lang === "pt" ? data.html : lookup(data.html, lang);
        if (text === null) {
          text = data.html;
          missing.push(data.html);
          el.setAttribute("data-i18n-missing", "");
        } else {
          el.removeAttribute("data-i18n-missing");
        }
        if (normalize(el.innerHTML) !== text) el.innerHTML = text;
      });

      forEach(document.querySelectorAll("[data-i18n-attr]"), function (el) {
        var data = remember(el);
        if (!data) return;
        el.getAttribute("data-i18n-attr").split(/\s+/).forEach(function (attr) {
          if (!attr) return;
          if (!(attr in data.attrs)) data.attrs[attr] = el.getAttribute(attr) || "";
          var original = data.attrs[attr];
          var text = lang === "pt" ? original : lookup(original, lang);
          if (text === null) {
            text = original;
            missing.push(original);
          }
          if (el.getAttribute(attr) !== text) el.setAttribute(attr, text);
        });
      });

      root.setAttribute("lang", LANG_TAGS[lang]);
      if (missing.length && lang !== "pt" && window.console) {
        console.warn("[PORPONÊS] " + missing.length + " texto(s) sem tradução para \"" + lang + "\":", missing);
      }
      listeners.forEach(function (fn) {
        fn(lang);
      });
    }

    return {
      apply: apply,
      get current() {
        return current;
      },
      onChange: function (fn) {
        listeners.push(fn);
      }
    };
  })();

  function initLanguage() {
    var saved = readPref(STORAGE.lang);
    var fromUrl = /[?&]lang=(pt|en|ja)\b/.exec(window.location.search);
    var lang = fromUrl ? fromUrl[1] : saved;
    if (!LANG_TAGS[lang]) lang = "pt";
    i18n.apply(lang);
    if (fromUrl) savePref(STORAGE.lang, lang);
    root.classList.remove("i18n-pending");
  }

  /* ------------------------------------------------------------------------
     Painel de configurações (engrenagem no cabeçalho): idioma, tema e som.
     O painel desce do cabeçalho; tema e som usam os mesmos botões
     .theme-toggle / .sound-toggle tratados em initTheme e initSoundToggles.
     ------------------------------------------------------------------------ */
  function initSettings() {
    var panel = document.querySelector(".settings");
    if (!panel) return;
    var btn = panel.querySelector(".settings__btn");
    var menu = panel.querySelector(".settings__menu");
    var options = panel.querySelectorAll(".lang-option");

    function isOpen() {
      return panel.classList.contains("is-open");
    }

    function setOpen(open) {
      if (open === isOpen()) return;
      panel.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      sound.play(open ? "open" : "close");
    }

    function sync(lang) {
      forEach(options, function (opt) {
        var active = opt.getAttribute("data-lang") === lang;
        opt.setAttribute("aria-checked", active ? "true" : "false");
        opt.setAttribute("tabindex", active ? "0" : "-1");
      });
    }

    btn.addEventListener("click", function () {
      var open = !isOpen();
      setOpen(open);
      if (open) {
        window.setTimeout(function () {
          var first = menu.querySelector('[aria-checked="true"], button');
          if (first) first.focus();
        }, 80);
      }
    });

    /* Idioma: escolher não fecha o painel (o visitante pode mexer no resto) */
    forEach(options, function (opt) {
      opt.addEventListener("click", function () {
        var lang = opt.getAttribute("data-lang");
        if (lang === i18n.current) return;
        sound.play("select");
        i18n.apply(lang);
        savePref(STORAGE.lang, lang);
      });
    });

    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        setOpen(false);
        btn.focus();
        return;
      }
      /* Setas trocam o foco entre os idiomas (padrão de radiogroup) */
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var list = Array.prototype.slice.call(options);
      var idx = list.indexOf(document.activeElement);
      if (idx === -1) return;
      e.preventDefault();
      var next = (idx + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length;
      list[next].focus();
      list[next].click();
    });

    document.addEventListener("click", function (e) {
      if (isOpen() && !panel.contains(e.target)) setOpen(false);
    });

    /* Usado pelo menu lateral (mobile) para fechar o painel ao abrir */
    closeSettings = function () {
      setOpen(false);
    };

    i18n.onChange(sync);
    sync(i18n.current);
  }

  var closeSettings = function () {};

  /* ------------------------------------------------------------------------
     3. TEMA CLARO / ESCURO
     O atributo data-theme já vem definido pelo script inline do <head>
     (preferência salva ou do sistema), então aqui só sincronizamos a
     interface e tratamos o clique no botão (linha "Tema" do painel de
     configurações). O círculo da animação parte do interruptor.
     ------------------------------------------------------------------------ */
  function initTheme() {
    var toggles = document.querySelectorAll(".theme-toggle");
    var meta = document.querySelector('meta[name="theme-color"]');
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function current() {
      return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    }

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      if (meta) meta.setAttribute("content", THEME_COLORS[theme]);
      forEach(toggles, function (b) {
        b.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      });
      /* Logo escura no header/hero vira a versão branca no tema escuro */
      forEach(document.querySelectorAll("img[data-logo][data-logo-dark]"), function (img) {
        if (!img.getAttribute("data-logo-light")) img.setAttribute("data-logo-light", img.getAttribute("src"));
        img.setAttribute("src", img.getAttribute(theme === "dark" ? "data-logo-dark" : "data-logo-light"));
      });
    }

    function switchTo(theme, x, y) {
      var prefersMotion = !reduceMotion.matches;
      if (prefersMotion && typeof document.startViewTransition === "function") {
        /* Círculo que se expande a partir do botão (View Transitions API) */
        var transition = document.startViewTransition(function () {
          apply(theme);
        });
        transition.ready.then(function () {
          var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
          root.animate(
            { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
            { duration: 520, easing: "ease-in", pseudoElement: "::view-transition-new(root)" }
          );
        }).catch(function () {});
        return;
      }
      if (prefersMotion) {
        root.classList.add("theme-transition");
        window.setTimeout(function () {
          root.classList.remove("theme-transition");
        }, 360);
      }
      apply(theme);
    }

    forEach(toggles, function (b) {
      b.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        var rect = (b.querySelector(".switch") || b).getBoundingClientRect();
        sound.play("theme", next === "dark");
        savePref(STORAGE.theme, next);
        switchTo(next, rect.left + rect.width / 2, rect.top + rect.height / 2);
      });
    });

    /* Sem preferência salva, acompanha mudanças do sistema */
    if (mq) {
      var onChange = function (ev) {
        if (!readPref(STORAGE.theme)) apply(ev.matches ? "dark" : "light");
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    apply(current());
  }

  /* ------------------------------------------------------------------------
     4. SONS DA INTERFACE
     Sintetizados com a Web Audio API (nenhum arquivo para baixar). O
     contexto de áudio só é criado no primeiro clique, como exigem os
     navegadores. O visitante pode desligar na linha "Sons" do painel de
     configurações (preferência salva).
     ------------------------------------------------------------------------ */
  var sound = (function () {
    var enabled = readPref(STORAGE.sound) !== "off";
    var ctx = null;

    function context() {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      }
      if (ctx.state === "suspended" && ctx.resume) ctx.resume();
      return ctx;
    }

    /* Toque curto de oscilador com envelope suave */
    function tone(opts) {
      var c = context();
      if (!c) return;
      var t0 = c.currentTime + (opts.delay || 0);
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = opts.type || "sine";
      osc.frequency.setValueAtTime(opts.freq, t0);
      if (opts.to) osc.frequency.exponentialRampToValueAtTime(opts.to, t0 + opts.dur);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(opts.gain || 0.06, t0 + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + opts.dur);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t0);
      osc.stop(t0 + opts.dur + 0.03);
    }

    /* "Sopro" de ruído filtrado, usado na troca de página */
    function whoosh(dur, gain, from, to) {
      var c = context();
      if (!c) return;
      var length = Math.floor(c.sampleRate * dur);
      var buffer = c.createBuffer(1, length, c.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
      var src = c.createBufferSource();
      src.buffer = buffer;
      var filter = c.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 0.9;
      var t0 = c.currentTime;
      filter.frequency.setValueAtTime(from, t0);
      filter.frequency.exponentialRampToValueAtTime(to, t0 + dur);
      var g = c.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + dur * 0.35);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(filter);
      filter.connect(g);
      g.connect(c.destination);
      src.start(t0);
      src.stop(t0 + dur);
    }

    var sounds = {
      /* clique genérico em botões e links */
      click: function () {
        tone({ freq: 1500, to: 900, dur: 0.06, type: "triangle", gain: 0.045 });
      },
      /* ida para outra página */
      nav: function () {
        whoosh(0.3, 0.05, 500, 2600);
        tone({ freq: 520, to: 820, dur: 0.2, gain: 0.035 });
      },
      /* abrir / fechar menu lateral */
      open: function () {
        tone({ freq: 440, to: 660, dur: 0.14, gain: 0.05 });
      },
      close: function () {
        tone({ freq: 660, to: 440, dur: 0.14, gain: 0.05 });
      },
      /* troca de tema: duas notas, subindo (claro) ou descendo (escuro) */
      theme: function (dark) {
        tone({ freq: dark ? 700 : 520, dur: 0.12, gain: 0.05 });
        tone({ freq: dark ? 470 : 780, dur: 0.18, gain: 0.05, delay: 0.1 });
      },
      /* abrir menus pequenos, submenus */
      tick: function () {
        tone({ freq: 1100, to: 1000, dur: 0.04, type: "square", gain: 0.018 });
      },
      /* confirmar uma escolha (idioma, som ligado) */
      select: function () {
        tone({ freq: 880, dur: 0.07, gain: 0.04 });
        tone({ freq: 1320, dur: 0.1, gain: 0.04, delay: 0.06 });
      },
      /* quiz: resposta certa (arpejo maior, subindo) */
      correct: function () {
        tone({ freq: 784, dur: 0.1, gain: 0.05 });
        tone({ freq: 988, dur: 0.1, gain: 0.05, delay: 0.08 });
        tone({ freq: 1319, dur: 0.26, gain: 0.05, delay: 0.16 });
      },
      /* quiz: resposta errada (duas notas graves, descendo) */
      wrong: function () {
        tone({ freq: 233, to: 175, dur: 0.16, type: "sawtooth", gain: 0.035 });
        tone({ freq: 175, to: 117, dur: 0.3, type: "sawtooth", gain: 0.03, delay: 0.14 });
      },
      /* quiz: fim da rodada (pequena fanfarra) */
      finish: function (perfect) {
        var notes = perfect ? [523, 659, 784, 1047] : [523, 659, 784];
        notes.forEach(function (freq, i) {
          tone({ freq: freq, dur: i === notes.length - 1 ? 0.34 : 0.12, gain: 0.045, delay: i * 0.1 });
        });
      }
    };

    function play(name, arg) {
      if (!enabled || !sounds[name]) return;
      try {
        sounds[name](arg);
      } catch (e) {
        /* áudio indisponível: segue em silêncio */
      }
    }

    function setEnabled(value) {
      enabled = value;
      savePref(STORAGE.sound, value ? "on" : "off");
      forEach(document.querySelectorAll(".sound-toggle"), function (b) {
        b.setAttribute("aria-pressed", value ? "true" : "false");
      });
      if (value) play("select");
    }

    return {
      play: play,
      setEnabled: setEnabled,
      get enabled() {
        return enabled;
      }
    };
  })();

  function initSoundToggles() {
    var toggles = document.querySelectorAll(".sound-toggle");
    forEach(toggles, function (b) {
      b.setAttribute("aria-pressed", sound.enabled ? "true" : "false");
      b.addEventListener("click", function () {
        sound.setEnabled(!sound.enabled);
      });
    });
  }

  /* Som de clique em botões e links comuns (links internos tocam o som de
     navegação em initPageTransitions). Um elemento com o atributo
     `data-no-click-sound` toca o próprio som (ex.: opções do quiz). */
  function initClickSounds() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("a, button");
      if (!el) return;
      if (el.hasAttribute("data-no-click-sound") || el.closest("[data-no-click-sound]")) return;
      if (el.matches(".theme-toggle, .sound-toggle, .nav-toggle, .nav__close, .settings__btn, .lang-option, .nav__sub-toggle")) return;
      if (el.tagName === "A" && isInternalPageLink(el)) return;
      if (el.matches(".btn, .link-arrow, .social a, .brand, .nav__link, .nav__sub-link, button")) sound.play("click");
    });
  }

  /* ------------------------------------------------------------------------
     5. MENU LATERAL (mobile/tablet) E SUBMENUS
     ------------------------------------------------------------------------ */
  var mobileQuery = window.matchMedia ? window.matchMedia("(max-width: 1099.98px)") : { matches: false };

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    var header = document.querySelector(".site-header");
    if (!toggle || !nav || !header) return;

    var closeBtn = nav.querySelector(".nav__close");
    var backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    header.appendChild(backdrop);

    var lastFocus = null;

    function isOpen() {
      return document.body.classList.contains("nav-open");
    }

    function setOpen(open, silent) {
      if (open === isOpen()) return;
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!silent) sound.play(open ? "open" : "close");
      if (open) {
        closeSettings();
        lastFocus = document.activeElement;
        window.setTimeout(function () {
          var first = closeBtn || nav.querySelector("a, button");
          if (first) first.focus();
        }, 120);
      } else if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
        lastFocus = null;
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });
    }
    backdrop.addEventListener("click", function () {
      setOpen(false);
    });

    /* Ao escolher uma página no menu, fecha o painel antes de navegar */
    nav.addEventListener("click", function (e) {
      var link = e.target.closest("a[href]");
      if (link && mobileQuery.matches) setOpen(false, true);
    });

    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      /* Mantém o Tab dentro do painel enquanto ele está aberto */
      if (e.key === "Tab") {
        var focusables = nav.querySelectorAll('a[href], button:not([disabled])');
        var visible = Array.prototype.filter.call(focusables, function (el) {
          return el.getClientRects().length > 0 && window.getComputedStyle(el).visibility !== "hidden";
        });
        if (!visible.length) return;
        var first = visible[0];
        var last = visible[visible.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    /* Se a janela passar para o layout desktop, garante que o painel feche. */
    function onLayoutChange() {
      if (!mobileQuery.matches) setOpen(false, true);
      syncOpenSubmenu();
    }
    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", onLayoutChange);
    else if (mobileQuery.addListener) mobileQuery.addListener(onLayoutChange);
    syncOpenSubmenu();
  }

  /* No painel lateral, o submenu da página atual começa aberto; no desktop
     os dropdowns começam fechados. */
  function syncOpenSubmenu() {
    forEach(document.querySelectorAll(".nav__item--has-sub"), function (item) {
      var open = mobileQuery.matches && !!item.querySelector(".nav__sub-link.is-active");
      item.classList.toggle("is-open", open);
      var btn = item.querySelector(".nav__sub-toggle");
      if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initSubmenus() {
    var items = document.querySelectorAll(".nav__item--has-sub");

    forEach(items, function (item) {
      var btn = item.querySelector(".nav__sub-toggle");
      if (!btn) return;

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var willOpen = !item.classList.contains("is-open");

        /* Fecha os outros submenus abertos */
        forEach(items, function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var ob = other.querySelector(".nav__sub-toggle");
            if (ob) ob.setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("is-open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
        sound.play("tick");
      });
    });

    /* Clique fora fecha submenus (desktop) */
    document.addEventListener("click", function (e) {
      if (e.target.closest(".nav__item--has-sub") || mobileQuery.matches) return;
      forEach(items, function (item) {
        item.classList.remove("is-open");
        var b = item.querySelector(".nav__sub-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ------------------------------------------------------------------------
     6. TRANSIÇÃO ENTRE PÁGINAS E REVELAÇÃO AO ROLAR
     ------------------------------------------------------------------------ */
  function isInternalPageLink(a) {
    if (a.target && a.target !== "_self") return false;
    if (a.hasAttribute("download") || a.hasAttribute("data-whatsapp-link")) return false;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || /^(mailto|tel|javascript):/i.test(href)) return false;
    var url;
    try {
      url = new URL(a.href, window.location.href);
    } catch (e) {
      return false;
    }
    if (url.protocol !== window.location.protocol || url.host !== window.location.host) return false;
    /* Âncora na mesma página: deixa o navegador rolar suavemente */
    if (url.pathname === window.location.pathname && url.hash) return false;
    return /\.html?$/i.test(url.pathname) || /\/$/.test(url.pathname);
  }

  function initPageTransitions() {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest("a[href]");
      if (!a || !isInternalPageLink(a)) return;
      e.preventDefault();
      sound.play("nav");
      var href = a.href;
      if (reduceMotion.matches) {
        window.location.href = href;
        return;
      }
      document.body.classList.add("is-leaving");
      window.setTimeout(function () {
        window.location.href = href;
      }, 200);
    });

    /* Voltar pelo histórico pode restaurar a página do cache com a classe */
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.body.classList.remove("is-leaving");
    });
  }

  function initReveal() {
    if (!("IntersectionObserver" in window) || reduceMotion.matches) return;
    var selector = [
      ".section__head", ".card", ".option", ".guide__item", ".destination", ".school",
      ".cta-block", ".feature-list > li", ".cost-list > li", ".notice", ".table-wrap",
      ".prose", ".hero__media", ".hero__meta", ".numbered__item", ".progression > li", ".level"
    ].join(", ");
    var candidates = document.querySelectorAll(selector);
    if (!candidates.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        el.classList.add("is-visible");
        /* Depois da entrada, remove as classes para não interferir nos
           efeitos de hover (que também usam transform) */
        window.setTimeout(function () {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--reveal-delay");
        }, 1000);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });

    var perParent = [];
    forEach(candidates, function (el) {
      /* Evita animar um bloco dentro de outro que já anima */
      if (el.parentElement && el.parentElement.closest(".reveal")) return;
      /* Slides do carrossel ficam fora da tela por causa da rolagem
         horizontal: animá-los deixaria cards invisíveis até o visitante
         clicar na seta. */
      if (el.closest("[data-carousel], [data-quiz]")) return;
      var parent = el.parentElement;
      var group = null;
      for (var i = 0; i < perParent.length; i++) {
        if (perParent[i].parent === parent) {
          group = perParent[i];
          break;
        }
      }
      if (!group) {
        group = { parent: parent, count: 0 };
        perParent.push(group);
      }
      el.style.setProperty("--reveal-delay", Math.min(group.count, 5) * 70 + "ms");
      group.count++;
      el.classList.add("reveal");
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     7. CARROSSEL (depoimentos da home)
     Rolagem horizontal com scroll-snap: o CSS decide quantos cards cabem
     por vez (1 no celular, 2 no tablet, 3 no desktop) e o JS só cuida das
     setas, dos pontos e do teclado. Para acrescentar ou remover um card,
     basta editar o HTML: nada aqui precisa mudar.
     ------------------------------------------------------------------------ */
  function initCarousel() {
    forEach(document.querySelectorAll("[data-carousel]"), function (root) {
      var viewport = root.querySelector("[data-carousel-viewport]");
      var track = root.querySelector("[data-carousel-track]");
      var prev = root.querySelector("[data-carousel-prev]");
      var next = root.querySelector("[data-carousel-next]");
      var dotsBox = root.querySelector("[data-carousel-dots]");
      if (!viewport || !track) return;

      var slides = track.children;
      var dots = [];
      var pages = 1;
      var page = 0;
      var frame = null;

      /* Quantos cards cabem na janela do carrossel, a partir da largura real
         de um card (definida pelo CSS, que muda por breakpoint). */
      function perView() {
        if (!slides.length) return 1;
        var width = slides[0].getBoundingClientRect().width;
        if (!width) return 1;
        var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return Math.max(1, Math.round((viewport.clientWidth + gap) / (width + gap)));
      }

      function pageWidth() {
        return viewport.clientWidth;
      }

      function goTo(index, smooth) {
        page = Math.max(0, Math.min(pages - 1, index));
        var left = page * pageWidth();
        if (viewport.scrollTo) {
          viewport.scrollTo({ left: left, behavior: smooth && !reduceMotion.matches ? "smooth" : "auto" });
        } else {
          viewport.scrollLeft = left;
        }
        sync();
      }

      /* Atualiza setas e pontos conforme a posição da rolagem.
         Se a quantidade de cards visíveis mudou (giro do celular, janela
         redimensionada, fontes que só chegaram depois), refaz os pontos. */
      function sync() {
        if (Math.max(1, Math.ceil(slides.length / perView())) !== pages) layout();
        var max = viewport.scrollWidth - viewport.clientWidth;
        page = max > 1 ? Math.round(viewport.scrollLeft / pageWidth()) : 0;
        page = Math.max(0, Math.min(pages - 1, page));
        if (prev) prev.disabled = page === 0;
        if (next) next.disabled = page >= pages - 1;
        dots.forEach(function (dot, i) {
          var active = i === page;
          dot.setAttribute("aria-selected", active ? "true" : "false");
          dot.setAttribute("tabindex", active ? "0" : "-1");
        });
      }

      function buildDots() {
        if (!dotsBox) return;
        dotsBox.innerHTML = "";
        dots = [];
        if (pages < 2) return;
        for (var i = 0; i < pages; i++) {
          (function (index) {
            var dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel__dot";
            dot.setAttribute("data-no-click-sound", "");
            dot.setAttribute("role", "tab");
            dot.setAttribute("aria-selected", "false");
            dot.setAttribute("aria-label", String(index + 1));
            dot.addEventListener("click", function () {
              sound.play("tick");
              goTo(index, true);
            });
            dotsBox.appendChild(dot);
            dots.push(dot);
          })(i);
        }
      }

      function layout() {
        var per = perView();
        pages = Math.max(1, Math.ceil(slides.length / per));
        root.classList.toggle("is-static", pages < 2);
        buildDots();
        sync();
      }

      if (prev) {
        prev.addEventListener("click", function () {
          sound.play("tick");
          goTo(page - 1, true);
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          sound.play("tick");
          goTo(page + 1, true);
        });
      }

      viewport.addEventListener("scroll", function () {
        if (frame) return;
        frame = window.requestAnimationFrame(function () {
          frame = null;
          sync();
        });
      });

      viewport.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        sound.play("tick");
        goTo(page + (e.key === "ArrowRight" ? 1 : -1), true);
      });

      window.addEventListener("resize", function () {
        window.clearTimeout(layout.timer);
        layout.timer = window.setTimeout(layout, 150);
      });

      layout();
      /* Refaz as contas quando fontes e imagens terminam de carregar */
      window.addEventListener("load", layout);
    });
  }

  /* ------------------------------------------------------------------------
     8. WHATSAPP, ANO NO RODAPÉ E FALLBACK DA LOGO
     ------------------------------------------------------------------------ */
  function buildWhatsAppUrl(message) {
    var text = message && message.trim() ? message : WHATSAPP_MESSAGES[i18n.current] || WHATSAPP_MESSAGES.pt;
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function initWhatsAppLinks() {
    forEach(document.querySelectorAll("[data-whatsapp-link]"), function (el) {
      el.setAttribute("href", buildWhatsAppUrl(el.getAttribute("data-whatsapp-message")));
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });

    /* Aviso discreto no console enquanto o número ainda for o placeholder. */
    if (WHATSAPP_NUMBER === "5563900000000" && window.console) {
      console.warn(
        "[PORPONÊS] O número de WhatsApp ainda é um placeholder. " +
          "Edite WHATSAPP_NUMBER em assets/js/main.js antes de publicar."
      );
    }
  }

  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* Se assets/img/logo.png não existir, tenta .svg e .webp antes de esconder
     a imagem (o nome da marca em texto continua visível). */
  function initLogoFallback() {
    forEach(document.querySelectorAll("img[data-logo]"), function (img) {
      var tried = [];
      img.addEventListener("error", function handler() {
        var src = img.getAttribute("src");
        var base = src.replace(/\.(png|svg|webp|jpg|jpeg)$/i, "");
        var candidates = [".svg", ".webp", ".jpg"];
        var next = null;
        for (var i = 0; i < candidates.length; i++) {
          if (tried.indexOf(candidates[i]) === -1 && src.indexOf(candidates[i]) === -1) {
            next = candidates[i];
            break;
          }
        }
        if (next) {
          tried.push(next);
          img.setAttribute("src", base + next);
        } else {
          img.removeEventListener("error", handler);
          img.style.display = "none";
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     Inicialização
     O idioma é aplicado imediatamente (o script fica no fim do <body>, então
     o DOM já existe) para o visitante não ver o texto em português piscar.
     ------------------------------------------------------------------------ */
  function init() {
    initLanguage();
    i18n.onChange(initWhatsAppLinks);
    initWhatsAppLinks();
    initTheme();
    initSoundToggles();
    initSettings();
    initMobileNav();
    initSubmenus();
    initClickSounds();
    initPageTransitions();
    initReveal();
    initCarousel();
    initYear();
    initLogoFallback();
  }

  /* API mínima para os scripts de página (hoje, assets/js/quiz.js):
     tocar os sons da interface e acompanhar o idioma escolhido. */
  window.PORPONES = {
    sound: sound,
    get lang() {
      return i18n.current;
    },
    onLangChange: function (fn) {
      i18n.onChange(fn);
    },
    prefersReducedMotion: function () {
      return !!reduceMotion.matches;
    }
  };

  try {
    if (document.body) init();
    else document.addEventListener("DOMContentLoaded", init);
  } catch (e) {
    root.classList.remove("i18n-pending");
    if (window.console) console.error("[PORPONÊS] Erro ao iniciar o script:", e);
  }
})();
