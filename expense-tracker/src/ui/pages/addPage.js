// This file handles the rendering of the add transaction page, including the form for adding new transactions. 
// It exports a function to render the add page.

import { CATEGORIES } from '../../constants.js';
import { showModal } from '../modal.js';

export function renderAddPage(prefill = {}) {
    const categoryOptionsHTML = Object.entries(CATEGORIES).map(([name, data]) => `
        <label class="category-item flex flex-col items-center justify-center gap-2 p-3 border-2 border-slate-200 rounded-lg cursor-pointer transition-colors has-[:checked]:bg-violet-50 has-[:checked]:border-violet-400">
            <input type="radio" name="category" value="${name}" class="sr-only" ${prefill.category === name ? 'checked' : ''}>
            <span class="text-3xl">${data.icon}</span>
            <span class="text-sm font-medium">${name}</span>
        </label>
    `).join('');
    
    document.getElementById('add-page').innerHTML = `
        <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
            <form id="transaction-form" data-id="${prefill.id || ''}">
                <div class="mb-6">
                    <label for="amount" class="block text-sm font-medium text-slate-700 mb-2">Amount</label>
                    <input type="number" id="amount" name="amount" step="0.01" class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition" placeholder="0.00" value="${prefill.amount || ''}" required>
                </div>
                <div class="mb-6">
                    <label for="description" class="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <input type="text" id="description" name="description" class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition" placeholder="e.g., Lunch with team" value="${prefill.description || ''}" required>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">${categoryOptionsHTML}</div>
                </div>
                <div class="mb-8">
                    <label for="date" class="block text-sm font-medium text-slate-700 mb-2">Date</label>
                    <input type="date" id="date" name="date" class="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition" value="${prefill.date || new Date().toISOString().split('T')[0]}" required>
                </div>
                <button type="submit" class="w-full bg-violet-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-violet-700 transition-transform duration-200 transform hover:-translate-y-1 shadow-md">${prefill.id ? 'Update' : 'Add'} Transaction</button>
            </form>
        </div>
    `;
    document.getElementById('transaction-form').addEventListener('submit', handleSaveTransaction);
}

async function handleSaveTransaction(event) {
    event.preventDefault();
    const form = event.target;
    const transactionId = form.dataset.id;
    const formData = new FormData(form);
    const category = formData.get('category');
    
    if (!category) {
        showModal('Error', '<p>Please select a category.</p>');
        return;
    }

    const transactionData = {
        amount: parseFloat(formData.get('amount')),
        description: formData.get('description'),
        category: category,
        date: new Date(formData.get('date')).toISOString(),
        type: CATEGORIES[category]?.type || 'expense'
    };
    
    // Logic to save transaction data goes here
}