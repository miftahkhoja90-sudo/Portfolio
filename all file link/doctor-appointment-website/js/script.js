// Main UI interactions and jQuery logic for MediCare website

$(document).ready(function () {
    // =====================
    // Sticky header & back-to-top button
    // =====================
    var $header = $('.site-header');
    var $backToTop = $('#back-to-top');

    function handleScroll() {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 12) {
            $header.addClass('scrolled');
            $backToTop.addClass('show');
        } else {
            $header.removeClass('scrolled');
            $backToTop.removeClass('show');
        }
    }

    handleScroll();
    $(window).on('scroll', handleScroll);

    $backToTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    // =====================
    // Mobile navigation
    // =====================
    $('.nav-toggle').on('click', function () {
        $('.main-nav').toggleClass('open');
    });

    $('.nav-menu a').on('click', function () {
        $('.main-nav').removeClass('open');
    });

    // =====================
    // Smooth scrolling for in-page anchors
    // =====================
    $('a[href^="#"]').on('click', function (e) {
        var targetId = $(this).attr('href');
        if (targetId.length > 1) {
            var $target = $(targetId);
            if ($target.length) {
                e.preventDefault();
                var offset = $target.offset().top - 80;
                $('html, body').animate({ scrollTop: offset }, 600);
            }
        }
    });

    // =====================
    // Current year in footer
    // =====================
    var year = new Date().getFullYear();
    $('#current-year').text(year);

    // =====================
    // Testimonials slider
    // =====================
    (function initTestimonialsSlider() {
        var $items = $('.testimonial');
        var $dots = $('.testimonial-dots .dot');
        if (!$items.length) return;

        var current = 0;
        var intervalMs = 6000;
        var timer;

        function show(index) {
            $items.removeClass('active').eq(index).addClass('active');
            $dots.removeClass('active').eq(index).addClass('active');
            current = index;
        }

        function next() {
            var nextIndex = (current + 1) % $items.length;
            show(nextIndex);
        }

        $dots.on('click', function () {
            var idx = $(this).data('index');
            show(idx);
            restart();
        });

        function start() {
            timer = setInterval(next, intervalMs);
        }

        function restart() {
            clearInterval(timer);
            start();
        }

        show(0);
        start();
    })();

    // =====================
    // Doctors filter by specialization
    // =====================
    $('.filter-btn').on('click', function () {
        var filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        var $cards = $('.doctor-card');

        if (filter === 'all') {
            $cards.stop(true, true).fadeIn(200);
            return;
        }

        $cards.each(function () {
            var $card = $(this);
            var specialization = String($card.data('specialization')).toLowerCase();
            if (specialization === String(filter).toLowerCase()) {
                $card.stop(true, true).fadeIn(200);
            } else {
                $card.stop(true, true).fadeOut(200);
            }
        });
    });

    // =====================
    // Generic helpers for form validation
    // =====================
    function clearErrors($form) {
        $form.find('.error-message').remove();
        $form.find('.error').removeClass('error');
    }

    function showError($field, message) {
        $field.addClass('error');
        if (!$field.next('.error-message').length) {
            $('<span class="error-message"></span>').text(message).insertAfter($field);
        }
    }

    function isValidEmail(email) {
        var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function isValidPhone(phone) {
        var pattern = /^[0-9+\-\s]{7,20}$/;
        return pattern.test(phone);
    }

    // =====================
    // Appointment forms (quick + full)
    // =====================
    function validateAppointmentForm($form) {
        clearErrors($form);
        var isValid = true;

        var $name = $form.find('[name="patient_name"]');
        var $phone = $form.find('[name="phone"]');
        var $department = $form.find('[name="department"]');
        var $date = $form.find('[name="date"]');
        var $email = $form.find('[name="email"]');
        var $doctor = $form.find('[name="doctor"]');
        var $time = $form.find('[name="time"]');

        var nameVal = $.trim($name.val());
        if (!nameVal) {
            isValid = false;
            showError($name, 'Please enter patient name.');
        }

        if ($email.length) {
            var emailVal = $.trim($email.val());
            if (!emailVal) {
                isValid = false;
                showError($email, 'Please enter email address.');
            } else if (!isValidEmail(emailVal)) {
                isValid = false;
                showError($email, 'Please enter a valid email.');
            }
        }

        var phoneVal = $.trim($phone.val());
        if (!phoneVal) {
            isValid = false;
            showError($phone, 'Please enter phone number.');
        } else if (!isValidPhone(phoneVal)) {
            isValid = false;
            showError($phone, 'Please enter a valid phone number.');
        }

        if ($department.length && !$department.val()) {
            isValid = false;
            showError($department, 'Please select a department.');
        }

        if ($doctor && $doctor.length && !$doctor.val()) {
            isValid = false;
            showError($doctor, 'Please select a doctor.');
        }

        if ($date.length && !$date.val()) {
            isValid = false;
            showError($date, 'Please choose a preferred date.');
        }

        if ($time && $time.length && !$time.val()) {
            isValid = false;
            showError($time, 'Please select a time slot.');
        }

        return {
            valid: isValid,
            nameValue: nameVal
        };
    }

    function openModal($modal, messageOverride) {
        if (messageOverride) {
            $modal.find('p').first().text(messageOverride);
        }
        $modal.addClass('open').attr('aria-hidden', 'false');
    }

    function closeModal($modal) {
        $modal.removeClass('open').attr('aria-hidden', 'true');
    }

    // Bind appointment forms
    $('.appointment-form').on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        var result = validateAppointmentForm($form);

        if (result.valid) {
            var $modal = $('#appointment-success');
            var baseMessage = 'Thank you for booking with MediCare Hospital. Our team will contact you shortly to confirm your appointment details.';
            if (result.nameValue) {
                baseMessage = 'Thank you, ' + result.nameValue + '. Our team will contact you shortly to confirm your appointment details.';
            }
            openModal($modal, baseMessage);
            this.reset();
        }
    });

    // =====================
    // Contact form validation
    // =====================
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        clearErrors($form);
        var isValid = true;

        var $name = $form.find('[name="name"]');
        var $email = $form.find('[name="email"]');
        var $phone = $form.find('[name="phone"]');
        var $subject = $form.find('[name="subject"]');
        var $message = $form.find('[name="message"]');

        if (!$.trim($name.val())) {
            isValid = false;
            showError($name, 'Please enter your name.');
        }

        var emailVal = $.trim($email.val());
        if (!emailVal) {
            isValid = false;
            showError($email, 'Please enter your email address.');
        } else if (!isValidEmail(emailVal)) {
            isValid = false;
            showError($email, 'Please enter a valid email.');
        }

        var phoneVal = $.trim($phone.val());
        if (!phoneVal) {
            isValid = false;
            showError($phone, 'Please enter your phone number.');
        } else if (!isValidPhone(phoneVal)) {
            isValid = false;
            showError($phone, 'Please enter a valid phone number.');
        }

        if (!$.trim($subject.val())) {
            isValid = false;
            showError($subject, 'Please add a subject.');
        }

        if (!$.trim($message.val())) {
            isValid = false;
            showError($message, 'Please write your message.');
        }

        if (isValid) {
            var $modal = $('#contact-success');
            openModal($modal);
            this.reset();
        }
    });

    // =====================
    // Modal close interactions
    // =====================
    $('.modal-overlay, .modal-close, .modal-ok').on('click', function () {
        var $modal = $(this).closest('.modal');
        closeModal($modal);
    });
});

