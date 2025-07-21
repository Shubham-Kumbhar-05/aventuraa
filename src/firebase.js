// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwJ28wUDbN_vEz5fMLd8Hc-LFIzxCETU4",
  authDomain: "aventuraa-41ebc.firebaseapp.com",
  projectId: "aventuraa-41ebc",
  storageBucket: "aventuraa-41ebc.firebasestorage.app",
  messagingSenderId: "883241494273",
  appId: "1:883241494273:web:5174ddb54463d47ceb9d00"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
