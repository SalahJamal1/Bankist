'use strict';

const btn = document.querySelectorAll('.btn');
const btns = document.querySelector('.btns');
const btnClose = document.querySelector('.account_close');
const mobileClose = document.querySelector('.close');
const overlay = document.querySelector('.overlay');
const model = document.querySelector('.account');
const btnMenu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
const nav_list = document.querySelector('.nav_list');
const nav__link = document.querySelectorAll('.nav__link');
const features = document.getElementById('features');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const img = document.querySelectorAll('img[data-src]');
const opration_list = document.querySelector('.opration_list');
const operations__tab = document.querySelectorAll('.operations__tab');
const opration_content = document.querySelectorAll('.opration_content');
const section_3_slide = document.querySelectorAll('.section_3_slide');
const btnLeft = document.querySelector('.slideLeft');
const btnRight = document.querySelector('.slideRigth');
const dots = document.querySelector('.dots');
const dot = document.querySelectorAll('.dot');
//////////////

const OpenModel = type => {
  if (type === 'mobile') {
    nav.classList.add('nav_open');
    return;
  } else {
    model.classList.remove('hidden');
    overlay.classList.remove('hidden');
  }
};
const CloseModel = type => {
  if (type === 'mobile') {
    nav.classList.remove('nav_open');
    return;
  } else {
    model.classList.add('hidden');
    overlay.classList.add('hidden');
  }
};

btn.forEach(e => e.addEventListener('click', OpenModel));
btnClose.addEventListener('click', CloseModel);

btnMenu.addEventListener('click', OpenModel.bind(null, 'mobile'));
mobileClose.addEventListener('click', CloseModel.bind(null, 'mobile'));
document.querySelector('body').addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    CloseModel('mobile');
    CloseModel();
  }
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const target = e.target;
    nav__link.forEach(el => {
      if (target !== el) el.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

function stickyNav(entries, observe) {
  entries.forEach(entry => {
    if (entry.isIntersecting) nav.classList.remove('lazy');
    else nav.classList.add('lazy');
  });
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.15,
});

headerObserver.observe(header);

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    requestIdleCallback(() => {
      entry.target.classList.remove('section_hidden');
      observer.unobserve(entry.target);
    });
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section_hidden');
});

const lazyLoad = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0.5,
});

img.forEach(img => imgObserver.observe(img));

opration_list.addEventListener('click', function (e) {
  if (e.target.classList.contains('operations__tab')) {
    const clicked = e.target.dataset.tab;
    operations__tab.forEach(tab =>
      tab.classList.remove('operations__tab_active')
    );
    document
      .querySelector(`.operations__tab--${clicked}`)
      .classList.add('operations__tab_active');
    opration_content.forEach(content =>
      content.classList.remove('opration_content_active')
    );
    document
      .querySelector(`.opration_content--${clicked}`)
      .classList.add('opration_content_active');
  }
});

section_3_slide.forEach((slide, i) => {
  slide.style.transform = `translateX(${i * 100}%)`;
});

const activeSlide = function (slides) {
  dot.forEach(dot => dot.classList.remove('dot_active'));
  document.querySelector(`.dot-${slides}`).classList.add('dot_active');
};

const goToSlide = slides => {
  section_3_slide.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - slides) * 100}%)`;
  });
};

let currentSlide = 0;

btnRight.addEventListener('click', () => {
  if (currentSlide >= section_3_slide.length - 1) currentSlide = 0;
  else currentSlide++;
  goToSlide(currentSlide);
  activeSlide(currentSlide);
});

btnLeft.addEventListener('click', () => {
  if (currentSlide <= 0) currentSlide = section_3_slide.length - 1;
  else currentSlide--;
  goToSlide(currentSlide);
  activeSlide(currentSlide);
});

dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dot')) {
    const slides = e.target.dataset.dot;
    activeSlide(slides);
    goToSlide(slides);
  }
});
