import React from 'react';

const PgInexistant = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="display-1">404</h1>
            <p className="lead">Page non trouvée</p>
            <a href="/" className="btn btn-primary">Retour à la page de connexion</a>
        </div>
    );
};

export default PgInexistant;