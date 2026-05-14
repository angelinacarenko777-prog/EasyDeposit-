// 1. Конфігурація Supabase
const SUPABASE_URL = 'https://mhcojnzhauelvnvnjelv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_B3iTB_azJexCuA-mw4O5dA_jD7wPZRN';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. Функція оновлення інтерфейсу
async function updateUI() {
    const group = document.getElementById('auth-group');
    if (!group) return;

    try {
        // Отримуємо сесію (getSession працює швидше для відображення кнопок)
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        // Визначаємо шлях до сторінок залежно від того, де ми знаходимось
        const isSubPage = window.location.pathname.includes('/pages/');
        const pathPrefix = isSubPage ? '' : 'pages/';

        if (session && session.user) {
            // КОРИСТУВАЧ УВІЙШОВ (ПОШТА ПІДТВЕРДЖЕНА)
            const name = session.user.user_metadata?.full_name || 'User';
            group.innerHTML = `
                <div class="flex items-center gap-4 animate-in fade-in duration-300">
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
            // КОРИСТУВАЧ НЕ УВІЙШОВ АБО ЩЕ НЕ ПІДТВЕРДИВ ПОШТУ
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

// 3. Функція виходу
async function logout() {
    await supabaseClient.auth.signOut();
    // Повертаємо на головну сторінку після виходу
    const isSubPage = window.location.pathname.includes('/pages/');
    window.location.href = isSubPage ? '../index.html' : 'index.html';
}

// Запуск при завантаженні кожного файлу, де підключено цей скрипт
document.addEventListener('DOMContentLoaded', updateUI);