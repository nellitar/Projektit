export function renderUsers(users, editUserCallback, deleteUserCallback) {
    const userTableBody = document.querySelector('#user-data tbody');
    userTableBody.innerHTML = '';

    users.forEach((user) => {
        const userRow = document.createElement('tr');
        userRow.innerHTML = `
            <td>${user.id}</td>
            <td><img src="${user.avatar}" class="img-fluid rounded-circle" style="width: 50px;"></td>
            <td>${user.email}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>
                <button class="btn btn-primary btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        `;

        userRow.querySelector('.btn-primary').onclick = () => editUserCallback(user);
        userRow.querySelector('.btn-danger').onclick = () => deleteUserCallback(user.id, userRow);
        userTableBody.appendChild(userRow);
    });
}
