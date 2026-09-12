// ========================================
// TOAST
// ========================================
const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
}

// ========================================
// COPIAR PARA ÁREA DE TRANSFERÊNCIA
// ========================================
function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(ta);
            resolve();
        } catch (err) {
            document.body.removeChild(ta);
            reject(err);
        }
    });
}

// ========================================
// PIX - COPIAR CHAVE (Mirelly - demonstrativo)
// ========================================
const pixBtn = document.getElementById('pixBtn');
const pixKey = 'studioemilyrussel@pix.com.br';

pixBtn.addEventListener('click', () => {
    copyText(pixKey).then(() => {
        showToast('Chave PIX copiada! Mencione os 10% off no agendamento ✨');
    }).catch(() => {
        showToast('Chave PIX: ' + pixKey);
    });
});

// ========================================
// ROLAGEM SUAVE PARA ANCORAS
// ========================================
function smoothScrollTo(id) {
    const target = document.querySelector(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

const locBtn = document.getElementById('locBtn');
if (locBtn) {
    locBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo('#localizacao');
    });
}

const hoursBtn = document.getElementById('hoursBtn');
if (hoursBtn) {
    hoursBtn.addEventListener('click', () => {
        smoothScrollTo('#horarios');
    });
}

// ========================================
// MODAL DE WI-FI
// ========================================
const wifiBtn = document.getElementById('wifiBtn');
const wifiModal = document.getElementById('wifiModal');
const wifiClose = document.getElementById('wifiClose');
const wifiPhone = document.getElementById('wifiPhone');

function openModal(modal) {
    modal.classList.add('open');
    modal.hidden = false;
    document.body.classList.add('no-scroll');
}

function closeModal(modal) {
    modal.classList.remove('open');
    setTimeout(() => { modal.hidden = true; }, 250);
    document.body.classList.remove('no-scroll');
}

if (wifiBtn && wifiModal) {
    wifiBtn.addEventListener('click', () => openModal(wifiModal));
    wifiClose.addEventListener('click', () => closeModal(wifiModal));

    wifiModal.addEventListener('click', (e) => {
        if (e.target === wifiModal) closeModal(wifiModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(wifiModal);
    });

    if (wifiPhone) {
        wifiPhone.addEventListener('click', () => {
            window.open('https://api.whatsapp.com/send?phone=555191140397', '_blank');
        });
    }
}

// ========================================
// BOTÕES DE COPIAR (Wi-Fi)
// ========================================
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        copyText(btn.getAttribute('data-copy')).then(() => {
            const original = btn.textContent;
            btn.textContent = 'Copiado ✓';
            setTimeout(() => { btn.textContent = original; }, 1500);
        });
    });
});

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll(
    '.action-btn, .catalog-item, .vitrine-card, .hours-card, .map-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));
