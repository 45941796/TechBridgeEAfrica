document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // Particle Animation
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: ['#1E3A8A', '#06B6D4', '#F97316'][Math.floor(Math.random() * 3)]
        };
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = 0.7;
            ctx.fill();
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Dark Mode Toggle
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            toggleButton.textContent = document.body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
        });
    }

    // Modal Functionality
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.querySelector('.modal-close');
    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', () => {
            modalTitle.textContent = button.parentElement.dataset.modalTitle;
            modalDescription.textContent = button.parentElement.dataset.modalDescription;
            modal.style.display = 'block';
            modal.classList.add('animate__animated', 'animate__fadeIn');
        });
    });
    modalClose.addEventListener('click', () => {