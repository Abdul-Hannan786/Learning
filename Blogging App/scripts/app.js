import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { auth, db } from "./firebaseconfig.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

const userProfilePic = document.querySelector("#profilePic")
const logoutBtn = document.querySelector("#logoutBtn")
const loginBtn = document.querySelector("#loginBtn")
const logoutBtn_2 = document.querySelector("#logoutBtn-2")


onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    const users = await getDataFromFirestore();
    console.log(users);
    
    userProfilePic.src = users.profilePic;
    userProfilePic.classList.remove("hidden");
    
    logoutBtn.classList.remove("hidden");
    logoutBtn_2.classList.remove("hidden"); // Show logout button in mobile menu
    
    loginBtn.classList.add("hidden");
  } else {
    logoutBtn.classList.add("hidden");
    logoutBtn_2.classList.add("hidden"); // Hide logout button in mobile menu
    loginBtn.classList.remove("hidden");
  }
});


async function getDataFromFirestore(){
  let user = null
  const q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
  const querySnapShot = await getDocs(q)
  querySnapShot.forEach((doc) => {
    user = doc.data()
  })

  return user
}

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error);
    });
});

logoutBtn_2.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error);
    });
});