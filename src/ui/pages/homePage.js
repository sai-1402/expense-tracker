import { getTransactions, listenTransactions, addTransaction, updateTransaction, deleteTransaction } from "../../transactions.js";
import { CATEGORIES } from "../../constants.js";
import { showModal } from "../modal.js";

export function renderHomePage() {
  const transactions = getTransactions();
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  const transactionListHTML = transactions.length > 0 ? transactions.map(t => `
    <div class="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl">${CATEGORIES[t.category]?.icon || '❓'}</div>
      <div class="flex-1">
        <p class="font-semibold">${t.description}</p>
        <p class="text-sm text-slate-500">${t.category} &middot; ${t.date.toDate().toLocaleDateString()}</p>
      </div>
      <p class="font-bold text-lg ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}">
        ${t.type === 'income' ? '+' : '-'}￥${t.amount.toLocaleString()}
      </p>
      <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onclick="window.handleEditTransaction && window.handleEditTransaction('${t.id}')" class="p-2 rounded-md bg-slate-100 hover:bg-blue-100 text-blue-600" title="Edit">
          <span class="material-symbols-outlined text-base">edit</span>
        </button>
        <button onclick="window.handleDeleteTransaction && window.handleDeleteTransaction('${t.id}')" class="p-2 rounded-md bg-slate-100 hover:bg-red-100 text-red-600" title="Delete">
          <span class="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
    </div>
  `).join('') : '<p class="text-center text-slate-500 py-8">No transactions yet. Add one to get started!</p>';

  document.getElementById('home-page').innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-violet-200 p-6 rounded-xl shadow-sm"><h3 class="text-slate-500 font-medium">Total Income</h3><p class="text-3xl font-bold text-green-600 mt-2">+￥${income.toLocaleString()}</p></div>
      <div class="bg-violet-200 p-6 rounded-xl shadow-sm"><h3 class="text-slate-500 font-medium">Total Expenses</h3><p class="text-3xl font-bold text-red-600 mt-2">-￥${expenses.toLocaleString()}</p></div>
      <div class="bg-violet-200 p-6 rounded-xl shadow-sm-50 p-6 rounded-xl shadow-sm"><h3 class="text-slate-500 font-medium">Net Balance</h3><p class="text-3xl font-bold text-slate-800 mt-2">￥${balance.toLocaleString()}</p></div>
    </div>
    <h2 class="text-2xl font-bold mb-4">Recent Transactions</h2>
    <div class="space-y-4">${transactionListHTML}</div>
  `;
}
