import React, { createContext, useState, useEffect } from 'react';

// Création du contexte d'authentification
export const AuthContext = createContext();

// Création du provider d'authentification
export const AuthProvider = ({ children }) => {
    // Variables d'authentification
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Variable de l'utilisateur connecté
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Vérification de l'existence du token dans le localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Si le token existe, l'utilisateur est authentifié
            setIsAuthenticated(true);
            // Récupération des informations de l'utilisateur
            const userInfo = JSON.parse(localStorage.getItem('user'));
            // Définition de l'utilisateur
            setUser(userInfo);
        }
    }, []);

    // Provider d'authentification
    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};