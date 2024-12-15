export function openUserForm(callback, initialData = {}) {
    const dialog = document.getElementById('dialog');
    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');

    emailInput.value = initialData.email || '';
    firstNameInput.value = initialData.first_name || '';
    lastNameInput.value = initialData.last_name || '';

    dialog.style.display = 'block';

    document.getElementById('user-form').onsubmit = (e) => {
        e.preventDefault();
        callback({
            email: emailInput.value,
            first_name: firstNameInput.value,
            last_name: lastNameInput.value
        });
        dialog.style.display = 'none';
    };

    document.getElementById('cancel-button').onclick = () => {
        dialog.style.display = 'none';
    };
}
