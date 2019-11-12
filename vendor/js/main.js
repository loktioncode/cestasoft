jQuery(document).ready(function( $ ) {

  $(window).scroll(function () {
    var height = $(window).height();
    var scroll = $(window).scrollTop();
    if (scroll) {
      $(".header-hide").addClass("scroll-header");
    } else {
      $(".header-hide").removeClass("scroll-header");
    }

  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Modal video
  new ModalVideo('.js-modal-btn', {channel: 'youtube'});

  // Init Owl Carousel
  $('.carousel').owlCarousel({
    items: 4,
    autoplay: true,
    loop: true,
    margin: 30,
    dots: true,
    responsiveClass: true,
    responsive: {

      320: { items: 1},
      480: { items: 2},
      600: { items: 2},
      767: { items: 3},
      768: { items: 3},
      992: { items: 4}
    }
  });

// custom code

});

// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: })
  .add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 50
  }).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
  }).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  var $slider = $('.slider');
  var $slickTrack = $('.slick-track');
  var $slickCurrent = $('.slick-current');

  var slideDuration = 900;

  //RESET ANIMATIONS
  // On init slide change
  $slider.on('init', function(slick){
    TweenMax.to($('.slick-track'), 0.9, {
      marginLeft: 0
    });
    TweenMax.to($('.slick-active'), 0.9, {
      x: 0,
      zIndex: 2
    });
  });
  // On before slide change
  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    TweenMax.to($('.slick-track'), 0.9, {
      marginLeft: 0
    });
    TweenMax.to($('.slick-active'), 0.9, {
      x: 0
    });
  });

  // On after slide change
  $slider.on('afterChange', function(event, slick, currentSlide){
    TweenMax.to($('.slick-track'), 0.9, {
      marginLeft: 0
    });
    $('.slick-slide').css('z-index','1');
    TweenMax.to($('.slick-active'), 0.9, {
      x: 0,
      zIndex: 2
    });
  });

  //SLICK INIT
  $slider.slick({
    speed: slideDuration,
    dots: true,
    waitForAnimate: true,
    useTransform: true,
    cssEase: 'cubic-bezier(0.455, 0.030, 0.130, 1.000)'
  })

  //PREV
  $('.slick-prev').on('mouseenter', function(){
                  TweenMax.to($('.slick-track'), 0.6, {
                    marginLeft: "180px",
                    ease: Quad.easeOut
                  });
                  TweenMax.to($('.slick-current'), 0.6, {
                    x: -100,
                    ease: Quad.easeOut
                  });
              });

  $('.slick-prev').on('mouseleave', function(){
                  TweenMax.to($('.slick-track'), 0.4, {
                    marginLeft: 0,
                    ease: Sine.easeInOut
                  });
                  TweenMax.to($('.slick-current'), 0.4, {
                    x: 0,
                    ease: Sine.easeInOut
                  });
              });

  //NEXT
  $('.slick-next').on('mouseenter', function(){
    
                  TweenMax.to($('.slick-track'), 0.6, {
                    marginLeft: "-180px",
                    ease: Quad.easeOut
                  });
                  TweenMax.to($('.slick-current'), 0.6, {
                    x: 100,
                    ease: Quad.easeOut
                  });
              });

  $('.slick-next').on('mouseleave', function(){
                  TweenMax.to($('.slick-track'), 0.4, {
                    marginLeft: 0,
                    ease: Quad.easeInOut
                  });
                  TweenMax.to($('.slick-current'), 0.4, {
                    x: 0,
                    ease: Quad.easeInOut
                  });
              });
