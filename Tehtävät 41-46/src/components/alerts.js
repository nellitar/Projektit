export function showMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.textContent = message;

    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');
    alertDiv.appendChild(closeButton);

    document.getElementById('alerts').appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}
