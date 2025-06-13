// src/main.js

import { initializeFirebase } from './firebase.js';
import { setupAuth } from './auth.js';
import { renderHomePage } from './ui/pages/homePage.js';
import { renderAddPage } from './ui/pages/addPage.js';
import { renderScanPage } from './ui/pages/scanPage.js';
import { renderBudgetPage } from './ui/pages/budgetPage.js';
import { showPage } from './ui/navigation.js';
import { setupModal } from './ui/modal.js';

document.addEventListener('DOMContentLoaded', async () => {
    await initializeFirebase();
    setupAuth();
    setupModal();
    showPage('home'); // Default to home page
});

// Event listeners for navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (event) => {
        const pageName = event.currentTarget.getAttribute('onclick').match(/'([^']+)'/)[1];
        showPage(pageName);
    });
});