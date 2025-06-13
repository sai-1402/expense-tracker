import { collection, getDocs, onSnapshot, query, writeBatch, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getFirestoreDb } from "./firebase.js";
import { appId, CATEGORIES } from "./constants.js";
import { getUserId } from "./auth.js";

let budgets = {};

export function getBudgets() {
  return budgets;
}

export function listenBudgets(onUpdate) {
  const db = getFirestoreDb();
  const userId = getUserId();
  const budgetsPath = `/artifacts/${appId}/users/${userId}/budgets`;
  const qBudgets = query(collection(db, budgetsPath));
  return onSnapshot(qBudgets, (snapshot) => {
    budgets = {};
    snapshot.docs.forEach(doc => {
      budgets[doc.data().name] = { id: doc.id, ...doc.data() };
    });
    onUpdate(budgets);
  });
}

export async function setupInitialBudgets() {
  const db = getFirestoreDb();
  const userId = getUserId();
  const budgetsPath = `/artifacts/${appId}/users/${userId}/budgets`;
  const budgetsQuery = query(collection(db, budgetsPath));
  const budgetSnapshot = await getDocs(budgetsQuery);
  if (budgetSnapshot.empty) {
    const batch = writeBatch(db);
    const defaultBudgets = { 'Food': 500, 'Transport': 200, 'Shopping': 300, 'Entertainment': 150, 'Bills': 400 };
    Object.entries(defaultBudgets).forEach(([name, amount]) => {
      const budgetRef = doc(collection(db, budgetsPath));
      batch.set(budgetRef, { name, amount });
    });
    await batch.commit();
  }
}

export async function updateBudget(budgetId, newAmount) {
  const db = getFirestoreDb();
  const userId = getUserId();
  const budgetsPath = `/artifacts/${appId}/users/${userId}/budgets`;
  return updateDoc(doc(db, budgetsPath, budgetId), { amount: newAmount });
}
