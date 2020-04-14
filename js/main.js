$(document).ready(function () {
  let resizeId; // for resize timer
  let wWidth = $(window).width(); // for resize

  function disableScrolling() {
    if ($(document).height() > $(window).height()) {
      var scrollTop = $('html').scrollTop()
        ? $('html').scrollTop()
        : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
      $('html')
        .addClass('disable-scrolling')
        .css('top', -scrollTop);
    }
  }

  function enableScrolling() {
    var scrollTop = parseInt($('html').css('top'));
    $('html').removeClass('disable-scrolling');
    $('html,body').scrollTop(-scrollTop);
  }

  function isMobile() {
    if ($('.is-mobile').css('display') === 'block') {
      return true;
    } else {
      return false;
    }
  }

  /* Init object fit polyfill */
  /* To make it work, add 'font-family: 'object-fit: cover;';' to image */
  if (window.objectFitImages) {
    window.objectFitImages();
  }

  if (window.ScrollReveal) {
    let sr = window.ScrollReveal();

    let slideUp = {
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      duration: 1200,
    };

    let slideUpInterval = {
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      duration: 1200,
      interval: 300,
    };

    let fadeIn = {
      opacity: 0,
      duration: 1200,
      debug: true,
    };

    let fadeInInterval = {
      opacity: 0,
      duration: 1200,
      interval: 300,
    };

    sr.reveal('.slideUp', slideUp);
    sr.reveal('.slideUpInterval', slideUpInterval);
    sr.reveal('.fadeIn', fadeIn);
    sr.reveal('.fadeInInterval', fadeInInterval);
  }

  $('.scroll-link').on('click', e => {
    let target = $(this).attr('href');
    $('html,body').animate(
      {
        scrollTop: $(target).offset().top
      },
      1000
    );
  });

  ///  HEADER
  //reseting header

  function headerReset() {
    enableScrolling();
    $('.header').removeClass('is-active');
    $('.header__hamburger').removeClass('is-active');
    $('.header__nav').removeClass('is-active');
  }

  $('.header__hamburger').on('click', function (e) {
    e.stopPropagation();
    if ($('html').hasClass('disable-scrolling')) {
      enableScrolling();
    } else {
      disableScrolling();
    }

    $(this).toggleClass('is-active');
    $('.header').toggleClass('is-active');
    $('.header-nav').toggleClass('is-active');
  });

  $('.header-nav__list-item--dropdown').on('mouseenter', function (e) {
    $(this).addClass('is-active');
    if(isMobile()){
        $('.header-nav__sublist').slideUp();
        $(this).find('ul.header-nav__sublist').slideDown();
    } else {
      $(this).addClass('is-active');
    }
  }).on('mouseleave', function (e) {
    $(this).removeClass('is-active');
    if(isMobile()) {
      $('.header-nav__sublist').slideUp();
    } else {
      return;
    }
  });

/// End header

  $('.home-hero__carousel').slick({
    dots: true,
    arrows: false,
  });


  /* Trigger resize once */
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing(wWidth), 500);

    function doneResizing() {
      let width = $(window).width();
      if (wWidth !== width) {
        wWidth = width;
      }
    }
  });

});
