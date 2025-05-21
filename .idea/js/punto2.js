document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año en el footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Animación para las tarjetas al cargar
    const cards = document.querySelectorAll('.category-card, .trend');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Configuración inicial para la animación
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Efecto hover para los pasos
    const steps = document.querySelectorAll('.step');

    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.querySelector('.step-number').style.transform = 'scale(1.1)';
        });

        step.addEventListener('mouseleave', function() {
            this.querySelector('.step-number').style.transform = 'scale(1)';
        });
    });

    // Console info
    console.log('%cHerramientas de Desarrollo', 'color: #4d8ac8; font-size: 16px; font-weight: bold;');
    console.log('Este sitio muestra las herramientas esenciales para el desarrollo de software moderno');
    console.log('Actualizado en 2023 con las últimas tendencias del mercado');
});