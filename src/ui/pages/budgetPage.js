import { getBudgets, updateBudget } from "../../budgets.js";
import { getTransactions } from "../../transactions.js";
import { CATEGORIES } from "../../constants.js";
import { showModal } from "../modal.js";

export function renderBudgetPage() {
  const budgets = getBudgets();
  const transactions = getTransactions();
  const spentByCategory = transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const budgetListHTML = Object.values(budgets).map(budget => {
    const spent = spentByCategory[budget.name] || 0;
    const percentage = Math.min(Math.floor((spent / budget.amount) * 100), 100);
    const progressBarColor = percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-amber-500' : 'bg-violet-500';
    return `<div class="bg-white p-5 rounded-xl shadow-sm">
      <div class="flex justify-between items-center mb-2">
        <p class="font-semibold text-lg">${CATEGORIES[budget.name]?.icon || '❓'} ${budget.name}</p>
        <p class="font-bold">${percentage}%</p>
      </div>
      <div class="w-full bg-slate-200 rounded-full h-2.5 mb-2">
        <div class="${progressBarColor} h-2.5 rounded-full" style="width: ${percentage}%"></div>
      </div>
      <div class="flex justify-between items-center text-sm text-slate-500 mb-2">
        <span>Spent: ${spent.toLocaleString()}</span>
        <span>Budget: ${budget.amount.toLocaleString()}</span>
      </div>
      <button class="mt-2 px-3 py-1 bg-violet-100 text-violet-700 rounded hover:bg-violet-200 font-medium" onclick="window.editBudget && window.editBudget('${budget.id}', '${budget.name}', ${budget.amount})">Edit</button>
    </div>`;
  }).join('') || '<p class="text-center text-slate-500 py-8">No budgets set up yet.</p>';
  document.getElementById('budget-page').innerHTML = `<h2 class="text-2xl font-bold mb-6">Your Budgets</h2><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">${budgetListHTML}</div>`;
}

window.editBudget = function(budgetId, name, currentAmount) {
  showModal('Edit Budget', `
    <form id="edit-budget-form" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Category</label>
        <input type="text" class="w-full p-2 border rounded bg-slate-100" value="${name}" disabled>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Max Budget</label>
        <input type="number" id="edit-budget-amount" class="w-full p-2 border rounded" value="${currentAmount}" min="0" required>
      </div>
      <button type="submit" class="w-full bg-violet-600 text-white font-bold py-2 rounded hover:bg-violet-700">Save</button>
    </form>
  `);
  document.getElementById('edit-budget-form').onsubmit = async function(e) {
    e.preventDefault();
    const newAmount = parseFloat(document.getElementById('edit-budget-amount').value);
    if (isNaN(newAmount) || newAmount < 0) {
      showModal('Error', '<p>Please enter a valid amount.</p>');
      return;
    }
    try {
      await updateBudget(budgetId, newAmount);
      document.getElementById('modal').classList.add('hidden');
    } catch (error) {
      console.error('Error updating budget:', error);
      showModal('Error', '<p>Could not update the budget. Please try again.</p>');
    }
  };
};
