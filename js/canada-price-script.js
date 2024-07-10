document.addEventListener('DOMContentLoaded', (event) => {
    loadPriceModifier();
    updatePrices();
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copy successful!');
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
}

function copyToClipboardWithNotification(product, basePrice) {
    const priceModifier = parseInt(localStorage.getItem('priceModifier') || '0');
    const modifiedPrice = basePrice + priceModifier;
    const text = `$${modifiedPrice} for ${product}`;
    copyToClipboard(text);
}

function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 500);
    }, 3000);
}

function showSection(sectionId, button) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });

    const buttons = document.querySelectorAll('.section-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function savePriceModifier() {
    const priceModifier = document.getElementById('priceModifier').value;
    localStorage.setItem('priceModifier', priceModifier);
    updatePrices();
}

function loadPriceModifier() {
    const priceModifier = localStorage.getItem('priceModifier') || '0';
    document.getElementById('priceModifier').value = priceModifier;
}

function updatePrices() {
    const priceModifier = parseInt(localStorage.getItem('priceModifier') || '0');
    const basePrices = [
        {id: 'price1-1', basePrice: 110},
        {id: 'price1-2', basePrice: 140},
        {id: 'price1-3', basePrice: 180},
        {id: 'price1-4', basePrice: 270},
        {id: 'price2-1', basePrice: 175},
        {id: 'price2-2', basePrice: 200},
        {id: 'price2-3', basePrice: 240},
        {id: 'price2-4', basePrice: 320},
        {id: 'price3-1', basePrice: 190},
        {id: 'price3-2', basePrice: 240},
        {id: 'price3-3', basePrice: 275},
        {id: 'price3-4', basePrice: 370},
        {id: 'price4-1', basePrice: 310},
        {id: 'price4-2', basePrice: 350},
        {id: 'price4-3', basePrice: 390},
        {id: 'price4-4', basePrice: 530},
        {id: 'price5-1', basePrice: 220},
        {id: 'price5-2', basePrice: 290},
        {id: 'price5-3', basePrice: 350},
        {id: 'price5-4', basePrice: 470},
        {id: 'price6-1', basePrice: 370},
        {id: 'price6-2', basePrice: 410},
        {id: 'price6-3', basePrice: 470},
        {id: 'price6-4', basePrice: 590},
        {id: 'price7-1', basePrice: 195},
        {id: 'price7-2', basePrice: 210},
        {id: 'price7-3', basePrice: 230},
        {id: 'price7-4', basePrice: 320},
        {id: 'price8-1', basePrice: 210},
        {id: 'price8-2', basePrice: 250},
        {id: 'price8-3', basePrice: 280},
        {id: 'price8-4', basePrice: 390},
        {id: 'price9-1', basePrice: 280},
        {id: 'price9-2', basePrice: 340},
        {id: 'price9-3', basePrice: 410},
        {id: 'price9-4', basePrice: 490},
        {id: 'price10-1', basePrice: 270},
        {id: 'price10-2', basePrice: 310},
        {id: 'price10-3', basePrice: 370},
        {id: 'price10-4', basePrice: 20},
        {id: 'price11-1', basePrice: 300},
        {id: 'price11-2', basePrice: 350},
        {id: 'price11-3', basePrice: 420},
        {id: 'price11-4', basePrice: 530},
        {id: 'price12-1', basePrice: 170},
        {id: 'price12-2', basePrice: 20},
        {id: 'price12-3', basePrice: 300},
        {id: 'price12-4', basePrice: 400},
        {id: 'price13-1', basePrice: 220},
        {id: 'price13-2', basePrice: 300},
        {id: 'price13-3', basePrice: 350},
        {id: 'price13-4', basePrice: 420},
        {id: 'price14-1', basePrice: 20},
        {id: 'price14-2', basePrice: 320},
        {id: 'price14-3', basePrice: 400},
        {id: 'price14-4', basePrice: 20},
        {id: 'price15-1', basePrice: 20},
        {id: 'price15-2', basePrice: 20},
        {id: 'price15-3', basePrice: 20},
        {id: 'price15-4', basePrice: 20},
        {id: 'price16-1', basePrice: 20},
        {id: 'price16-2', basePrice: 20},
        {id: 'price16-3', basePrice: 20},
        {id: 'price16-4', basePrice: 20},
        {id: 'price17-1', basePrice: 120},
        {id: 'price17-2', basePrice: 140},
        {id: 'price17-3', basePrice: 155},
        {id: 'price17-4', basePrice: 20},
        {id: 'price18-1', basePrice: 140},
        {id: 'price18-2', basePrice: 190},
        {id: 'price18-3', basePrice: 200},
        {id: 'price18-4', basePrice: 20}
    ];

    basePrices.forEach(price => {
        document.getElementById(price.id).innerText = price.basePrice + priceModifier;
    });
}
