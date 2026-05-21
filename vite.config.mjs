import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Список усіх твоїх HTML-файлів
const htmlPages = [
  'index.html',
  'admin.html',
  'analytics.html',
  'calculator.html',
  'contacts.html',
  'deposit.html',
  'deposits.html',
  'login.html',
  'open-deposit.html',
  'profile.html',
  'register.html',
  'settings.html',
  'transactions.html'
];

// Автоматична генерація шляхів за прикладом викладача, з урахуванням папки pages
const rollupInput = Object.fromEntries(
  htmlPages.map((file) => {
    // Якщо це index.html — він лежить у корені, інакше — у папці pages/
    const filePath = file === 'index.html' ? file : `pages/${file}`;
    return [
      file.replace(/\.html$/, ''), 
      resolve(__dirname, filePath)
    ];
  })
);

export default defineConfig({
  root: __dirname,
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: rollupInput
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js']
  }
});