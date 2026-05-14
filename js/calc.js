document.addEventListener('DOMContentLoaded', function() {
    // Елементи вводу
    const amountRange = document.getElementById('amount-range');
    const amountInput = document.getElementById('amount-input');
    const termRange = document.getElementById('term-range');
    const termDisplay = document.getElementById('term-display');
    const rateDisplay = document.getElementById('rate-display');

    // Елементи виводу
    const resAmount = document.getElementById('res-amount');
    const resGross = document.getElementById('res-gross');
    const resTax = document.getElementById('res-tax');
    const resNet = document.getElementById('res-net');

    function calculate() {
        const amount = parseFloat(amountRange.value);
        const months = parseInt(termRange.value);
        
        // Логіка зміни ставки від терміну
        let rate = 12.00;
        if (months === 6) rate = 14.50;
        if (months === 9) rate = 15.75;
        if (months === 12) rate = 16.75;

        // Формули розрахунку
        const grossProfit = (amount * rate * (months / 12)) / 100;
        const taxRate = 0.195; // 19.5% податки
        const taxAmount = grossProfit * taxRate;
        const netProfit = grossProfit - taxAmount;

        // 1. Оновлення тексту на екрані
        if(amountInput) amountInput.value = amount;
        if(termDisplay) termDisplay.innerText = `${months} міс`;
        if(rateDisplay) rateDisplay.innerText = `${rate.toFixed(2)}%`;
        
        if(resAmount) resAmount.innerText = amount.toLocaleString() + ' ₴';
        if(resGross) resGross.innerText = '+' + Math.round(grossProfit).toLocaleString() + ' ₴';
        if(resTax) resTax.innerText = '-' + Math.round(taxAmount).toLocaleString() + ' ₴';
        if(resNet) resNet.innerText = Math.round(netProfit).toLocaleString() + ' ₴';

        // 2. ЗБЕРЕЖЕННЯ ДАНИХ (щоб вони з'явилися в профілі потім)
        localStorage.setItem('pendingDeposit', JSON.stringify({
            amount: amount,
            term: months,
            rate: rate
        }));
    }

    // Слухачі подій для повзунків
    if(amountRange) amountRange.addEventListener('input', calculate);
    if(termRange) termRange.addEventListener('input', calculate);
    
    if(amountInput) {
        amountInput.addEventListener('change', function() {
            let val = parseInt(this.value);
            if (val < 10000) val = 10000;
            if (val > 1000000) val = 1000000;
            amountRange.value = val;
            calculate();
        });
    }

    // Перший запуск при завантаженні сторінки
    calculate();
});