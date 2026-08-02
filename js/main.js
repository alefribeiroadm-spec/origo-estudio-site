(function () {
  "use strict";

  /* ============ CONFIG ============ */
  var WHATSAPP_NUMBER = "5527997656489";
  var PIX = {
    key: "+5527997656489",
    name: "ALEF RIBEIRO ALVES",
    city: "CARIACICA"
  };

  var PRICES = {
    20: { 1: 20, 3: 50, 6: 100, 10: 150, 15: 200 },
    30: { 1: 30, 3: 80, 6: 150, 10: 220, 15: 300 },
    60: { 1: 50, 3: 140, 6: 260, 10: 380, 15: 500 }
  };

  var PORTFOLIO = [
    { file: "barbearia.mp4", niche: "Barbearia", desc: "Vídeo de transformação, estilo antes/depois" },
    { file: "farmacia.mp4", niche: "Farmácia de bairro", desc: "Reel de dica de saúde do mês" },
    { file: "petshop.mp4", niche: "Pet shop", desc: "Campanha fofa de banho e tosa" },
    { file: "restaurante.mp4", niche: "Restaurante", desc: "Divulgação de prato e ambiente" },
    { file: "loja-de-roupa.mp4", niche: "Loja de roupa", desc: "Vídeo de provador / coleção" },
    { file: "casas-de-show.mp4", niche: "Casa de show", desc: "Divulgação de line-up e evento" },
    { file: "clinica-odonto.mp4", niche: "Clínica odontológica", desc: "Vídeo institucional acolhedor" },
    { file: "hamburgueria.mp4", niche: "Hamburgueria", desc: "Vídeo de produto e ambientação" }
  ];

  /* ============ NAV ============ */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  /* ============ PORTFOLIO GRID ============ */
  var grid = document.getElementById("portfolioGrid");
  var lightbox = document.getElementById("lightbox");
  var lightboxVideo = document.getElementById("lightboxVideo");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxCta = document.getElementById("lightboxCta");
  var lightboxClose = document.getElementById("lightboxClose");

  PORTFOLIO.forEach(function (item) {
    var el = document.createElement("div");
    el.className = "reel";
    el.innerHTML =
      '<video src="assets/video/' + item.file + '" muted loop playsinline preload="none"></video>' +
      '<span class="play">▶</span>' +
      '<div class="reel-label"><strong>' + item.niche + '</strong><span>' + item.desc + '</span></div>';

    var video = el.querySelector("video");
    el.addEventListener("mouseenter", function () {
      video.play().catch(function () {});
    });
    el.addEventListener("mouseleave", function () {
      video.pause();
    });
    el.addEventListener("click", function () {
      openLightbox(item);
    });
    grid.appendChild(el);
  });

  function openLightbox(item) {
    lightboxVideo.src = "assets/video/" + item.file;
    lightboxTitle.textContent = item.niche + " — " + item.desc;
    var msg = "Oi, Alef! Vi o exemplo de " + item.niche + " no site da Origo e quero um vídeo assim pro meu negócio.";
    lightboxCta.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
    lightbox.classList.add("open");
    lightboxVideo.play().catch(function () {});
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightboxVideo.pause();
    lightboxVideo.src = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* ============ ORDER TABS ============ */
  var tabs = document.querySelectorAll(".order-tab");
  var videoFields = document.querySelectorAll("[data-video-field]");
  var siteFields = document.querySelectorAll("[data-site-field]");
  var tipoPedidoField = document.getElementById("tipoPedidoField");
  var briefingLabel = document.getElementById("briefingLabel");
  var currentTab = "video";

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      currentTab = tab.dataset.tab;
      var isVideo = currentTab === "video";
      videoFields.forEach(function (f) { f.style.display = isVideo ? "" : "none"; });
      siteFields.forEach(function (f) { f.style.display = isVideo ? "none" : ""; });
      tipoPedidoField.value = isVideo ? "Vídeo pra redes sociais" : "Personalização de site";
      briefingLabel.textContent = isVideo
        ? "Conte sobre o seu negócio e o que você imagina pro vídeo"
        : "Conte o que você precisa no site (páginas, funcionalidades, referências que você gosta)";
      updateWhatsappFallback();
    });
  });

  /* ============ DURATION / QTY CHIPS ============ */
  var duration = 20;
  var qty = 1;
  var style = "Ultra-realista";

  var styleChips = document.querySelectorAll("#styleChips .chip");
  var durationChips = document.querySelectorAll("#durationChips .chip");
  var qtyChips = document.querySelectorAll("#qtyChips .chip");
  var estiloField = document.getElementById("estiloField");
  var summaryStyle = document.getElementById("summaryStyle");

  styleChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      styleChips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      style = chip.dataset.style;
      estiloField.value = style;
      summaryStyle.textContent = style;
      updateWhatsappFallback();
    });
  });

  durationChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      durationChips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      duration = Number(chip.dataset.duration);
      updateSummary();
    });
  });
  qtyChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      qtyChips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      qty = Number(chip.dataset.qty);
      updateSummary();
    });
  });

  var summaryPrice = document.getElementById("summaryPrice");
  var summaryPriceUnit = document.getElementById("summaryPriceUnit");
  var summaryDuration = document.getElementById("summaryDuration");
  var summaryQty = document.getElementById("summaryQty");
  var summaryUnit = document.getElementById("summaryUnit");
  var pixCodeEl = document.getElementById("pixCode");

  function money(v) {
    return "R$ " + v.toFixed(2).replace(".", ",");
  }
  function durationLabel(d) {
    return d === 60 ? "1 minuto" : d + " segundos";
  }

  function updateSummary() {
    var total = PRICES[duration][qty];
    var unit = total / qty;
    summaryPrice.textContent = money(total);
    summaryPriceUnit.textContent = "/ " + qty + " vídeo" + (qty > 1 ? "s" : "") + " de " + durationLabel(duration);
    summaryDuration.textContent = durationLabel(duration);
    summaryQty.textContent = qty + " vídeo" + (qty > 1 ? "s" : "");
    summaryUnit.textContent = money(unit) + (qty > 1 ? " cada" : "");
    renderPix(total);
    updateWhatsappFallback();
  }

  /* ============ PIX BR CODE ============ */
  function crc16(payload) {
    var crc = 0xFFFF;
    for (var i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
        } else {
          crc = (crc << 1) & 0xFFFF;
        }
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  function tlv(id, value) {
    var len = String(value.length).padStart(2, "0");
    return id + len + value;
  }

  function buildPixPayload(amount) {
    var merchantAccount = tlv("00", "BR.GOV.BCB.PIX") + tlv("01", PIX.key);
    var payload = "";
    payload += tlv("00", "01");
    payload += tlv("26", merchantAccount);
    payload += tlv("52", "0000");
    payload += tlv("53", "986");
    if (amount) payload += tlv("54", Number(amount).toFixed(2));
    payload += tlv("58", "BR");
    payload += tlv("59", PIX.name.slice(0, 25));
    payload += tlv("60", PIX.city.slice(0, 15));
    payload += tlv("62", tlv("05", "***"));
    payload += "6304";
    payload += crc16(payload);
    return payload;
  }

  var qrTarget = document.getElementById("qrcode");
  function renderPix(amount) {
    var code = buildPixPayload(amount);
    pixCodeEl.textContent = code;
    qrTarget.innerHTML = "";
    try {
      var qr = qrcode(0, "M");
      qr.addData(code);
      qr.make();
      qrTarget.innerHTML = qr.createSvgTag(4, 4);
    } catch (e) {
      qrTarget.textContent = "Não foi possível gerar o QR — use o código copia-e-cola.";
    }
  }

  var copyBtn = document.getElementById("copyPixBtn");
  copyBtn.addEventListener("click", function () {
    var text = pixCodeEl.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(showCopied);
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showCopied();
    }
  });
  function showCopied() {
    copyBtn.textContent = "Código copiado!";
    copyBtn.classList.add("copied");
    setTimeout(function () {
      copyBtn.textContent = "Copiar código Pix";
      copyBtn.classList.remove("copied");
    }, 2200);
  }

  /* ============ WHATSAPP FALLBACK LINK ============ */
  var waFallback = document.getElementById("waFallback");
  function updateWhatsappFallback() {
    var msg;
    if (currentTab === "video") {
      var total = PRICES[duration][qty];
      var styleLabel = style === "Animação" ? "de animação" : "ultra-realista" + (qty > 1 ? "s" : "");
      msg = "Oi, Alef! Quero pedir " + qty + " vídeo" + (qty > 1 ? "s" : "") +
        " " + styleLabel + " de " + durationLabel(duration) +
        " (total " + money(total) + ") pra minha empresa.";
    } else {
      msg = "Oi, Alef! Quero um orçamento pra personalizar um site pro meu negócio.";
    }
    waFallback.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  /* ============ ENVIO DO PEDIDO -> WHATSAPP DIRETO ============ */
  var orderForm = document.getElementById("orderForm");
  function buildOrderWhatsAppMessage() {
    var businessName = (orderForm.elements["Nome do negócio"].value || "").trim();
    var clientName = (orderForm.elements["Seu nome"].value || "").trim();
    var briefing = (orderForm.elements["Briefing"].value || "").trim();
    var lines = [];

    if (currentTab === "video") {
      var total = PRICES[duration][qty];
      var nicho = orderForm.elements["Tipo de negócio"].value;
      lines.push("Oi, Alef! Acabei de fazer um pedido pelo site da Origo:");
      lines.push("");
      lines.push("Negócio: " + (businessName || "-") + " (" + nicho + ")");
      lines.push("Estilo: " + style);
      lines.push("Duração: " + durationLabel(duration));
      lines.push("Quantidade: " + qty + " vídeo" + (qty > 1 ? "s" : ""));
      lines.push("Total: " + money(total));
      if (briefing) lines.push("Briefing: " + briefing);
      lines.push("");
      lines.push("Meu nome: " + (clientName || "-"));
      lines.push("Já mando o comprovante do Pix e os anexos aqui.");
    } else {
      lines.push("Oi, Alef! Acabei de pedir um orçamento de personalização de site pelo seu site:");
      lines.push("");
      lines.push("Negócio: " + (businessName || "-"));
      if (briefing) lines.push("O que preciso: " + briefing);
      lines.push("");
      lines.push("Meu nome: " + (clientName || "-"));
    }
    return lines.join("\n");
  }

  if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = orderForm.querySelector("button[type=submit]");
      var waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(buildOrderWhatsAppMessage());
      var formData = new FormData(orderForm);
      var redirected = false;

      function goToWhatsapp() {
        if (redirected) return;
        redirected = true;
        window.location.href = waUrl;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      // Envia o briefing e os anexos por e-mail em segundo plano (não bloqueia o redirecionamento)
      fetch("https://formsubmit.co/ajax/alefribeiroadm@gmail.com", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      }).catch(function () {}).then(goToWhatsapp);

      // Garante que o cliente vai pro WhatsApp mesmo se o envio do e-mail demorar ou falhar
      setTimeout(goToWhatsapp, 6000);
    });
  }

  /* ============ INIT ============ */
  updateSummary();
})();
