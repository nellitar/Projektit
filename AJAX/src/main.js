import { reqresApi } from './api/reqresApi.js';
import { openUserForm } from './components/userForm.js';
import { showMessage } from './components/alerts.js';
import { renderUsers } from './components/userTable.js';

document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = false;

    const loadUsers = async (page = 1) => {
        try {
            const data = await reqresApi.fetchUsers(page);
            renderUsers(data.data, editUser, deleteUser);
            renderPagination(data.total_pages);
        } catch (error) {
            showMessage('Error loading users', 'danger');
        }
    };

    const renderPagination = (totalPages) => {
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = ''; // Tyhjennä vanhat painikkeet

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = `Page ${i}`;
            pageButton.className = 'btn btn-light me-2';
            pageButton.addEventListener('click', () => loadUsers(i));
            paginationDiv.appendChild(pageButton);
        }
    };

    const editUser = (user) => {
        openUserForm(async (updatedUser) => {
            try {
                await reqresApi.updateUser(user.id, updatedUser);
                showMessage(`User Updated Successfully: ${JSON.stringify(updatedUser)}`, 'primary');
            } catch {
                showMessage('Failed to update user', 'danger');
            }
        }, user);
    };

    const deleteUser = async (userId, rowElement) => {
        try {
            const response = await reqresApi.deleteUser(userId);
            if (response.ok || response.status === 204) {
                showMessage(`User with ID ${userId} deleted successfully`, 'success');
                rowElement.remove();
            } else {
                showMessage('Failed to delete user', 'danger');
            }
        } catch {
            showMessage('Failed to delete user', 'danger');
        }
    };

    const signup = async () => {
        try {
            const result = await reqresApi.signup({
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            });
            showMessage(`Registration successful. Token: ${result.token}`, 'success');
        } catch (error) {
            showMessage('SignUp failed. Please check your input.', 'danger');
        }
    };

    const login = async () => {
        try {
            const result = await reqresApi.login({
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            });
            showMessage(`You are logged in as user: eve.holt@reqres.in`, 'primary');
            toggleAuthButtons(true);
        } catch (error) {
            showMessage('Login failed. Invalid credentials.', 'danger');
        }
    };

    const logout = () => {
        showMessage('You have logged out successfully.', 'info');
        toggleAuthButtons(false);
    };

    const toggleAuthButtons = (loggedIn) => {
        isLoggedIn = loggedIn;
        document.getElementById('signup-btn').classList.toggle('d-none', loggedIn);
        document.getElementById('login-btn').classList.toggle('d-none', loggedIn);
        document.getElementById('logout-btn').classList.toggle('d-none', !loggedIn);
    };

    // Käyttäjän luonti
    const createUser = () => {
        openUserForm(async (newUser) => {
            try {
                const result = await reqresApi.createUser(newUser);
                showMessage(`User Created Successfully: ${JSON.stringify(result)}`, 'primary');
            } catch {
                showMessage('Error creating user', 'danger');
            }
        });
    };

    // Tapahtumien käsittelijät
    document.getElementById('signup-btn').addEventListener('click', signup);
    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('load-users-btn').addEventListener('click', () => loadUsers());
    document.getElementById('create-user-btn').addEventListener('click', createUser);
});
