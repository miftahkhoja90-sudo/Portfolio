// Main site interactions using jQuery

$(document).ready(function () {
  // Sticky nav is mostly via CSS; here we handle mobile nav toggle and smooth scroll

  // Mobile menu toggle
  $(".nav-toggle").on("click", function () {
    $(this).toggleClass("open");
    $(".nav-links").toggleClass("open");
  });

  // Close mobile menu when a nav link is clicked
  $(".nav-links a").on("click", function () {
    $(".nav-toggle").removeClass("open");
    $(".nav-links").removeClass("open");
  });

  // Smooth scrolling for same-page links starting with '#'
  $('a[href^="#"]').on("click", function (e) {
    const targetId = $(this).attr("href");
    if (targetId.length > 1 && $(targetId).length) {
      e.preventDefault();
      const offsetTop = $(targetId).offset().top - 80; // adjust for sticky nav
      $("html, body").animate({ scrollTop: offsetTop }, 700);
    }
  });

  // Back-to-top button
  const $backToTop = $(".back-to-top");

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 250) {
      $backToTop.addClass("show");
    } else {
      $backToTop.removeClass("show");
    }
  });

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 700);
  });

  // Testimonials slider (simple fade slider)
  const $testimonials = $(".testimonials-slider .testimonial");
  const $dots = $(".testimonial-dots .dot");
  let currentIndex = 0;

  function showTestimonial(index) {
    $testimonials.removeClass("active").eq(index).addClass("active");
    $dots.removeClass("active").eq(index).addClass("active");
    currentIndex = index;
  }

  $dots.on("click", function () {
    const index = $(this).data("index");
    showTestimonial(index);
  });

  if ($testimonials.length) {
    setInterval(function () {
      const nextIndex = (currentIndex + 1) % $testimonials.length;
      showTestimonial(nextIndex);
    }, 5000);
  }

  // Gallery Lightbox
  const $lightbox = $("#lightbox");
  const $lightboxImg = $("#lightbox-img");
  const $lightboxCaption = $("#lightbox-caption");

  $(".gallery-item").on("click", function () {
    const imgSrc = $(this).find("img").attr("src");
    const caption = $(this).find(".gallery-overlay span").text() || "";
    $lightboxImg.attr("src", imgSrc);
    $lightboxCaption.text(caption);
    $lightbox.addClass("open");
  });

  $(".lightbox-close, #lightbox").on("click", function (e) {
    if (e.target === this || $(e.target).hasClass("lightbox-close") || $(e.target).closest(".lightbox-close").length) {
      $lightbox.removeClass("open");
    }
  });

  // Stop closing when clicking inside content
  $(".lightbox-content").on("click", function (e) {
    e.stopPropagation();
  });

  // Services filter
  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    if (filter === "all") {
      $(".services-grid.full .service-card").fadeIn(200);
    } else {
      $(".services-grid.full .service-card").each(function () {
        const category = $(this).data("category");
        if (category === filter) {
          $(this).fadeIn(200);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });

  // Appointment form validation
  const $appointmentForm = $("#appointmentForm");

  function showError($field, message) {
    $field.addClass("error");
    let $msg = $field.siblings(".error-message");
    if (!$msg.length) {
      $msg = $('<div class="error-message"></div>').insertAfter($field);
    }
    $msg.text(message);
  }

  function clearError($field) {
    $field.removeClass("error");
    $field.siblings(".error-message").remove();
  }

  $appointmentForm.on("submit", function (e) {
    if (!$appointmentForm.length) return;

    e.preventDefault();

    let isValid = true;

    const $name = $("#name");
    const $email = $("#email");
    const $phone = $("#phone");
    const $service = $("#service");
    const $date = $("#date");
    const $time = $("#time");

    // Clear previous errors
    $appointmentForm.find(".error").removeClass("error");
    $appointmentForm.find(".error-message").remove();

    // Name
    if (!$name.val().trim()) {
      isValid = false;
      showError($name, "Please enter your name.");
    } else {
      clearError($name);
    }

    // Email
    const emailVal = $email.val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      isValid = false;
      showError($email, "Please enter your email.");
    } else if (!emailRegex.test(emailVal)) {
      isValid = false;
      showError($email, "Please enter a valid email address.");
    } else {
      clearError($email);
    }

    // Phone
    const phoneVal = $phone.val().trim();
    if (!phoneVal) {
      isValid = false;
      showError($phone, "Please enter your phone number.");
    } else if (!/^[0-9+\-\s]{7,15}$/.test(phoneVal)) {
      isValid = false;
      showError($phone, "Please enter a valid phone number.");
    } else {
      clearError($phone);
    }

    // Service
    if (!$service.val()) {
      isValid = false;
      showError($service, "Please select a service.");
    } else {
      clearError($service);
    }

    // Date
    if (!$date.val()) {
      isValid = false;
      showError($date, "Please choose a date.");
    } else {
      clearError($date);
    }

    // Time
    if (!$time.val()) {
      isValid = false;
      showError($time, "Please choose a time slot.");
    } else {
      clearError($time);
    }

    if (isValid) {
      // Show success modal
      $("#successModal").addClass("open");
      this.reset();
    }
  });

  // Close success modal
  $(".modal-close, .modal-ok, #successModal").on("click", function (e) {
    if (e.target === this || $(e.target).hasClass("modal-close") || $(e.target).hasClass("modal-ok")) {
      $("#successModal").removeClass("open");
    }
  });

  $(".modal-content").on("click", function (e) {
    e.stopPropagation();
  });

  // Contact form validation (simple)
  const $contactForm = $("#contactForm");

  $contactForm.on("submit", function (e) {
    if (!$contactForm.length) return;

    e.preventDefault();

    let isValid = true;

    const $cName = $("#contactName");
    const $cEmail = $("#contactEmail");
    const $cMessage = $("#contactMessage");

    $contactForm.find(".error").removeClass("error");
    $contactForm.find(".error-message").remove();

    if (!$cName.val().trim()) {
      isValid = false;
      showError($cName, "Please enter your name.");
    }

    const cEmailVal = $cEmail.val().trim();
    const emailRegex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cEmailVal) {
      isValid = false;
      showError($cEmail, "Please enter your email.");
    } else if (!emailRegex2.test(cEmailVal)) {
      isValid = false;
      showError($cEmail, "Please enter a valid email address.");
    }

    if (!$cMessage.val().trim()) {
      isValid = false;
      showError($cMessage, "Please enter a message.");
    }

    if (isValid) {
      alert("Thank you for contacting us! We will get back to you soon.");
      this.reset();
    }
  });

  // Set current year in footer
  const year = new Date().getFullYear();
  $("#currentYear").text(year);
});

