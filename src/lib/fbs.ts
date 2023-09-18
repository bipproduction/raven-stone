import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCWkJC8mvRhC_7IrpF2fPchJGDDwbQo6bM",
    authDomain: "eagle-eye-c93d5.firebaseapp.com",
    projectId: "eagle-eye-c93d5",
    storageBucket: "eagle-eye-c93d5.appspot.com",
    messagingSenderId: "749541703916",
    appId: "1:749541703916:web:d28dced177f12908cfa5c9",
    measurementId: "G-RE68BM42LG",
    databaseURL: "https://eagle-eye-c93d5-default-rtdb.asia-southeast1.firebasedatabase.app",
};

var app;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp()
}

export const fAuth = getAuth(app)
export const fDb = getDatabase(app)
export const fApp = app