const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('active');
  menuBtn.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', isOpen);
});