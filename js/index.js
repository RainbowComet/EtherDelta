document.querySelectorAll('button[type="submit"]').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Submit предотвращён');
    });
});

document.querySelectorAll('.js-price-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.js-price-btn').forEach(function(btn) {
            btn.classList.remove('chart__price-item--active');
        });

        // Добавляем активный класс только на нажатую кнопку
        this.classList.add('chart__price-item--active');
    });
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
});

