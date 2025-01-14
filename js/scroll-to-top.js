// التأكد من تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة زر التمرير للصفحة الرئيسية
    const mainScrollBtn = document.createElement('button');
    mainScrollBtn.id = 'scrollToTop';
    mainScrollBtn.title = 'العودة لأعلى';
    mainScrollBtn.innerHTML = '↑';
    document.body.appendChild(mainScrollBtn);

    // دالة لفحص موضع التمرير وإظهار/إخفاء الزر
    function checkScroll(element) {
        const scrollTop = element ? element.scrollTop : window.scrollY;
        const scrollHeight = element ? element.scrollHeight : document.documentElement.scrollHeight;
        const clientHeight = element ? element.clientHeight : window.innerHeight;

        if (scrollTop > 100 && scrollHeight > clientHeight + 100) {
            mainScrollBtn.style.display = 'flex';
        } else {
            mainScrollBtn.style.display = 'none';
        }
    }

    // أحداث التمرير للمتصفح والموبايل
    function handleScroll(event) {
        const modal = event.target.closest('.modal-content');
        checkScroll(modal || window);
    }

    // إضافة مستمعات الأحداث
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('touchmove', handleScroll, { passive: true });

    // التمرير لأعلى عند النقر على الزر
    mainScrollBtn.addEventListener('click', function() {
        const modal = document.querySelector('.modal.show .modal-content');
        if (modal) {
            modal.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // معالجة النوافذ المنبثقة
    function handleModal(modal) {
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.addEventListener('scroll', handleScroll, { passive: true });
            content.addEventListener('touchmove', handleScroll, { passive: true });
        }
    }

    // معالجة النوافذ المنبثقة الموجودة
    document.querySelectorAll('.modal').forEach(handleModal);

    // مراقبة النوافذ المنبثقة الجديدة
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('modal')) {
                    handleModal(node);
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
