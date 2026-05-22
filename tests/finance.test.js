import { describe, test, expect } from 'vitest';
import { calculateDeposit, validateEmail, createFeedbackMessage } from '../js/finance.js';

describe('Тестування фінансового калькулятора EasyDeposit', () => {

    test('Розрахунок для 100,000 ₴ на 12 місяців (ставка 16.75%)', () => {
        const result = calculateDeposit(100000, 12);

        expect(result.rate).toBe(16.75);
        expect(result.principal).toBe(100000);
        expect(result.earned).toBe(16750); 
        expect(result.taxes).toBe(3266);   
        expect(result.net).toBe(13484);    
    });

    test('Розрахунок для 50,000 ₴ на 6 місяців (ставка 14.00%)', () => {
        const result = calculateDeposit(50000, 6);

        expect(result.rate).toBe(14.00);
        expect(result.net).toBe(2818); 
    });

    test('Захист від занадто малої суми (мінімум 10,000 ₴)', () => {
        const result = calculateDeposit(5000, 12);
        expect(result.principal).toBe(10000);
    });

    test('Захист від занадто великої суми (максимум 1,000,000 ₴)', () => {
        const result = calculateDeposit(2000000, 12);
        expect(result.principal).toBe(1000000);
    });
});

describe('Тестування форми контактів та валідації', () => {

    describe('Валідація Email', () => {
        test('Має повертати true для коректних адрес', () => {
            expect(validateEmail('user@example.com')).toBe(true);
            expect(validateEmail('admin@easydeposit.com')).toBe(true);
        });

        test('Має повертати false для некоректних адрес', () => {
            expect(validateEmail('plain-text')).toBe(false);
            expect(validateEmail('@missing-username.com')).toBe(false);
        });
    });

    describe('Створення об\'єкта фідбеку', () => {
        test('Успішно створює об\'єкт фідбеку, якщо дані валідні', () => {
            const result = createFeedbackMessage('Angelina', 'test@mail.com', 'I want to open a deposit plan.');

            expect(result).toHaveProperty('name', 'Angelina');
            expect(result).toHaveProperty('email', 'test@mail.com');
            expect(result.message).toBe('I want to open a deposit plan.');
            expect(result).toHaveProperty('date');
        });

        test('Видає помилку, якщо ім\'я користувача занадто коротке', () => {
            expect(() => {
                createFeedbackMessage('A', 'test@mail.com', 'Valid message content');
            }).toThrow('Name must be at least 2 characters long');
        });

        test('Видає помилку, якщо повідомлення менше 10 символів', () => {
            expect(() => {
                createFeedbackMessage('Angelina', 'test@mail.com', 'Short');
            }).toThrow('Message must be at least 10 characters long');
        });
    });
});