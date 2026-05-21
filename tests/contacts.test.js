import { describe, test, expect } from 'vitest';

// --- Функції валідації (вбудовані прямо в тест, щоб не шукати файли) ---
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function createFeedbackMessage(name, email, message) {
    if (!name || name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters long');
    }
    
    if (!validateEmail(email)) {
        throw new Error('Invalid email address');
    }

    if (!message || message.trim().length < 10) {
        throw new Error('Message must be at least 10 characters long');
    }

    return {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        message: message.trim(),
        date: new Date().toLocaleDateString()
    };
}

// --- Самі тести ---
describe('Тестування форми контактів та валідації', () => {

    describe('Валідація Email', () => {
        test('Має повертати true для коректних адрес', () => {
            expect(validateEmail('user@example.com')).toBe(true);
            expect(validateEmail('admin.easy@deposit.com.ua')).toBe(true);
        });

        test('Має повертати false для некоректних адрес', () => {
            expect(validateEmail('plain-text')).toBe(false);
            expect(validateEmail('@missing-username.com')).toBe(false);
            expect(validateEmail('user@missing-tld.')).toBe(false);
        });
    });

    describe('Створення об\'єкта фідбеку', () => {
        test('Успішно створює об\'єкт, якщо всі дані правильні', () => {
            const result = createFeedbackMessage('Vitalii', 'test@mail.com', 'I want to open an Ultra Deposit plan.');

            expect(result).toHaveProperty('name', 'Vitalii');
            expect(result).toHaveProperty('email', 'test@mail.com');
            expect(result.message).toBe('I want to open an Ultra Deposit plan.');
            expect(result.date).toBe(new Date().toLocaleDateString());
        });

        test('Видає помилку, якщо ім\'я занадто коротке', () => {
            expect(() => {
                createFeedbackMessage('A', 'test@mail.com', 'Valid message content here');
            }).toThrow('Name must be at least 2 characters long');
        });

        test('Видає помилку, якщо текст повідомлення менший за 10 символів', () => {
            expect(() => {
                createFeedbackMessage('John Doe', 'test@mail.com', 'Short');
            }).toThrow('Message must be at least 10 characters long');
        });
    });
});