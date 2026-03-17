$(function () {
  var $header = $('.header');
  var $navLinks = $('.nav-links');
  var $menuToggle = $('.menu-toggle');
  var $backToTop = $('<button class="back-to-top" aria-label="Back to top"><i class="fa fa-arrow-up"></i></button>');
  $('body').append($backToTop);

  function onScroll() {
    if (window.scrollY > 10) {
      $header.addClass('is-sticky');
      $backToTop.addClass('show');
    } else {
      $header.removeClass('is-sticky');
      $backToTop.removeClass('show');
    }
  }
  onScroll();
  $(window).on('scroll', onScroll);

  $menuToggle.on('click', function () {
    $navLinks.toggleClass('open');
  });
  $('.nav-links a').on('click', function () {
    $navLinks.removeClass('open');
  });

  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 64 }, 400);
    }
  });

  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  var $testimonials = $('.testimonial');
  if ($testimonials.length) {
    var idx = 0;
    $testimonials.removeClass('active').eq(0).addClass('active');
    setInterval(function () {
      $testimonials.eq(idx).removeClass('active');
      idx = (idx + 1) % $testimonials.length;
      $testimonials.eq(idx).addClass('active');
    }, 4500);
  }

  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    if (filter === 'all') {
      $('.room-card').fadeIn(180);
    } else {
      $('.room-card').hide();
      $('.room-card[data-category="' + filter + '"]').fadeIn(180);
    }
  });

  var $lightbox = $('<div class="lightbox" role="dialog" aria-modal="true"><span class="close">&times;</span><img alt="Preview"/></div>');
  $('body').append($lightbox);
  var $lightboxImg = $lightbox.find('img');
  $('.gallery-item img').on('click', function () {
    $lightboxImg.attr('src', $(this).attr('src'));
    $lightbox.addClass('open');
  });
  $lightbox.on('click', function (e) {
    if ($(e.target).is('.close') || e.target === this) $lightbox.removeClass('open');
  });
  $(document).on('keyup', function (e) {
    if (e.key === 'Escape') $lightbox.removeClass('open');
  });

  var $bookingForm = $('#bookingForm');
  var $confirmModal = $('#confirmModal');
  function setError($el, message) {
    var $group = $el.closest('.form-group');
    var $err = $group.find('.error-text');
    $err.text(message || '');
    if (message) $el.addClass('invalid'); else $el.removeClass('invalid');
  }
  if ($bookingForm.length) {
    $bookingForm.on('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var name = $('#guestName');
      var email = $('#email');
      var phone = $('#phone');
      var roomType = $('#roomType');
      var checkIn = $('#checkIn');
      var checkOut = $('#checkOut');
      var guests = $('#guests');

      if (!name.val().trim()) { setError(name, 'Required'); valid = false; } else setError(name, '');
      var emailVal = email.val().trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      if (!emailOk) { setError(email, 'Invalid email'); valid = false; } else setError(email, '');
      if (!phone.val().trim()) { setError(phone, 'Required'); valid = false; } else setError(phone, '');
      if (!roomType.val()) { setError(roomType, 'Select a room'); valid = false; } else setError(roomType, '');
      if (!checkIn.val()) { setError(checkIn, 'Required'); valid = false; } else setError(checkIn, '');
      if (!checkOut.val()) { setError(checkOut, 'Required'); valid = false; } else setError(checkOut, '');
      if (checkIn.val() && checkOut.val()) {
        var inDate = new Date(checkIn.val());
        var outDate = new Date(checkOut.val());
        if (!(outDate > inDate)) { setError(checkOut, 'Must be after check-in'); valid = false; }
      }
      var g = parseInt(guests.val(), 10);
      if (!g || g < 1) { setError(guests, 'Must be at least 1'); valid = false; } else setError(guests, '');

      if (!valid) return;

      $('#confirmDetails').html(
        '<p><strong>Name:</strong> ' + $('<div/>').text(name.val()).html() + '</p>' +
        '<p><strong>Email:</strong> ' + $('<div/>').text(email.val()).html() + '</p>' +
        '<p><strong>Phone:</strong> ' + $('<div/>').text(phone.val()).html() + '</p>' +
        '<p><strong>Room:</strong> ' + $('<div/>').text($('#roomType option:selected').text()).html() + '</p>' +
        '<p><strong>Dates:</strong> ' + checkIn.val() + ' to ' + checkOut.val() + '</p>' +
        '<p><strong>Guests:</strong> ' + g + '</p>' +
        '<p><strong>Requests:</strong> ' + $('<div/>').text($('#requests').val()).html() + '</p>'
      );
      $confirmModal.addClass('open');
    });
    $('.modal-close, #confirmOk').on('click', function () {
      $confirmModal.removeClass('open');
    });
  }
}); 
