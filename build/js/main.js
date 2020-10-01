$('.teacher').slick({
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
    ]
});

$('.reviews__slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1
});

let initMobileMenu = () => {
  if ($(window).width() <= 767 && $('.header__mobile').length === 0) {
      $('.header:not(.footer) .container').append('<div class="header__mobile">Меню <img src="img/mobile.svg" alt=""></div>');
      $('.header__menu').append('<img src="img/mobile.svg" alt="">');
      $('.how__path svg').remove();
      $('.dot').after('<svg width="290" height="301" viewBox="0 0 290 301" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path" d="M11.695 2.02865C5.7154 1.71534 3.26281 3.94977 2.2952 9.81663V31.8034C3.26281 37.6702 10.1166 41.0976 16.0962 40.7843L278.81 40.7843C284.789 40.471 287.032 49.1116 288 54.9785L288 103.644C287.032 109.511 284.789 128.813 278.81 128.5H11.6947C5.7151 128.187 3.26281 131.133 2.2952 137V178.236V194.736C3.26281 200.603 5.7154 202.456 11.695 202.143L278.81 202.143C281.873 201.595 288 203 288 213L288 230.166V248.306C287.032 254.173 284.789 262.813 278.81 262.5H238.849H211.005C205.67 261.5 194.9 261.3 194.5 268.5V299" stroke="#AA5FFE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/></svg>');
  } else if ($(window).width() > 1023  && $('.header__mobile').length > 0) {
      $('.header__mobile').remove();
      $('.header__menu img').remove();
      $('.how__path svg').remove();
      $('.dot').after('<svg width="594" height="492" viewBox="0 0 594 492" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="path" d="M21.4113 1.60707C9.06295 1.06627 3.99819 4.92303 2 15.0496V53C3.99819 63.1266 18.1517 69.0424 30.5 68.5016L573.022 68.5016C585.371 67.9608 590.002 82.875 592 93.0016L592.001 177.002C590.002 187.128 585.371 192.865 573.022 192.324L21.4113 192.324C9.06295 191.783 3.99819 197.875 2 208.002V290.878C3.99819 301.004 9.06295 304.861 21.4113 304.32L573.022 304.32C585.371 303.779 590.002 311.253 592 321.38V384C590.002 394.127 585.37 409.041 573.022 408.5H490.5H433C425.5 409.5 411.4 415.1 415 429.5V490.5" stroke="#AA5FFE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/></svg>');
  }
}

initMobileMenu();

$(window).on('resize', initMobileMenu);

gsap.registerPlugin(MotionPathPlugin);

let offset = 0;

if ($(window).width() <= 1023 && $(window).width() >= 768) {
  offset = 250;
}

if ($(window).width() <= 767) {
  offset = 600;
}

let update = () => {
  tween.progress(((scrollY - startY + offset) / finishDistance) * 8);
  
  requestId = null;
}

const offsetFromTop = innerHeight * 0.25;
const pathBB = document.querySelector("#path").getBoundingClientRect();
const startY = pathBB.top - innerHeight + offsetFromTop;
const finishDistance = startY + pathBB.height - offsetFromTop;

let tween = gsap.to(".dot", {
  duration: 5, 
  paused: true,
  ease: "none",
  motionPath: {
    path: "#path",
    align: "#path",
    autoRotate: true,
    alignOrigin: [0.5, 0.5]
  }    
}).pause(0.001);

document.addEventListener("scroll", function() {
  if (!requestId) {
    requestId = requestAnimationFrame(update);
  }
});

update();

let forSlider = () => {
  if ($(window).width() <= 1023) {
    $('.for h2').after('<div class="for__slider"></div>');
    $('.for__slider').append($('.for__item'));

    $('.for__slider').slick({
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }
}

forSlider();

$('body').on('click', '.header__mobile, .header__menu img', (e) => {
  $('.header__mobile').toggleClass('active');
  $('.header__menu').toggleClass('active');
  $('.header__menu').slideToggle();
});

$('body').append('<div class="backdrops"></div>');

gsap.set($('iframe'), {display: 'none', opacity: 0 });
gsap.set($('.backdrops'), {display: 'none', opacity: 0 });

$('body').on('click', '.btn', (e) => {
  gsap.to($('iframe'), 0.5, {display: 'block', opacity: 1 });
  gsap.to($('.backdrops'), 0.5, {display: 'block', opacity: 0.3 });
  $('iframe').css('top', `${($(window).height() / 2) - ($('iframe').height() / 2)}px`).css('left', `${($(window).width() / 2) - ($('iframe').width() / 2)}px`);
});

$('body').on('click', '.backdrops', (e) => {
  gsap.to($('iframe'), 0.5, { display: 'none', opacity: 0  });
  gsap.to($('.backdrops'), 0.5, { display: 'none', opacity: 0  });
});