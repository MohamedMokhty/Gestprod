import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
    // Variable de confirmation d'authentification
    const { setIsAuthenticated } = useContext(AuthContext);
    // Variable nom d'utilisateur
    const [username, setUsername] = useState('');
    // Variable mot de passe
    const [password, setPassword] = useState('');
    // Variable d'erreur pour la connexion
    const [error, setError] = useState('');
    // Variable pour afficher ou cacher le mot de passe
    const [showPassword, setShowPassword] = useState(false);
    // Variable de l'utilisateur connecté
    const { setUser } = useContext(AuthContext);
    // variable de navigation, pour rediriger les pages
    const navigate = useNavigate();

    // Fonction de connexion et de creation des variables locales
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoi de la requête de connexion dans le backend
            const response = await axios.post('http://localhost:8000/login/', {
                username,
                password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);  // Stocker le token dans le localStorage
                setUser({ username });  // Définir l'utilisateur dans le contexte
                setIsAuthenticated(true); // Passer le statut d'authentification à AuthContext
                navigate('/accueil');  // Rediriger vers la page d'accueil
            }
        } catch (err) {
            setError('Identifiants invalides');
        }
    };

    // Formulaire de connexion
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '50rem' }}>
                <h2 className="text-center">Connexion</h2>
                {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom d'utilisateur :</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de passe :</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Cacher" : "Afficher"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;