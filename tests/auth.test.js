import { describe, test, expect } from 'vitest';

// Функція валідації пароля для EasyDeposit безпеки
function isPasswordSecure(password) {
    if (!password || password.length < 6) return false;
    
    const hasNumbers = /\d/.test(password);
    const hasLetters = /[a-zA-Z]/.test(password);
    
    return hasNumbers && hasLetters;
}

describe('Тестування системи авторизації та безпеки', () => {

    test('Має приймати надійні паролі (мінімум 6 символів, є букви й цифри)', () => {
        expect(isPasswordSecure('securePass123')).toBe(true);
        expect(isPasswordSecure('easyDep2026')).toBe(true);
    });

    test('Має відхиляти занадто короткі паролі', () => {
        expect(isPasswordSecure('12345')).toBe(false);
        expect(isPasswordSecure('qwert')).toBe(false);
    });

    test('Має відхиляти паролі, які містять лише цифри або лише букви', () => {
        expect(isPasswordSecure('1234567890')).toBe(false); // тільки цифри
        expect(isPasswordSecure('onlyletters')).toBe(false); // тільки букви
    });
});
