const DEPOSIT_PLANS = [
    { 
        id: 1, 
        name: "Standard", 
        rate: 10, 
        termMonths: 12, 
        description: "Базовий план для початківців" 
    },
    { 
        id: 2, 
        name: "Premium", 
        rate: 15, 
        termMonths: 24, 
        description: "Оптимальний вибір для заощаджень" 
    },
    { 
        id: 3, 
        name: "VIP", 
        rate: 20, 
        termMonths: 36, 
        description: "Максимальний дохід для великих депозитів" 
    },
    { 
        id: 4, 
        name: "Ultra Stealth", 
        rate: 25, 
        termMonths: 48, 
        description: "Ексклюзивні умови для партнерів" 
    }
];

function renderDeposits() {
    const grid = document.getElementById('deposits-grid');
    if (!grid) return;

    grid.innerHTML = DEPOSIT_PLANS.map(plan => `
        <div class="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 text-center border border-slate-100 flex flex-col items-center transition transform hover:-translate-y-2">
            <div class="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase">
                ${plan.name}
            </div>
            <div class="text-5xl font-extrabold text-[#1a2b4b] mb-2">${plan.rate}%</div>
            <p class="text-slate-400 text-sm mb-6">Annual Rate</p>
            
            <div class="w-full border-t border-slate-50 pt-6 mb-6">
                <p class="text-slate-600 text-sm mb-4 leading-relaxed">${plan.description}</p>
                <p class="font-bold text-slate-800">Term: ${plan.termMonths} Months</p>
            </div>

            <button onclick="sendRequest('${plan.name}', ${plan.rate})" 
                class="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg">
                Choose Plan
            </button>
        </div>
    `).join('');
}

async function sendRequest(planName, planRate) {
    const client = window.supabaseClient;
    if (!client) {
        alert("Помилка системи. Перезавантажте сторінку.");
        return;
    }

    const { data: { session } } = await client.auth.getSession();

    if (!session || !session.user) {
        alert("Будь ласка, спочатку зареєструйтесь або увійдіть!");
        window.location.href = 'login.html';
        return;
    }

    const user = session.user;

    const amount = prompt(`Введіть суму для відкриття плану "${planName}" (грн):`, "10000");
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        alert("Некоректна сума депозиту!");
        return;
    }

    const { error } = await client
        .from('contact_requests')
        .insert([{ user_email: user.email, plan_name: planName }]);

    if (error) {
        alert("Помилка Supabase: " + error.message);
        return;
    }

    const userStorageKey = `my_deposits_${user.email}`;
    let savedDeposits = JSON.parse(localStorage.getItem(userStorageKey)) || [];
    
    const today = new Date();
    const formattedDate = today.toLocaleDateString('uk-UA');

    const newDeposit = {
        plan: planName + " Plan",
        rate: planRate,
        date: formattedDate,
        amount: parseFloat(amount),
        status: "Active"
    };

    savedDeposits.push(newDeposit);
    localStorage.setItem(userStorageKey, JSON.stringify(savedDeposits));

    alert(`Вітаємо! План "${planName}" активовано. Депозит додано до вашого профілю.`);
}

document.addEventListener('DOMContentLoaded', renderDeposits);