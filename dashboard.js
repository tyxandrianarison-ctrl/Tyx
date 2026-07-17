const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.card');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');
    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (filter === 'tous' || filter === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
