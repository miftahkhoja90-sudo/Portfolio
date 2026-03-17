// Main shared interactions for Online Voting System

$(document).ready(function () {
  /* ===========================
     Navigation / Mobile Menu
     =========================== */
  var $navbarInner = $(".navbar-inner");
  $(".nav-toggle").on("click", function () {
    $navbarInner.toggleClass("nav-menu-open");
    $(this).find("i").toggleClass("fa-bars fa-xmark");
  });

  // Highlight active nav link based on current page (by filename)
  var path = window.location.pathname;
  var currentPage = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  $(".nav-links a").each(function () {
    var href = $(this).attr("href");
    if (href === currentPage) {
      $(this).addClass("active");
    }
  });

  /* ===========================
     Smooth Scroll for in-page anchors
     =========================== */
  $("a[href^='#']").on("click", function (e) {
    var targetId = $(this).attr("href");
    if (targetId.length > 1 && $(targetId).length) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(targetId).offset().top - 80,
        },
        600
      );
    }
  });

  /* ===========================
     Simple Counter Animation for Stats
     =========================== */
  function animateCounters() {
    $("[data-count-to]").each(function () {
      var $el = $(this);
      if ($el.data("counted")) return;
      var target = parseInt($el.data("count-to"), 10) || 0;
      var duration = 1200;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var value = Math.floor(progress * (target - start) + start);
        $el.text(value.toLocaleString());
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          $el.data("counted", true);
        }
      }

      window.requestAnimationFrame(step);
    });
  }

  // Trigger counters when section comes into view
  var statsObserverTarget = document.querySelector(".js-observe-stats");
  if (statsObserverTarget && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(statsObserverTarget);
  } else {
    // Fallback
    animateCounters();
  }

  /* ===========================
     FAQ Accordion
     =========================== */
  $(".faq-header").on("click", function () {
    var $item = $(this).closest(".faq-item");
    $item.toggleClass("active");
    $item.find(".faq-body").slideToggle(180);
  });

  /* ===========================
     Simple Demo Form Handling
     - Prevents actual submission
     - Shows success messages
     =========================== */

  $("form.js-demo-form").on("submit", function (e) {
    e.preventDefault();
    var $form = $(this);
    var $status = $form.find(".form-status-message");
    if ($status.length === 0) {
      $status = $("<div/>", {
        class: "form-success form-status-message",
      }).appendTo($form);
    }
    $status
      .removeClass("form-error")
      .addClass("form-success")
      .text("Submitted successfully. (Demo only - no data stored.)");
  });

  /* ===========================
     Voting Page - Demo Logic
     =========================== */
  $("#voteForm").on("submit", function (e) {
    e.preventDefault();
    var selected = $("input[name='voteCandidate']:checked").val();
    var $status = $("#voteStatus");
    if (!selected) {
      $status
        .removeClass("form-success")
        .addClass("form-error")
        .text("Please select a candidate to cast your vote.");
      return;
    }
    $status
      .removeClass("form-error")
      .addClass("form-success")
      .text(
        "Your vote for " +
          selected +
          " has been recorded. (Front-end demo only.)"
      );
  });
});

