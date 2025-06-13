// File: /expense-tracker/expense-tracker/src/auth.js

import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { showModal } from './ui/modal.js';

let auth, userId;

export async function initializeAuth() {
    auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            userId = user.uid;
            document.getElementById('userIdDisplay').textContent = userId;
            // Additional setup can be called here
        } else {
            await signInAnonymously(auth);
        }
    });
}

export function getUserId() {
    return userId;
}