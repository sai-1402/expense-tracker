// filepath: /expense-tracker/expense-tracker/src/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyDr06gBLA2R18Qx8XP1hIjhCT38AzXJwtI",
    authDomain: "expense-tracker-20dd2.firebaseapp.com",
    databaseURL: "https://expense-tracker-20dd2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expense-tracker-20dd2",
    storageBucket: "expense-tracker-20dd2.appspot.com",
    messagingSenderId: "491169353833",
    appId: "1:491169353833:web:295e5236a54c4db56612f8",
    measurementId: "G-FEQN4931HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set persistence for authentication
const initializeAuth = async () => {
    await setPersistence(auth, browserLocalPersistence);
};

// Function to handle user authentication
const authenticateUser = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                resolve(user.uid);
            } else {
                try {
                    const userCredential = await signInAnonymously(auth);
                    resolve(userCredential.user.uid);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
};

// Exporting functions for use in other modules
export { db, auth, initializeAuth, authenticateUser };