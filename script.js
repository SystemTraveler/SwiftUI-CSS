let startY = 0;
let currentY = 0;
let modalOpen = false;
let activatedDyn = false;
let twiceDyn = false;

const MainContent = document.getElementById('View');
const ModalContent = document.getElementById('ModalView');
const Time = document.getElementById('Time');
const Wifi = document.getElementById('wifi');
const Battery = document.getElementById('battery');
const Dynamic = document.getElementById('DynmicIsland');
const DynamicContent = document.getElementById('DynamicContent');
const SystemUI = document.getElementById('sysui');
const Overlay = document.getElementById('Overlay');

function openModal(modalname) {
    MainContent.classList.add('UnderModal');
    ModalContent.classList.add('Show');
    modalOpen = true;

    ModalContent.style.transition = '0.3s';

    MainContent.style = 'margin-top: 3vh';
    Time.style = 'color: #eee';

    Wifi.style.filter = 'invert(100%)';
    Battery.style.filter = 'invert(100%)';

    ModalContent.addEventListener('touchstart', onTouchStart);
    ModalContent.addEventListener('touchmove', onTouchMove);
    ModalContent.addEventListener('touchend', onTouchEnd);

    // Пример задержки в 1 секунду (1000 миллисекунд)
    setTimeout(function() {
        // Set transition to 0s initially
        ModalContent.style.transition = '0s';
        MainContent.style.transition = '0s';
    }, 300);
}

function DynamicAct() {
    Dynamic.classList.add('AnimDynamic');
    setTimeout(function() {
        // Set transition to 0s initially
        Dynamic.classList.remove('AnimDynamic');
    }, 300);
}

function DynamicInfo() {
    if (activatedDyn == false) {
        DynamicContent.style.display = 'flex';
        Dynamic.classList.add('Check');
        DynamicContent.classList.add('show');
        Wifi.style = 'margin-right: 45px;';
        Battery.style = 'margin-right: 2px;';
        Time.style = 'margin-left: -0px;';

        setTimeout(function() {
            // Set transition to 0s initially
            Dynamic.classList.remove('Check');
            DynamicContent.classList.remove('show');
            Wifi.style = '';
            Battery.style = '';
            Time.style = '';
            DynamicContent.style.display = 'none';
        }, 1500);
    } else {
        // Добавляем класс для анимации тряски
        Dynamic.classList.add('shake');

        // Удаляем класс после завершения анимации
        setTimeout(function() {
            Dynamic.classList.remove('shake');
        }, 500); // Время анимации в миллисекундах
    }
}

function updateTime() {
    const now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Удаляем ноль в начале у часов
    if (hours.startsWith('0')) {
        hours = hours.slice(1);
    }

    document.getElementById('Time').textContent = `${hours}:${minutes}`;
}

// Обновляем время сразу при загрузке страницы
updateTime();

// Устанавливаем интервал для обновления времени каждую секунду
setInterval(updateTime, 1000);

function DynamicChange() {
    DynamicContent.style.display = 'flex';
    activatedDyn = true;
    var textContent = DynamicContent.textContent;
    if (textContent == 'Бесшумно') {
        DynamicContent.innerHTML = 'Звонок';
        DynamicContent.style.color = '#EEE';
        Dynamic.classList.add('Action');

        // Удаляем класс после завершения анимации
        setTimeout(function() {
            Dynamic.classList.remove('shake');
        }, 500); // Время анимации в миллисекундах
    } else {
        DynamicContent.innerHTML = 'Бесшумно';
        DynamicContent.style.color = '#FF3B30';
        Dynamic.classList.add('Action');
    }
    DynamicContent.classList.add('show');
    Wifi.style = 'margin-right: -30px; filter: blur(5px); scale: 0.5;';
    Battery.style = 'margin-right: -30px; filter: blur(5px); scale: 0.5;';
    Time.style = 'margin-left: -100px; filter: blur(5px); scale: 0.5; color: #fff;';
    
    setTimeout(function() {
        // Set transition to 0s initially
        Dynamic.classList.remove('Action');
        Dynamic.classList.remove('Action2');
        DynamicContent.classList.remove('show');
        Wifi.style = '';
        Battery.style = '';
        Time.style = '';
        DynamicContent.style.display = 'none';
        activatedDyn = false;
    }, 1500);
}

function closeModal(modalname) {
    MainContent.classList.remove('UnderModal');
    ModalContent.classList.remove('Show');
    modalOpen = false;
    ModalContent.removeEventListener('touchstart', onTouchStart);
    ModalContent.removeEventListener('touchmove', onTouchMove);
    ModalContent.removeEventListener('touchend', onTouchEnd);

    // Remove inline styles from MainContent and ModalContent
    MainContent.style.transform = '';
    MainContent.style.transition = '';
    MainContent.style.width = '';
    MainContent.style.height = '';
    ModalContent.style.transform = '';
    ModalContent.style.transition = '';
    ModalContent.style.bottom = '';

    MainContent.style = 'margin-top: 0vh';
    Time.style = 'color: #000';
    
    Wifi.classList.remove('InvertImg');
    Battery.classList.remove('InvertImg');
    
}

function onTouchStart(e) {
    startY = e.touches[0].clientY;
}

function openView(viewId) {
    const addView = document.getElementById(viewId); // Corrected method name
    addView.classList.add('show');
    MainContent.classList.add('UnderView');
}

function closeView(viewId) {
    const addView = document.getElementById(viewId); // Corrected method name
    addView.classList.remove('show');
    MainContent.classList.remove('UnderView');
}

function onTouchMove(e) {
    currentY = e.touches[0].clientY;
    const distance = currentY - startY;
    if (distance > 0) {
        const maxDistance = window.innerHeight / 2;
        const fraction = Math.min(distance / maxDistance, 1);
        
        // Update modal transform
        ModalContent.style.transform = `translateY(${distance}px)`;

        // Update MainContent size and transform
        const newWidth = 80 + fraction * 8.5; // Increase width from 80vw to 88.5vw
        MainContent.style.width = `${newWidth}vw`;

        // Update MainContent transform
        const newTranslateY = 3 * (1 - fraction);
        MainContent.style.transform = `translateX(-50%) translateY(${newTranslateY}vh)`;

        // Update ModalContent bottom position
        const newBottom = 10 + 15 * fraction;
        ModalContent.style.bottom = `${newBottom}px`;

        // Update MainContent margin-top
        const newMarginTop = 3 - (3 * fraction);
        MainContent.style.marginTop = `${newMarginTop}vh`;

        // Update MainContent border-radius
        const newBorderRadius = 50 * fraction + 5; // Increase border-radius from 0 to 50px
        MainContent.style.borderRadius = `${newBorderRadius}px ${newBorderRadius}px 0px 0px`;

        // Update MainContent background-color
        const startColor = { r: 221, g: 221, b: 221 }; // #ddd
        const endColor = { r: 255, g: 255, b: 255 }; // #eee
        const newColor = {
            r: Math.round(startColor.r + (endColor.r - startColor.r) * fraction),
            g: Math.round(startColor.g + (endColor.g - startColor.g) * fraction),
            b: Math.round(startColor.b + (endColor.b - startColor.b) * fraction)
        };
        MainContent.style.backgroundColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
    }

    console.log(distance);
    if (distance >= 212) {
        Time.style.color = '#000';
        Wifi.style.filter = 'invert(0%)';
        Battery.style.filter = 'invert(0%)';
    } else {
        Time.style.color = '#eee';
        Wifi.style.filter = 'invert(100%)';
        Battery.style.filter = 'invert(100%)';
    }
}




function onTouchEnd(e) {
    const distance = currentY - startY;
    if (distance > window.innerHeight / 4) {
        closeModal('ModalView');
    } else {
        // Reset transforms with transition for smooth animation
        setTimeout(function() {
            // Set transition to 0s initially
            ModalContent.style = '';
        }, 300);
        ModalContent.style.transform = 'translateY(0)';
        ModalContent.style.bottom = '-10px';

        MainContent.style.transition = 'transform 0.3s, width 0.3s, height 0.3s';
        MainContent.style.transform = 'translateX(-50%) translateY(3vh)';
        MainContent.style.width = '80vw';
        MainContent.style.height = '100%';
    }
    startY = 0;
    currentY = 0;
}
