import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const form = document.querySelector("#form");
const fullname = document.querySelector("#fullname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const error = document.querySelector("#error");

let userProfilePicURL = "";

let myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dsgrazgwe",
    uploadPreset: "saylani-batch-12",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      userProfilePicURL = result.info.secure_url;
    }
  }
);

document.getElementById("upload_widget").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    myWidget.open();
  },
  false
);

form.addEventListener("submit", (evernt) => {
  evernt.preventDefault();
  error.innerHTML = "";
  console.log(email.value, password.value);

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);

      try {
        const docRef = await addDoc(collection(db, "users"), {
          fullname: fullname.value,
          email: email.value,
          profilePic: userProfilePicURL,
          uid: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        fullname.value = ""
        email.value = ""
        userProfilePicURL = ""
        window.location = "login.html"
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      error.innerHTML = errorMessage;
    });
});
