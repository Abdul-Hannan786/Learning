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

async function getData() {
  const q = query(collection(db, "todos"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    allTodo.push({ ...doc.data(), id: doc.id });
  });

  console.log(allTodo);
  renderData(allTodo);
}

getData();

function renderData(data) {
  div.innerHTML = "";
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
               class="deleteBtn mr-2 font-semibold text-white rounded px-4 py-2 bg-red-600 hover:bg-red-700 transition-transform duration-300 hover:scale-105"
               type="button"
             >
               Delete
             </button>
             <button type="button" class="editBtn font-semibold text-white rounded px-4 py-2 bg-black hover:bg-gray-900 transition-transform duration-300 hover:scale-105">
               Update
             </button>
           </div>
         </div>`;
  });

  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const editBtn = document.querySelectorAll(".editBtn");

  deleteBtn.forEach((btn, index) => {
    btn.addEventListener("click", async (e) => {
      await deleteDoc(doc(db, "todos", allTodo[index].id));
      console.log("Todo deleted");
      allTodo.splice(index, 1);
      renderData(allTodo);
    });
  });

  editBtn.forEach((btn, index) => {
    btn.addEventListener("click", async (e) => {
      const updatedTitle = prompt("Enter updated title");
      const updatedDesc = prompt("Enter updated description");
      const docRef = doc(db, "todos", allTodo[index].id);
      await updateDoc(docRef, {
        title: updatedTitle,
        description: updatedDesc,
      });
      console.log("Todo updated successfully");
      allTodo[index].title = updatedTitle;
      allTodo[index].description = updatedDesc;
      renderData(allTodo);
    });
  });
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
      id: docRef.id,
    });
    description.value = "";
    renderData(allTodo);
    title.value = "";
  } catch (err) {
    console.error("Error adding document: ", e);
  }
});
