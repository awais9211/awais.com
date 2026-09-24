const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');
const progress = document.querySelector('.scroll-progress');
const backTop = document.querySelector('.back-top');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

function updateScroll() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;

  backTop.classList.toggle('show', scrollTop > 500);

  let current = 'home';
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 180) current = section.id;
  });

  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}
window.addEventListener('scroll', updateScroll);
updateScroll();

backTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.getElementById('contactForm');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  const receiver = 'your@email.com';
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `mailto:${receiver}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
