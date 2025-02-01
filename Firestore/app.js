import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { db } from "./firebaseconfig.js";
// import { auth } from "./firebaseconfig.js";

const allTodo = [];

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const div = document.querySelector("#container");

async function getData () {
    const q = query(collection(db, "todos"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    //   console.log(doc.id, doc.data());
      allTodo.push({ ...doc.data(), id: doc.id });
    });
  
    console.log(allTodo);
    renderData(allTodo)
}

getData()

function renderData(data){
    div.innerHTML = ""
    data.map((item) => {
        div.innerHTML += ` <div class="shadow-2xl rounded-xl flex flex-col gap-3 md:flex-row justify-between items-center p-4">
           <div>
             <p class="text-lg font-semibold text-center md:text-left">${item.title}</p>
             <p class="text-sm font-normal">
              ${item.description}
             </p>
           </div>
           <div>
             <button
               class="font-semibold text-white rounded px-4 py-2 bg-red-600"
             >
               Delete
             </button>
             <button class="font-semibold text-white rounded px-4 py-2 bg-black">
               Update
             </button>
           </div>
         </div>`
    })
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(title.value);
  console.log(description.value);

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: title.value,
      description: description.value,
      date: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    allTodo.unshift({
        title: title.value,
        description: description.value,
        date: Timestamp.fromDate(new Date()),
        id: docRef.id
      })
      renderData(allTodo)
  } catch (err) {
    console.error("Error adding document: ", e);
  }
});
