document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('[data-nav]');
  const btn = document.getElementById('cta-btn');

  // Плавный скролл по клику на пункты меню
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').replace('#', '');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });

        // Закрываем мобильное меню (если бы оно было) и убираем активный класс у всех ссылок
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // Подсветка активной секции при скролле (чтобы меню понимало, где ты сейчас)
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // Сдвигаем точку активации чуть выше, чтобы заголовок точно попадал в зону
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
        // Дополнительно: лёгкая анимация подчёркивания (CSS уже есть, это просто страховка)
        const underline = link.querySelector('::after');
        if (underline) {
          underline.style.width = '100%';
        }
      }
    });
  });

  // Анимация кнопки «Узнать больше»
  if (btn) {
    btn.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });

        // Лёгкий эффект пульсации
        btn.style.transform = 'scale(1.05)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 200);
      }
    });
  }
});