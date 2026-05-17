import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        analytics: resolve(__dirname, 'pages/analytics.html'),
        calculator: resolve(__dirname, 'pages/calculator.html'),
        deposit: resolve(__dirname, 'pages/deposit.html'),
        deposits: resolve(__dirname, 'pages/deposits.html'),
        login: resolve(__dirname, 'pages/login.html'),
        profile: resolve(__dirname, 'pages/profile.html'),
        register: resolve(__dirname, 'pages/register.html'),
        settings: resolve(__dirname, 'pages/settings.html'),
        transactions: resolve(__dirname, 'pages/transactions.html'),
        contacts: resolve(__dirname, 'pages/contacts.html'),
        admin: resolve(__dirname, 'pages/admin.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});