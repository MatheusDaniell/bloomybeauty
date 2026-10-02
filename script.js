/* ========== MENU HAMBÚRGUER ========== */
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
// Fecha o menu ao clicar em um link
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

/* ========== FILTRO DO CATÁLOGO ========== */
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  const f = chip.dataset.filter;
  cards.forEach(card => {
    const show = f === 'todos' || card.dataset.cat.split(' ').includes(f);
    card.classList.toggle('hide', !show);
  });
}));

/* ========== CARROSSEL DE DEPOIMENTOS ========== */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
let current = 0, timer;
slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
  b.addEventListener('click', () => { go(i); restart(); });
  dots.appendChild(b);
});
function go(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((s, n) => s.classList.toggle('active', n === current));
  dots.querySelectorAll('button').forEach((d, n) => d.classList.toggle('active', n === current));
}
function restart() { clearInterval(timer); timer = setInterval(() => go(current + 1), 6000); }
document.querySelector('.prev').addEventListener('click', () => { go(current - 1); restart(); });
document.querySelector('.next').addEventListener('click', () => { go(current + 1); restart(); });
go(0); restart();

/* ========== FORMULÁRIO COM VALIDAÇÃO ========== */
const form = document.getElementById('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const { nome, tel, msg } = form.elements;
  const digits = tel.value.replace(/\D/g, '');
  const rules = [
    [nome, nome.value.trim().length >= 2, 'Digite seu nome.'],
    [tel, digits.length >= 10 && digits.length <= 11, 'Digite um telefone com DDD.'],
    [msg, msg.value.trim().length >= 5, 'Escreva uma mensagem com pelo menos 5 caracteres.']
  ];
  let valid = true;
  rules.forEach(([field, ok, text]) => {
    field.classList.toggle('invalid', !ok);
    field.parentElement.querySelector('.err').textContent = ok ? '' : text;
    if (!ok) valid = false;
  });
  if (!valid) return;
  // Abre o WhatsApp com a mensagem pronta
  const text = `Olá! Meu nome é ${nome.value.trim()} (${tel.value.trim()}). ${msg.value.trim()}`;
  window.open('https://wa.me/5582999820188?text=' + encodeURIComponent(text), '_blank', 'noopener');
  form.querySelector('.ok').textContent = 'Pronto! Continue a conversa no WhatsApp.';
  form.reset();
});

/* ========== FADE-IN NO SCROLL ========== */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ========== ANO NO RODAPÉ ========== */
document.getElementById('year').textContent = new Date().getFullYear();
