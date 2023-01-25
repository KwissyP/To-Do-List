// Nouvelle tâche
const form = document.getElementById("formHead");
const input = document.getElementById("inputHead");
const colOne = document.querySelector(".col")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let value = input.value;
    if (!value) return;
    let newTask = document.createElement("div");
    newTask.classList.add("code");
    newTask.classList.add("shadow-sm");
    newTask.setAttribute("draggable", "true");
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add("is-dragging");
    });
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove("is-dragging");
    });
    newTask.innerText = value.toUpperCase();
    colOne.appendChild(newTask);
    input.value = "";
});

// Drag & Drop
const draggables = document.querySelectorAll(".code");
const droppables = document.querySelectorAll(".col");

// Selection de tous les éléments avec la classe "code" pour les rendre draggable
draggables.forEach((task) => {
    task.setAttribute("draggable", 'true');
    // Ajout d'un écouteur d'événement "dragstart" pour ajouter la classe "is-dragging"
    task.addEventListener("dragstart", () => {
        task.classList.add("is-dragging");
    });
    // Ajout d'un écouteur d'événement "dragend" pour enlever la classe "is-dragging"
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

// Selection de tous les éléments avec la classe "col" pour les rendre droppable
droppables.forEach((zone) => {
    // Ajout d'un écouteur d'événement "dragover" pour autoriser le drop
    zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        // utilisation de la fonction pour insérer l'élément draggable au dessus de l'élement code le plus proche
        const bottomTask = insertAboveTask(zone, e.clientY);
        const curTask = document.querySelector(".is-dragging");

        // Si pas d'élement code trouvé, on append l'élément draggable
        if (!bottomTask) {
            zone.appendChild(curTask);
        } else {
            // Sinon on insère l'élément draggable avant l'élement code trouvé
            zone.insertBefore(curTask, bottomTask);
        }
    });
});

// Fonction pour trouver l'élement code le plus proche de l'emplacement ou l'élement draggable est laché
const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".code:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const {
            top
        } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
};