// This file manages transaction-related operations, including adding, updating, and deleting transactions.
// It exports functions to interact with the transactions collection in Firestore.

import { db } from './firebase.js';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const transactionsPath = `/artifacts/expense-tracker-pro/users/USER_ID/transactions`; // Replace USER_ID with the actual user ID dynamically

export async function addTransaction(transactionData) {
    try {
        const docRef = await addDoc(collection(db, transactionsPath), transactionData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding transaction: ", error);
        throw error;
    }
}

export async function updateTransaction(transactionId, transactionData) {
    try {
        const transactionRef = doc(db, transactionsPath, transactionId);
        await updateDoc(transactionRef, transactionData);
    } catch (error) {
        console.error("Error updating transaction: ", error);
        throw error;
    }
}

export async function deleteTransaction(transactionId) {
    try {
        const transactionRef = doc(db, transactionsPath, transactionId);
        await deleteDoc(transactionRef);
    } catch (error) {
        console.error("Error deleting transaction: ", error);
        throw error;
    }
}