// Firebase設定やAPIキーなどの定数をまとめる
export const firebaseConfig = {
  apiKey: "AIzaSyDr06gBLA2R18Qx8XP1hIjhCT38AzXJwtI",
  authDomain: "expense-tracker-20dd2.firebaseapp.com",
  databaseURL: "https://expense-tracker-20dd2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-tracker-20dd2",
  storageBucket: "expense-tracker-20dd2.appspot.com",
  messagingSenderId: "491169353833",
  appId: "1:491169353833:web:295e5236a54c4db56612f8",
  measurementId: "G-FEQN4931HH"
};

export const geminiApiKey = "AIzaSyA-OwHzReTw2WDW8rM2Djt57lYJnj3S9kg";

export const appId = 'expense-tracker-pro';

export const CATEGORIES = {
  'Food': { icon: '🍽️', type: 'expense' },
  'Transport': { icon: '🚗', type: 'expense' },
  'Shopping': { icon: '🛍️', type: 'expense' },
  'Health': { icon: '🏥', type: 'expense' },
  'Entertainment': { icon: '🎬', type: 'expense' },
  'Bills': { icon: '🧾', type: 'expense' },
  'Salary': { icon: '💰', type: 'income' },
  'Other': { icon: '❓', type: 'expense' }
};
