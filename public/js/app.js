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
    newTask.addEventListener('dragstart', function () {
        draggedItem = newTask;
        setTimeout(function () {
            newTask.style.display = 'none';
        }, 0)
    });
    newTask.addEventListener('dragend', function () {
        setTimeout(function () {
            newTask.style.display = 'block';
            draggedItem = null;
        }, 0);
        draggedItem = null;
    });
    newTask.addEventListener('dragover', function (e) {
        e.preventDefault();
    });

    newTask.addEventListener('dragenter', function (e) {
        e.preventDefault();
    });

    newTask.addEventListener('drop', function () {
        console.log('drop');
        this.append(draggedItem);
    });
    newTask.innerText = value.toUpperCase();
    colOne.appendChild(newTask);
    input.value = "";
});

// Drag & Drop
const code = document.querySelectorAll('.code');
const col = document.querySelectorAll('.col');

let draggedItem = null;

for (let i = 0; i < code.length; i++) {
    let item = code[i];
    item.setAttribute('draggable', 'true');

    item.addEventListener('dragstart', function () {
        draggedItem = item;
        setTimeout(function () {
            item.style.display = 'none';
        }, 0)
    });

    item.addEventListener('dragend', function () {
        setTimeout(function () {
            item.style.display = 'block';
            draggedItem = null;
        }, 0);
        draggedItem = null;
    })

    for (let j = 0; j < col.length; j++) {
        let list = col[j];

        list.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
        });

        list.addEventListener('drop', function (e) {
            const target = e.target;

            if (target && target !== draggedItem && target.classList.contains('code')) {
                const nextSibling = target.nextElementSibling;
                const parent = target.parentNode;
                parent.insertBefore(draggedItem, target);
                if (nextSibling) {
                    parent.insertBefore(target, nextSibling);
                } else {
                    parent.appendChild(target);
                    target.nextElementSibling = nextSibling;
                }
            } else {
                list.appendChild(draggedItem);
            }
        });
    }
}