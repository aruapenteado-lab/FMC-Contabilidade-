(function () {
  "use strict";

  /* ============================================================
     LINKS DO WHATSAPP
     Monta o link com a mensagem inicial corretamente codificada
     e aplica a todos os elementos ".js-whatsapp" da página.
  ============================================================ */
  var WHATSAPP_NUMBER = "5517991891414";
  var WHATSAPP_MESSAGE = "Olá! Encontrei a FCM Contabilidade pelo site e gostaria de saber mais sobre os serviços.";
  var whatsappLink = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  document.querySelectorAll(".js-whatsapp").forEach(function (el) {
    el.setAttribute("href", whatsappLink);
  });

  /* ============================================================
     CABEÇALHO COMPACTO AO ROLAR
  ============================================================ */
  var header = document.querySelector(".site-header");
  var lastState = false;
  function updateHeader() {
    var scrolled = window.scrollY > 12;
    if (scrolled !== lastState) {
      header.classList.toggle("is-scrolled", scrolled);
      lastState = scrolled;
    }
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ============================================================
     MENU MÓVEL
  ============================================================ */
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  var navOverlay = document.getElementById("navOverlay");

  function openMenu() {
    mainNav.classList.add("is-open");
    navOverlay.classList.add("is-visible");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    mainNav.classList.remove("is-open");
    navOverlay.classList.remove("is-visible");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  menuToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.contains("is-open");
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });
  navOverlay.addEventListener("click", closeMenu);

  // Fecha o menu ao selecionar qualquer link de navegação
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu com a tecla Esc
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeMenu(); }
  });

  /* ============================================================
     ROLAGEM SUAVE PARA LINKS INTERNOS (.js-scroll e navegação)
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = header.offsetHeight;
          var top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      }
    });
  });

  /* ============================================================
     ACORDEÃO DE PERGUNTAS FREQUENTES
  ============================================================ */
  document.querySelectorAll(".accordion-item").forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      // Fecha os demais itens (comportamento de acordeão único)
      item.parentElement.querySelectorAll(".accordion-item").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ============================================================
     REVELAÇÃO SUAVE DAS SEÇÕES AO ENTRAR NA TELA
  ============================================================ */
  var revealTargets = document.querySelectorAll(
    ".trust-strip, .section-head, .services-grid, .specialization-grid, .about-grid, .steps, .modes-grid, .accordion, .final-inner"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal-on-scroll"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ============================================================
     ANO ATUAL NO RODAPÉ
  ============================================================ */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
