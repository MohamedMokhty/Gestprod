import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext';

const Navbar = () => {
    // Variable de confirmation d'authentification
    const { setIsAuthenticated } = useContext(AuthContext);
    // Variable de l'utilisateur connecté
    const { user, setUser } = useContext(AuthContext);
    // variable de navigation, pour rediriger les pages
    const navigate = useNavigate();

    // Fonction de déconnexion
    const handleLogout = async () => {
        try {
            // Envoi de la requête de suppression du token dans le backend
            await axios.post('http://localhost:8000/logout/', {}, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
        } catch (err) {
            console.error('Erreur lors de la déconnexion', err);
        } finally {
            localStorage.removeItem('token');  // Supprimer le token côté frontend
            setUser('');  // Définir l'utilisateur dans le contexte
            setIsAuthenticated(false); // Passer le statut d'authentification à AuthContext
            navigate('/');  // Rediriger vers la page de connexion
        }
    };

    // affichage de la barre de menu horizontal
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/accueil">Test React & Django</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <span className="nav-link">Bienvenue, {user ? user.username : ''}</span>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;