// Ensure DOM is ready
$(function () {
  // Smooth scrolling for in-page links
  $('a[href^="#"]').on('click', function (e) {
    const targetId = $(this).attr('href');
    if (targetId.length > 1 && $(targetId).length) {
      e.preventDefault();
      $('html, body').animate(
        {
          scrollTop: $(targetId).offset().top - 80,
        },
        600
      );
    }
  });

  // Mobile menu toggle
  const $mobileMenu = $('.mobile-menu');
  const $hamburger = $('.hamburger');

  function toggleMobileMenu() {
    $mobileMenu.toggleClass('open');
    $hamburger.toggleClass('open');
  }

  $('.hamburger').on('click', function () {
    toggleMobileMenu();
  });

  $('.mobile-menu-close, .mobile-menu-links a').on('click', function () {
    if ($mobileMenu.hasClass('open')) {
      toggleMobileMenu();
    }
  });

  // Dashboard dropdown in nav
  $('.nav-dropdown-toggle').on('click', function (e) {
    e.stopPropagation();
    $(this).parent('.nav-dropdown').toggleClass('open');
  });

  $(document).on('click', function () {
    $('.nav-dropdown').removeClass('open');
  });

  // Back to top button
  const $backToTop = $('.back-to-top');

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 400) {
      $backToTop.addClass('show');
    } else {
      $backToTop.removeClass('show');
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  // Simple testimonial slider
  const $sliderTrack = $('.testimonial-track');
  const $slides = $('.testimonial-card');
  const $dots = $('.testimonial-dot');
  let currentSlide = 0;

  function goToSlide(index) {
    if (!$sliderTrack.length) return;
    currentSlide = index;
    const offset = -index * 100;
    $sliderTrack.css('transform', 'translateX(' + offset + '%)');
    $dots.removeClass('active').eq(index).addClass('active');
  }

  $dots.on('click', function () {
    const index = $(this).index();
    goToSlide(index);
  });

  if ($slides.length > 1) {
    setInterval(function () {
      const next = (currentSlide + 1) % $slides.length;
      goToSlide(next);
    }, 6000);
  }

  // Lightbox gallery
  const $lightboxOverlay = $('.lightbox-overlay');
  const $lightboxImage = $('.lightbox-content img');

  $('.gallery-item').on('click', function () {
    const imgSrc = $(this).find('img').attr('src');
    $lightboxImage.attr('src', imgSrc);
    $lightboxOverlay.addClass('open');
  });

  $('.lightbox-close, .lightbox-overlay').on('click', function (e) {
    if ($(e.target).is('.lightbox-overlay, .lightbox-close')) {
      $lightboxOverlay.removeClass('open');
    }
  });

  // Modal popup (generic for demo)
  $('[data-open-modal]').on('click', function (e) {
    e.preventDefault();
    const target = $(this).data('open-modal');
    $(target).addClass('open');
  });

  $('[data-close-modal]').on('click', function () {
    $(this).closest('.modal').removeClass('open');
  });

  // Table filtering
  $('[data-table-filter]').on('input change', function () {
    const targetTableSelector = $(this).data('table-filter');
    const value = $(this).val().toString().toLowerCase();

    $(targetTableSelector)
      .find('tbody tr')
      .each(function () {
        const rowText = $(this).text().toLowerCase();
        $(this).toggle(rowText.indexOf(value) > -1);
      });
  });

  // Basic form validation helpers
  function markInvalid($group, message) {
    $group.addClass('invalid');
    $group.find('.form-error').text(message);
  }

  function clearInvalid($group) {
    $group.removeClass('invalid');
  }

  function validateRequiredText($input, message) {
    const $group = $input.closest('.form-group');
    clearInvalid($group);
    if (!$input.val().trim()) {
      markInvalid($group, message || 'This field is required.');
      return false;
    }
    return true;
  }

  function validateEmail($input) {
    const $group = $input.closest('.form-group');
    clearInvalid($group);
    const value = $input.val().trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      markInvalid($group, 'Email is required.');
      return false;
    }
    if (!regex.test(value)) {
      markInvalid($group, 'Please enter a valid email address.');
      return false;
    }
    return true;
  }

  function validatePasswordMatch($password, $confirm) {
    const $group = $confirm.closest('.form-group');
    clearInvalid($group);
    if ($password.val() !== $confirm.val()) {
      markInvalid($group, 'Passwords do not match.');
      return false;
    }
    return true;
  }

  // Contact form validation
  $('#contactForm').on('submit', function (e) {
    const $form = $(this);
    let valid = true;

    const $name = $form.find('input[name="name"]');
    const $email = $form.find('input[name="email"]');
    const $subject = $form.find('input[name="subject"]');
    const $message = $form.find('textarea[name="message"]');

    valid &= validateRequiredText($name);
    valid &= validateEmail($email);
    valid &= validateRequiredText($subject);
    valid &= validateRequiredText($message);

    if (!valid) {
      e.preventDefault();
    } else {
      e.preventDefault();
      alert('Thank you! Your message has been submitted (demo only).');
      this.reset();
      $form.find('.form-group').removeClass('invalid');
    }
  });

  // Admission form validation
  $('#admissionForm').on('submit', function (e) {
    const $form = $(this);
    if (!$form.length) return;
    let valid = true;

    const $name = $form.find('input[name="student_name"]');
    const $email = $form.find('input[name="email"]');
    const $phone = $form.find('input[name="phone"]');
    const $class = $form.find('select[name="class"]');
    const $dob = $form.find('input[name="dob"]');

    valid &= validateRequiredText($name, 'Student name is required.');
    valid &= validateEmail($email);
    valid &= validateRequiredText($phone, 'Phone number is required.');
    valid &= validateRequiredText($dob, 'Date of birth is required.');

    const $classGroup = $class.closest('.form-group');
    clearInvalid($classGroup);
    if (!$class.val()) {
      markInvalid($classGroup, 'Please select a class.');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
    } else {
      e.preventDefault();
      alert('Admission form submitted successfully (demo only).');
      this.reset();
      $form.find('.form-group').removeClass('invalid');
    }
  });

  // Login form validation
  $('#loginForm').on('submit', function (e) {
    const $form = $(this);
    let valid = true;

    const $email = $form.find('input[name="email"]');
    const $password = $form.find('input[name="password"]');

    valid &= validateEmail($email);
    valid &= validateRequiredText($password, 'Password is required.');

    if (!valid) {
      e.preventDefault();
    } else {
      e.preventDefault();
      alert('Login successful (demo only).');
    }
  });

  // Register form validation
  $('#registerForm').on('submit', function (e) {
    const $form = $(this);
    let valid = true;

    const $name = $form.find('input[name="name"]');
    const $email = $form.find('input[name="email"]');
    const $password = $form.find('input[name="password"]');
    const $confirm = $form.find('input[name="confirm_password"]');

    valid &= validateRequiredText($name);
    valid &= validateEmail($email);
    valid &= validateRequiredText($password, 'Password is required.');
    valid &= validatePasswordMatch($password, $confirm);

    if (!valid) {
      e.preventDefault();
    } else {
      e.preventDefault();
      alert('Registration successful (demo only).');
      this.reset();
      $form.find('.form-group').removeClass('invalid');
    }
  });

  // Admission / dashboard modals or actions can hook here
});

