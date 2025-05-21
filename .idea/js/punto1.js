document.addEventListener('DOMContentLoaded', function() {
    // Animación para las tarjetas al cargar la página
    const cards = document.querySelectorAll('.version-card');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Configuración inicial para la animación
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Efecto hover para los comandos
    const commandItems = document.querySelectorAll('.command-category li');

    commandItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Mostrar año actual en el footer
    const yearSpan = document.createElement('span');
    yearSpan.textContent = new Date().getFullYear();
    document.querySelector('.main-footer p').innerHTML =
        document.querySelector('.main-footer p').innerHTML.replace('2023', yearSpan.outerHTML);

    // Smooth scrolling para anclas (si las hubiera)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Console log educativo
    console.log('%c¿Aprendiendo sobre control de versiones?',
        'color: #3498db; font-size: 16px; font-weight: bold;');
    console.log('Este sitio fue creado para mostrar las diferencias entre versionamiento local y remoto.');
    console.log('¡Esperamos que te sea útil en tu aprendizaje!');
});