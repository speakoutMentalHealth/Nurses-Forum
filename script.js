const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const progress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const updateScrollUI = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progress) progress.style.width = `${percent}%`;
  if (backToTop) backToTop.classList.toggle('show', scrollTop > 600);
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const isOpen = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;

    document.querySelectorAll('.faq-question').forEach(other => {
      if (other !== button) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      }
    });

    button.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
  });
});

document.querySelectorAll('.training-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.training-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});
