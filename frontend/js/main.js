document.addEventListener('DOMContentLoaded', () => {
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

    window.storage = {
        get: k => JSON.parse(localStorage.getItem(k) || '[]'),
        set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
        remove: k => localStorage.removeItem(k)
    };

    window.auth = {
        login: (user, pass) => {
            const users = window.storage.get('users');
            const match = users.find(u => u.username === user && u.password === pass);
            if (match) {
                window.storage.set('currentUser', { username: match.username, isLoggedIn: true });
                return true;
            }
            return false;
        },
        register: data => {
            const users = window.storage.get('users');
            if (users.some(u => u.username === data.username)) return false;
            users.push(data);
            window.storage.set('users', users);
            return true;
        },
        isLoggedIn: () => (JSON.parse(localStorage.getItem('currentUser') || '{}').isLoggedIn === true),
        logout: () => window.storage.remove('currentUser')
    };

    if (document.body.classList.contains('protected') && !window.auth.isLoggedIn()) {
        location.href = 'login.html';
    }
}); 