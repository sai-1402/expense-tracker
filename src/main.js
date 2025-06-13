import { initializeAuth, getUserId } from "./auth.js";
import { setupInitialBudgets, listenBudgets } from "./budgets.js";
import { listenTransactions } from "./transactions.js";
import { showPage } from "./ui/navigation.js";
import { showModal } from "./ui/modal.js";

window.showPage = showPage;

function renderAllPages() {
  const activePageId = document.querySelector('.page.active')?.id;
  if (activePageId) {
    const pageName = activePageId.replace('-page', '');
    showPage(pageName);
  }
}

function onUserReady(userId) {
  document.getElementById('userIdDisplay').textContent = userId;
  setupInitialBudgets().then(() => {
    listenTransactions(renderAllPages);
    listenBudgets(renderAllPages);
    showPage('home');
  });
}

function initializeApp() {
  initializeAuth(onUserReady);
}

document.addEventListener('DOMContentLoaded', initializeApp);

// トランザクション編集・削除のwindow登録
import { getTransactions } from "./transactions.js";
import { showPage as showPageNav } from "./ui/navigation.js";
window.handleEditTransaction = function(id) {
  const transactions = getTransactions();
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    const prefillData = {
      ...transaction,
      date: transaction.date.toDate().toISOString().split('T')[0]
    };
    showPageNav('add', prefillData);
  }
};
import { deleteTransaction } from "./transactions.js";
window.handleDeleteTransaction = function(id) {
  showModal('Confirm Deletion', `
    <p>Are you sure you want to delete this transaction? This action cannot be undone.</p>
    <div class="flex justify-end gap-4 mt-6">
      <button id="modal-cancel-btn" class="py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300">Cancel</button>
      <button id="modal-confirm-delete-btn" class="py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700">Delete</button>
    </div>
  `, false);
  document.getElementById('modal-cancel-btn').onclick = () => document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal-confirm-delete-btn').onclick = async () => {
    try {
      await deleteTransaction(id);
      document.getElementById('modal').classList.add('hidden');
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      showModal('Error', '<p>Could not delete the transaction. Please try again.</p>');
    }
  };
};
