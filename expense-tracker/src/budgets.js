// This file handles budget-related operations, including creating, updating, and retrieving budgets. 
// It exports functions to interact with the budgets collection in Firestore.

import { getFirestore, doc, collection, addDoc, updateDoc, getDocs, query, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { firebaseConfig } from './firebase.js';

const db = getFirestore(firebaseConfig);

export async function createBudget(userId, budgetData) {
    const budgetsPath = `/artifacts/expense-tracker-pro/users/${userId}/budgets`;
    try {
        const docRef = await addDoc(collection(db, budgetsPath), budgetData);
        return docRef.id;
    } catch (error) {
        console.error("Error creating budget:", error);
        throw error;
    }
}

export async function updateBudget(userId, budgetId, budgetData) {
    const budgetsPath = `/artifacts/expense-tracker-pro/users/${userId}/budgets`;
    try {
        await updateDoc(doc(db, budgetsPath, budgetId), budgetData);
    } catch (error) {
        console.error("Error updating budget:", error);
        throw error;
    }
}

export async function getBudgets(userId) {
    const budgetsPath = `/artifacts/expense-tracker-pro/users/${userId}/budgets`;
    const budgetsQuery = query(collection(db, budgetsPath));
    const budgetSnapshot = await getDocs(budgetsQuery);
    return budgetSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export function listenToBudgets(userId, callback) {
    const budgetsPath = `/artifacts/expense-tracker-pro/users/${userId}/budgets`;
    const budgetsQuery = query(collection(db, budgetsPath));
    return onSnapshot(budgetsQuery, (snapshot) => {
        const budgets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(budgets);
    });
}