/* THEME TOGGLE */
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.getElementById('navLinks').classList.remove('open');
        document.getElementById('menuToggle').classList.remove('open');
    });
});

const observerOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .contact-form, .gallery-item, footer').forEach(el => {
    observer.observe(el);
});

let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (currentScroll <= 0) {
        header.classList.remove('hidden');
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    lastScroll = currentScroll;
});

document.getElementById('menuToggle').addEventListener('click', function () {
    this.classList.toggle('open');
    document.getElementById('navLinks').classList.toggle('open');
});

document.getElementById('contactFormElement').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !telefono || !mensaje) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, ingresa un email válido.');
        return;
    }

    const servicio = document.getElementById('servicio').value;
    const numeroWhatsApp = '5493512648793';

    const textoWhatsApp = `Hola FibroLaser!

*Nuevo mensaje desde la web:*

*Nombre:* ${nombre}
*Email:* ${email}
*Teléfono:* ${telefono}
*Servicio de interés:* ${servicio}

*Mensaje:*
${mensaje}

¡Espero su respuesta!`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`, '_blank');

    const btn = document.querySelector('.submit-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 200);

    alert('¡Gracias por contactarnos! Serás redirigido a WhatsApp.');
});

const telefonoInput = document.getElementById('telefono');
telefonoInput.addEventListener('focus', function () {
    if (!this.value) this.placeholder = 'Ej: 3512648793';
});
telefonoInput.addEventListener('blur', function () {
    if (!this.value) this.placeholder = '+54 9 351 264 8793';
});

const modal = document.getElementById('videoModal');
const modalContainer = document.getElementById('modalVideoContainer');
const closeModal = document.getElementById('closeModal');
const videoItems = document.querySelectorAll('.gallery-video-item');

function openVideoModal(videoSrc) {
    modalContainer.innerHTML = `<iframe src="${videoSrc}" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    modal.classList.remove('active');
    modalContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

videoItems.forEach(item => {
    item.addEventListener('click', function () {
        const videoSrc = this.getAttribute('data-video-src');
        if (videoSrc) openVideoModal(videoSrc);
    });
});

closeModal.addEventListener('click', closeVideoModal);

modal.addEventListener('click', function (e) {
    if (e.target === modal) closeVideoModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeVideoModal();
});
