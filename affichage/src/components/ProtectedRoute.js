import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

/**
 * Composant de route protégée qui vérifie si l'utilisateur est authentifié.
 * Si l'utilisateur n'est pas authentifié, il est redirigé vers la page de login.
 * 
 * @param {Object} props - Les propriétés passées au composant.
 * @param {React.ReactNode} props.children - Les composants enfants à afficher si l'utilisateur est authentifié.
 * @returns {React.ReactNode} Les composants enfants si l'utilisateur est authentifié, sinon une redirection vers la page d'accueil.
 */

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;