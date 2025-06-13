import { collection, addDoc, getDocs, onSnapshot, query, writeBatch, Timestamp, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getFirestoreDb } from "./firebase.js";
import { appId } from "./constants.js";
import { getUserId } from "./auth.js";

let transactions = [];

export function getTransactions() {
  return transactions;
}

export function listenTransactions(onUpdate) {
  const db = getFirestoreDb();
  const userId = getUserId();
  const transactionsPath = `/artifacts/${appId}/users/${userId}/transactions`;
  const qTransactions = query(collection(db, transactionsPath));
  return onSnapshot(qTransactions, (snapshot) => {
    transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    transactions.sort((a, b) => b.date.toMillis() - a.date.toMillis());
    onUpdate(transactions);
  });
}

export async function addTransaction(data) {
  const db = getFirestoreDb();
  const userId = getUserId();
  const transactionsPath = `/artifacts/${appId}/users/${userId}/transactions`;
  return addDoc(collection(db, transactionsPath), data);
}

export async function updateTransaction(id, data) {
  const db = getFirestoreDb();
  const userId = getUserId();
  const transactionsPath = `/artifacts/${appId}/users/${userId}/transactions`;
  return updateDoc(doc(db, transactionsPath, id), data);
}

export async function deleteTransaction(id) {
  const db = getFirestoreDb();
  const userId = getUserId();
  const transactionsPath = `/artifacts/${appId}/users/${userId}/transactions`;
  return deleteDoc(doc(db, transactionsPath, id));
}
