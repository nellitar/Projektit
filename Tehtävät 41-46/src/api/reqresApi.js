const apiUrl = 'https://reqres.in/api';

export const reqresApi = {
    async signup(user) {
        return await request('/register', 'POST', user);
    },

    async login(user) {
        return await request('/login', 'POST', user);
    },

    async fetchUsers(page = 1) {
        return await request(`/users?page=${page}`);
    },

    async updateUser(userId, userData) {
        return await request(`/users/${userId}`, 'PUT', userData);
    },

    async deleteUser(userId) {
        return await request(`/users/${userId}`, 'DELETE');
    },

    async createUser(userData) {
        return await request('/users', 'POST', userData);
    }
};

// Käyttäjien lataus
async function fetchUsers(page = 1) {
    try {
        const response = await fetch(`${apiUrl}/users?page=${page}`);
        const data = await response.json();
        renderUsers(data.data);  // Näyttää käyttäjät taulukossa
        renderPagination(data.total_pages); // Luo sivunvaihtopainikkeet
    } catch (error) {
        showMessage('Error loading users', 'danger');
    }
}

// Sivupainikkeiden renderöinti
function renderPagination(totalPages) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.className = 'btn btn-light me-2';
        pageButton.textContent = `Page ${i}`;
        pageButton.onclick = () => {
            fetchUsers(i);
        };
        paginationDiv.appendChild(pageButton);
    }
}

// Yleinen apufunktio API-kutsuille
async function request(endpoint, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };

    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        if (method === 'DELETE') return response; // DELETE ei palauta sisältöä

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

