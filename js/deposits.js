// 1. Твій масив (залишаємо як ти хотіла)
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

// 2. Налаштування Supabase для відправки заявок
const SUPABASE_URL = 'https://mhcojnzhauelvnvnjelv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B3iTB_azJexCuA-mw4O5dA_jD7wPZRN';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 3. Функція виводу карток з масиву
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

            <button onclick="sendRequest('${plan.name}')" 
                class="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg">
                Choose Plan
            </button>
        </div>
    `).join('');
}

// 4. Функція відправки в Supabase (виконуємо вимогу завдання)
async function sendRequest(planName) {
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (!user) {
        alert("Будь ласка, спочатку зареєструйтесь або увійдіть!");
        window.location.href = 'register.html';
        return;
    }

    // Відправляємо дані в таблицю contact_requests
    const { error } = await supabaseClient
        .from('contact_requests')
        .insert([
            { 
                user_email: user.email, 
                plan_name: planName 
            }
        ]);

    if (error) {
        alert("Помилка: " + error.message);
    } else {
        alert(`Вітаємо! Заявка на план "${planName}" відправлена. Ми зв'яжемося з вами за адресою ${user.email}`);
    }
}

document.addEventListener('DOMContentLoaded', renderDeposits);