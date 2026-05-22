import { describe, test, expect } from 'vitest';

function updateDepositStatus(deposits, depositId, newStatus) {
    return deposits.map(dep => 
        dep.id === depositId ? { ...dep, status: newStatus } : dep
    );
}

function filterMessagesByEmail(messages, emailKey) {
    if (!emailKey) return messages;
    return messages.filter(msg => msg.email.includes(emailKey.toLowerCase()));
}

describe('Тестування логіки Адмін-панелі', () => {

    test('Має успішно змінювати статус депозиту на Approved', () => {
        const mockDeposits = [
            { id: 1, user: 'John', amount: 50000, status: 'Pending' },
            { id: 2, user: 'Anna', amount: 120000, status: 'Pending' }
        ];

        const updated = updateDepositStatus(mockDeposits, 1, 'Approved');

        expect(updated[0].status).toBe('Approved');
        expect(updated[1].status).toBe('Pending'); 
    });

    test('Має фільтрувати повідомлення користувачів за ключовим словом в email', () => {
        const mockMessages = [
            { name: 'Ivan', email: 'ivan@gmail.com', text: 'Hello' },
            { name: 'Mary', email: 'mary@outlook.com', text: 'Question' },
            { name: 'Alex', email: 'alex.manager@gmail.com', text: 'Support' }
        ];

        const gmailOnly = filterMessagesByEmail(mockMessages, 'gmail.com');

        expect(gmailOnly.length).toBe(2);
        expect(gmailOnly[0].name).toBe('Ivan');
        expect(gmailOnly[1].name).toBe('Alex');
    });
});