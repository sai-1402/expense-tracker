import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirebaseApp } from "./firebase.js";

let auth, userId;

export function getAuthInstance() {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getUserId() {
  return userId;
}

export async function initializeAuth(onUserReady) {
  auth = getAuthInstance();
  await setPersistence(auth, browserLocalPersistence);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userId = user.uid;
      onUserReady(userId);
    } else {
      await signInAnonymously(auth);
    }
  });
}
