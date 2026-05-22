const URL_STR = 'https://mhcojnzhauelvnvnjelv.supabase.co';
const KEY_STR = 'sb_publishable_B3iTB_azJexCuA-mw4O5dA_jD7wPZRN';

if (!window.supabaseClient) {
    window.supabaseClient = supabase.createClient(URL_STR, KEY_STR);
}

async function updateUI() {
    const group = document.getElementById('auth-group');
    if (!group) return;

    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        const isSubPage = window.location.pathname.includes('/pages/');
        const pathPrefix = isSubPage ? '' : 'pages/';

        if (session && session.user) {
            const name = session.user.user_metadata?.full_name || 'User';
            group.innerHTML = `
                <div class="flex items-center gap-4">
                    <a href="${pathPrefix}profile.html" class="flex items-center gap-2 group no-underline">
                        <div class="text-right hidden sm:block leading-none">
                            <p class="text-[10px] text-slate-400 font-bold uppercase mb-1">Account</p>
                            <p class="text-sm font-bold text-[#1a2b4b] group-hover:text-blue-600 transition">Hi, ${name}</p>
                        </div>
                        <div class="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                            ${name[0].toUpperCase()}
                        </div>
                    </a>
                    <button onclick="logout()" class="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition text-[10px] font-black uppercase">
                        Exit
                    </button>
                </div>
            `;
        } else {
            group.innerHTML = `
                <div class="flex items-center gap-3">
                    <a href="${pathPrefix}login.html" class="px-4 py-2 text-slate-600 font-bold hover:text-blue-600 transition text-sm no-underline">Sign In</a>
                    <a href="${pathPrefix}register.html" class="px-6 py-2 bg-[#1a2b4b] text-white rounded-xl font-bold shadow-md hover:bg-blue-800 transition text-sm no-underline">Join</a>
                </div>
            `;
        }
    } catch (err) {
        console.error("Auth error:", err);
    }
}

async function logout() {
    await supabaseClient.auth.signOut();
    const isSubPage = window.location.pathname.includes('/pages/');
    window.location.href = isSubPage ? '../index.html' : 'index.html';
}

window.sendRequest = async function(planName, planRate) {
    if (!window.supabaseClient) return alert("Клієнт бази даних не ініціалізований!");

    const { data: { session } } = await window.supabaseClient.auth.getSession();

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

    const { error } = await window.supabaseClient
        .from('contact_requests')
        .insert([
            { 
                user_email: user.email, 
                plan_name: planName 
            }
        ]);

    if (error) {
        alert("Помилка відправки в Supabase: " + error.message);
        return;
    }

    const userStorageKey = `my_deposits_${user.id}`;
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

    alert(`Вітаємо! План "${planName}" активовано. Депозит на суму ${parseFloat(amount).toLocaleString()} ₴ додано до вашого профілю.`);
};

document.addEventListener('DOMContentLoaded', updateUI);