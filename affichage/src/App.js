import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import AjoutProduit from './components/AjoutProduit';
import Navbar from './components/Navbar';
import ProduitsList from './components/ProduitsList';
import PgInexistant from './components/PageInexistante';

const App = () => {
    // Nom d'utilisateur de l'utilisateur connecté
    const [username, setUsername] = useState('');
    
    // Mettre à jour le nom d'utilisateur après la connexion
    const handleLogin = (username) => {
        setUsername(username);  
    };

    // Routes où la navbar ne doit pas s'afficher
    const hideNavbarRoutes = ['/','*'];

    return (
        <BrowserRouter>
            <LocationHandler hideNavbarRoutes={hideNavbarRoutes} username={username} onLogin={handleLogin} />
        </BrowserRouter>
    );
};

// Fonction d'exclusion de la navbar, en fonction de la route actuelle
const LocationHandler = ({ hideNavbarRoutes, username, onLogin }) => {
    const location = useLocation(); // Récupérer la route actuelle
    return (
        <>
            {!hideNavbarRoutes.includes(location.pathname) && (
                <Navbar username={username} />
            )}
            <Routes>
                <Route path="/" element={<LoginForm onLogin={onLogin} />} />
                <Route path="/accueil" element={<ProtectedRoute> <ProduitsList /> </ProtectedRoute>} />
                <Route path="/nouveau/produit" element={<ProtectedRoute> <AjoutProduit /> </ProtectedRoute>} />
                <Route path="*" element={<PgInexistant />} />
            </Routes>
        </>
    );
};

export default App;