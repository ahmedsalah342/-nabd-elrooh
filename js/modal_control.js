// التحكم في النوافذ المنبثقة
let activeModal = null;

function showModal(modalId) {
    // إغلاق النافذة المفتوحة حالياً إن وجدت
    if (activeModal) {
        closeModal(activeModal);
    }

    const modal = document.getElementById(modalId);
    if (!modal) return;

    // إضافة طبقة التعتيم إذا لم تكن موجودة
    let overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        document.body.appendChild(overlay);
    }

    // تفعيل طبقة التعتيم والنافذة
    overlay.classList.add('active');
    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // تحديث النافذة النشطة
    activeModal = modalId;

    // منع التمرير في الخلفية
    document.body.style.overflow = 'hidden';

    // إضافة مستمع لإغلاق النافذة عند النقر خارجها
    overlay.onclick = function(e) {
        if (e.target === overlay) {
            closeModal(modalId);
        }
    };
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.querySelector('.modal-overlay');
    
    if (modal) {
        modal.classList.remove('active');
    }
    
    if (overlay) {
        overlay.classList.remove('active');
    }

    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    activeModal = null;
}

// إضافة مستمع للمفتاح Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && activeModal) {
        closeModal(activeModal);
    }
});
