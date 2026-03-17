// jQuery-powered interactions for Eventora site

$(function () {
  const $nav = $(".main-nav");
  const $navToggle = $(".nav-toggle");
  const $backToTop = $(".back-to-top");
  const $yearSpan = $("#year");

  if ($yearSpan.length) {
    $yearSpan.text(new Date().getFullYear());
  }

  $navToggle.on("click", function () {
    $nav.toggleClass("open");
  });

  $(document).on("click", function (e) {
    if (!$nav.is(e.target) && $nav.has(e.target).length === 0 && !$(e.target).is($navToggle)) {
      $nav.removeClass("open");
    }
  });

  function handleBackToTopVisibility() {
    if ($(window).scrollTop() > 250) {
      $backToTop.addClass("visible");
    } else {
      $backToTop.removeClass("visible");
    }
  }

  handleBackToTopVisibility();

  $(window).on("scroll", handleBackToTopVisibility);

  $backToTop.on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  $('a[href^="#"]').on("click", function (e) {
    const targetId = $(this).attr("href");
    if (targetId && targetId !== "#" && $(targetId).length) {
      e.preventDefault();
      const offsetTop = $(targetId).offset().top - 70;
      $("html, body").animate({ scrollTop: offsetTop }, 600);
    }
  });

  const $slider = $(".testimonials-slider");
  if ($slider.length) {
    const $track = $slider.find(".testimonial-track");
    const $slides = $track.children(".testimonial");
    const $dotsContainer = $slider.find(".slider-dots");
    const slideCount = $slides.length;
    let currentIndex = 0;
    let autoSlideTimer;

    for (let i = 0; i < slideCount; i++) {
      const $dot = $("<button/>", {
        class: "slider-dot" + (i === 0 ? " active" : ""),
        "data-index": i,
      });
      $dotsContainer.append($dot);
    }

    const $dots = $dotsContainer.find(".slider-dot");

    function goToSlide(index) {
      if (!$track.length) return;
      currentIndex = (index + slideCount) % slideCount;
      const transformX = -currentIndex * 100;
      $track.css("transform", "translateX(" + transformX + "%)");
      $dots.removeClass("active").eq(currentIndex).addClass("active");
    }

    function startAutoSlide() {
      clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, 6000);
    }

    $slider.find(".slider-btn.next").on("click", function () {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });

    $slider.find(".slider-btn.prev").on("click", function () {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });

    $dots.on("click", function () {
      const idx = parseInt($(this).attr("data-index"), 10);
      goToSlide(idx);
      startAutoSlide();
    });

    $slider.on("mouseenter", function () {
      clearInterval(autoSlideTimer);
    });

    $slider.on("mouseleave", function () {
      startAutoSlide();
    });

    startAutoSlide();
  }

  const $filterButtons = $(".filter-btn");
  const $filterItems = $(".filter-item");

  if ($filterButtons.length && $filterItems.length) {
    $filterButtons.on("click", function () {
      const filter = $(this).data("filter");
      $filterButtons.removeClass("active");
      $(this).addClass("active");

      if (filter === "all") {
        $filterItems.stop(true, true).fadeIn(250);
      } else {
        $filterItems.each(function () {
          const $item = $(this);
          const categories = ($item.data("category") || "").toString().split(" ");
          if (categories.indexOf(filter) !== -1) {
            $item.stop(true, true).fadeIn(250);
          } else {
            $item.stop(true, true).fadeOut(200);
          }
        });
      }
    });
  }

  const $galleryItems = $(".gallery-item");
  const $lightbox = $("#lightbox");

  if ($galleryItems.length && $lightbox.length) {
    const $lightboxImage = $lightbox.find(".lightbox-image");
    const $lightboxCaption = $lightbox.find(".lightbox-caption");
    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      const $target = $galleryItems.eq(currentIndex).find("img");
      $lightboxImage.attr("src", $target.attr("src"));
      $lightboxCaption.text($target.data("caption") || $target.attr("alt") || "");
      $lightbox.addClass("open");
    }

    function closeLightbox() {
      $lightbox.removeClass("open");
    }

    function showNext(step) {
      const total = $galleryItems.length;
      currentIndex = (currentIndex + step + total) % total;
      openLightbox(currentIndex);
    }

    $galleryItems.on("click", function () {
      const index = $galleryItems.index(this);
      openLightbox(index);
    });

    $lightbox.find(".lightbox-close, .lightbox-overlay").on("click", function () {
      closeLightbox();
    });

    $lightbox.find(".lightbox-nav.next").on("click", function () {
      showNext(1);
    });

    $lightbox.find(".lightbox-nav.prev").on("click", function () {
      showNext(-1);
    });

    $(document).on("keyup", function (e) {
      if (!$lightbox.hasClass("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext(1);
      if (e.key === "ArrowLeft") showNext(-1);
    });
  }

  function validateField($field, validator, message) {
    const value = $.trim($field.val());
    const isValid = validator(value);
    const $group = $field.closest(".form-group");
    const $error = $group.find(".error-message");

    if (!isValid) {
      $field.addClass("error");
      if ($error.length) $error.text(message);
    } else {
      $field.removeClass("error");
      if ($error.length) $error.text("");
    }
    return isValid;
  }

  function isNotEmpty(val) {
    return val.length > 0;
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function isValidPhone(val) {
    return val.replace(/[^\d]/g, "").length >= 8;
  }

  function isPositiveNumber(val) {
    const n = parseInt(val, 10);
    return !isNaN(n) && n > 0;
  }

  const $bookingForm = $("#bookingForm");
  const $bookingModal = $("#bookingSuccessModal");

  if ($bookingForm.length) {
    $bookingForm.on("submit", function (e) {
      e.preventDefault();

      const $name = $("#name");
      const $email = $("#email");
      const $phone = $("#phone");
      const $eventType = $("#eventType");
      const $eventDate = $("#eventDate");
      const $guests = $("#guests");
      const $location = $("#location");

      const validName = validateField($name, isNotEmpty, "Name is required.");
      const validEmail = validateField($email, function (v) {
        return isNotEmpty(v) && isValidEmail(v);
      }, "Enter a valid email address.");
      const validPhone = validateField($phone, function (v) {
        return isNotEmpty(v) && isValidPhone(v);
      }, "Enter a valid phone number.");
      const validEventType = validateField($eventType, isNotEmpty, "Please select an event type.");
      const validDate = validateField($eventDate, isNotEmpty, "Please choose an event date.");
      const validGuests = validateField($guests, function (v) {
        return isNotEmpty(v) && isPositiveNumber(v);
      }, "Enter a valid guest count.");
      const validLocation = validateField($location, isNotEmpty, "Location is required.");

      const isFormValid =
        validName &&
        validEmail &&
        validPhone &&
        validEventType &&
        validDate &&
        validGuests &&
        validLocation;

      if (!isFormValid) return;

      $bookingForm[0].reset();
      $bookingForm.find(".error").removeClass("error");
      $bookingForm.find(".error-message").text("");
      $bookingModal.addClass("open").attr("aria-hidden", "false");
    });

    $bookingModal.find(".modal-close, .modal-overlay, .modal-ok").on("click", function () {
      $bookingModal.removeClass("open").attr("aria-hidden", "true");
    });
  }

  const $contactForm = $("#contactForm");
  if ($contactForm.length) {
    $contactForm.on("submit", function (e) {
      e.preventDefault();

      const $name = $("#contactName");
      const $email = $("#contactEmail");
      const $subject = $("#contactSubject");
      const $message = $("#contactMessage");

      const validName = validateField($name, isNotEmpty, "Name is required.");
      const validEmail = validateField($email, function (v) {
        return isNotEmpty(v) && isValidEmail(v);
      }, "Enter a valid email address.");
      const validSubject = validateField($subject, isNotEmpty, "Subject is required.");
      const validMessage = validateField($message, function (v) {
        return v.length >= 10;
      }, "Message should be at least 10 characters.");

      const isFormValid = validName && validEmail && validSubject && validMessage;
      if (!isFormValid) return;

      $contactForm[0].reset();
      $contactForm.find(".error").removeClass("error");
      $contactForm.find(".error-message").text("");

      alert("Thank you for contacting Eventora. We will get back to you shortly.");
    });
  }
});

