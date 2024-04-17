firebase.initializeApp({
    apiKey: "AIzaSyC4fPZzm4fFhOUqv92aUqmnqB4CLqZGfmg",
  authDomain: "taskmanagement-d24c9.firebaseapp.com",
  projectId: "taskmanagement-d24c9",
  storageBucket: "taskmanagement-d24c9.appspot.com",
  messagingSenderId: "1009565893656",
  appId: "1:1009565893656:web:2a351b65ddf716567a6f6d"
});

const db = firebase.firestore();

// Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

// Function to render tasks

function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

// Real-time listener for tasks
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

// Function to delete a task

function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}