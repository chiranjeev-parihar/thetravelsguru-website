import React, { useState } from 'react';
import { AdminLogin } from './AdminLogin';
import { AdminPanel } from './AdminPanel';

export const AdminRoute = () => {
    const [authed, setAuthed] = useState(
        sessionStorage.getItem('tg_admin') === '1'
    );

    const handleLogin = () => setAuthed(true);
    const handleLogout = () => {
        sessionStorage.removeItem('tg_admin');
        setAuthed(false);
    };

    if (!authed) return <AdminLogin onLogin={handleLogin} />;
    return <AdminPanel onLogout={handleLogout} />;
};
