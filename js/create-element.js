function createTodoList(todo) {
    if (!todo) return null;

    //find template
    const todoTemplate = document.getElementById('todoTemplate');
    if (!todoTemplate) return null;

    //clone the li element
    const todoElement = todoTemplate.content.firstElementChild.cloneNode(true);
    todoElement.dataset.id = todo.id;
    todoElement.dataset.status = todo.status;

    const divElement = todoElement.querySelector('div.todo');
    if (!divElement) return null;

    const alertClass = todo.status === 'completed' ? 'alert-success' : 'alert-secondary';
    divElement.classList.remove('alert-secondary');
    divElement.classList.add(alertClass);

    //find and update title
    const titleElement = todoElement.querySelector('.todo__title');
    if (titleElement) titleElement.textContent = todo.title;

    //TODO: attach events for buttons
    //add click event for mark-as-done button

    const markAsDoneButton = todoElement.querySelector('button.mark-as-done');
    if (markAsDoneButton) {
        markAsDoneButton.addEventListener('click', () => {
            const currentStatus = todoElement.dataset.status;
            todoElement.dataset.status = currentStatus === 'pending' ? 'completed' : 'pending';

            const newAlertClass = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';
            divElement.classList.remove('alert-success', 'alert-secondary');
            divElement.classList.add(newAlertClass);

            const btnClass = newAlertClass === 'alert-secondary' ? 'btn-dark' : 'btn-success';
            divElement.classList.remove('btn-dark', 'btn-success');
            divElement.classList.add(btnClass);

            const btnTitle = btnClass === 'btn-dark' ? 'Finish' : 'Reset';
            markAsDoneButton.textContent = btnTitle;
        });
    }

    const removeButton = todoElement.querySelector('button.remove');
    if (removeButton) {
        removeButton.addEventListener('click', () => {
            todoElement.remove();
        });
    }

    return todoElement;
}

function renderTodoList(todoList, ulElementId) {
    if (!Array.isArray(todoList) || todoList.length === 0) return;

    const ulElement = document.getElementById(ulElementId);
    if (!ulElementId) return;

    for (const todo of todoList) {
        const liElement = createTodoList(todo);
        ulElement.appendChild(liElement);
    }
}

(() => {
    const todoList = [
        { id: 1, title: 'Learn Javascript', status: 'pending' },
        { id: 2, title: 'Learn ReactJs', status: 'pending' },
        { id: 3, title: 'Learn NodeJs', status: 'pending' },
    ];

    renderTodoList(todoList, 'todoList');
})();
