// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBskmQv1u4tQ4TtTqpjatq6DaiRSNloj50",
  authDomain: "fir-25d8d.firebaseapp.com",
  projectId: "fir-25d8d",
  storageBucket: "fir-25d8d.appspot.com",
  messagingSenderId: "868645888317",
  appId: "1:868645888317:web:50153dcc0bd068f1e46554",
  measurementId: "G-VV7VNB0C08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
