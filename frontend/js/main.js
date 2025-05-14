document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://women-safety-backend-ten.vercel.app/api';

    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const navList = document.querySelector('.nav-list');
            navList?.classList.toggle('active');

            const menuIcon = menuBtn.querySelector('img');
            if (menuIcon) {
                if (navList?.classList.contains('active')) {
                    menuIcon.src = 'assets/icons/close.svg';
                    menuIcon.alt = 'Close';
                } else {
                    menuIcon.src = 'assets/icons/menu.svg';
                    menuIcon.alt = 'Menu';
                }
            }
        });
    }

    window.api = {
        getToken: () => localStorage.getItem('token'),
        setToken: (token) => localStorage.setItem('token', token),
        removeToken: () => localStorage.removeItem('token'),
        getUser: () => JSON.parse(localStorage.getItem('user') || '{}'),
        setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
        removeUser: () => localStorage.removeItem('user'),
        isLoggedIn: () => !!localStorage.getItem('token'),

        async request(endpoint, method = 'GET', data = null, requiresAuth = true) {
    const url = `${API_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (requiresAuth) {
        const token = this.getToken();
        if (!token) {
            throw new Error('Authentication required');
        }
        options.headers['x-auth-token'] = token;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        // Token expired or invalid
        if (response.status === 401) {
            console.warn('Token expired or invalid. Logging out...');
            this.logout();
            window.location.href = '/login.html';
            return;
        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
},


        async login(username, password) {
            const result = await this.request('/auth/login', 'POST', { username, password }, false);
            this.setToken(result.token);
            this.setUser(result.user);
            return result;
        },

        async register(username, phone, password) {
            const result = await this.request('/auth/register', 'POST', { username, phone, password }, false);
            this.setToken(result.token);
            this.setUser(result.user);
            return result;
        },

        logout() {
            this.removeToken();
            this.removeUser();
        }
    };
}); 
