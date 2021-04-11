import "./css/constants.css";
import './css/grid.css';
import './css/main.css';
import './css/header.css';
import './css/nav.css';
import './css/icomoon.css';
import './css/footer.css';
import './css/page.css';
import './css/print.css';
import './css/todolist.css';


import "nav.js";

navigator.serviceWorker.register('sw.js');

import tmplTask from 'templates/task.hbs';

import JsonStorage from 'lib/JsonStorage.js';

let tasksStorage = new JsonStorage({ name: "tasks", eventName: "tasks-changed" });
let filterStorage = new JsonStorage({ name: "tasks-filter", eventName: "tasks-changed" });

let compareTask = (t1, t2) => t1.date.localeCompare(t2.date);

const updateDomTasks = () => {
    let container = document.querySelector("#todo-list-container");
    container.textContent = "";
    let sortedTasks = tasksStorage.sort(compareTask);
    let filter = filterStorage.getItem("filter");
    let today = (new Date()).toISOString();
    if (filter == "past") {
        sortedTasks = sortedTasks.filter(([key, task]) => task.date < today);
    } else if (filter == "futur") {
        sortedTasks = sortedTasks.filter(([key, task]) => task.date >= today);
    }
    for (let [key, task] of sortedTasks) {
        console.log("pouet");
        container.insertAdjacentHTML("beforeend", tmplTask({ ...task, key }));
    }
}

document.querySelector("filters").addEventListener("click", evt => {
    let btn = evt.target;
    let filter = btn.dataset.filter;
    if (!filter) return;
    filterStorage.setItem("filter", filter);
});


window.addEventListener("tasks-changed", updateDomTasks);
updateDomTasks();

document.querySelector('[data-action="create-task"]').addEventListener('submit', evt => {
    evt.preventDefault();
    console.log("event created");

    tasksStorage.addItem({
        task: document.querySelector('[name="task"]').value,
        date: document.querySelector('[name="date"]').value
    });

    document.querySelector('[name="task"]').value = "";
    document.querySelector('[name="date"]').value = "";

});

document.querySelector('#todo-list-container').addEventListener("click", evt => {
    const btn = evt.target;
    if (btn.dataset.action != "delete-task") return;
    const key = btn.dataset.key;
    tasksStorage.removeItem(key);
});

document.querySelector('#todo-list-container').addEventListener("click", evt => {
    const btn = evt.target;
    if (btn.dataset.action != "delete-task") {
        return;
    }
    const key = btn.dataset.key;
    tasksStorage.removeItem(key);
});



