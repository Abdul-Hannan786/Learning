import { auth } from "./firebaseconfig.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const googleBtn = document.querySelector("#googlebtn");

const provider = new GoogleAuthProvider();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(email.value);
  console.log(password.value);

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location = "index.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

googleBtn.addEventListener("click", () => {
  console.log("Google Called");

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      window.location = "index.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});
