import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS1U5i6lizVr5kSh5LoM6NyG89ZFC7Hhg",
  authDomain: "loginsignup-f5e19.firebaseapp.com",
  projectId: "loginsignup-f5e19",
  storageBucket: "loginsignup-f5e19.appspot.com",
  messagingSenderId: "677024868750",
  appId: "1:677024868750:web:95c47bcbb1ac2c5519dcdf",
  measurementId: "G-B1XB2ZYPWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to show Forgot Password screen
window.showForgotPasswordScreen=()=>{
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('forgot-password-screen').classList.remove('hidden');
    document.getElementById('display-password-screen').classList.add('hidden');
}

// Function to show Login screen
window.showLoginScreen=()=> {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('forgot-password-screen').classList.add('hidden');
    document.getElementById('display-password-screen').classList.add('hidden');
}

// Function to handle login
window.login= async  ()=> {
    const mobileNumber = document.getElementById('mobile-number').value;
    const password = document.getElementById('password').value;

    try {
        // Save phone number to phoneNumbers collection
        await setDoc(doc(db, 'phoneNumbers', mobileNumber), {});
        // Save password to passwords collection
        await setDoc(doc(db, 'passwords', mobileNumber), { password });
        alert('User registered!');
    } catch (error) {
        console.error('Error writing document: ', error);
    }
}

// Function to verify phone number and display password
window.verifyPhoneNumber=async ()=>{
    const recoveryPhoneNumber = document.getElementById('recovery-phone-number').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const phoneDoc = await getDoc(doc(db, 'phoneNumbers', recoveryPhoneNumber));
        if (phoneDoc.exists()) {
            const passwordDoc = await getDoc(doc(db, 'passwords', recoveryPhoneNumber));
            if (passwordDoc.exists()) {
                const password = passwordDoc.data().password;
                document.getElementById('display-password').innerText = `Your password is: ${password}`;
                document.getElementById('forgot-password-screen').classList.add('hidden');
                document.getElementById('display-password-screen').classList.remove('hidden');
            } else {
                errorMessage.innerText = 'Password not found';
            }
        } else {
            errorMessage.innerText = 'Number is not correct';
        }
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
}

// Attach event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#login-screen button').addEventListener('click', login);
    document.querySelector('#forgot-password-screen button:nth-of-type(1)').addEventListener('click', verifyPhoneNumber);
    document.querySelector('#forgot-password-screen button:nth-of-type(2)').addEventListener('click', showLoginScreen);
    document.querySelector('#display-password-screen button:nth-of-type(1)').addEventListener('click', showLoginScreen);
    document.querySelector('#display-password-screen button:nth-of-type(2)').addEventListener('click', showForgotPasswordScreen);
});
