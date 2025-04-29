window.onbeforeunload = function () {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
};


if (window.innerWidth > 800)
  ScrollReveal({
    reset: false,
    distance: '150px',
    duration: 900,
    delay: 100,
    viewFactor: 0.4
  });

ScrollReveal().reveal('header', { origin: 'top', reset: false });
ScrollReveal().reveal('.bannerContent', { origin: 'left' });
ScrollReveal().reveal('.flip-container', { origin: 'right' });
ScrollReveal().reveal('.tech1,.tech2,.tech3,.tech4,.tech5', { origin: 'right', interval:200 });
ScrollReveal().reveal('#about h1, #about h3, #about p, #about button', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('#skills .card', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.cardp,.ta a,.foot p', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('#contact h1, #contact h3, #contact p, #contact .form-control,#contact .icon,.aboutimg,.fi i,.foot h3,.ta h3', { origin: 'left', interval: 100 });
ScrollReveal().reveal('footer', { origin: 'bottom' });


const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});


document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});