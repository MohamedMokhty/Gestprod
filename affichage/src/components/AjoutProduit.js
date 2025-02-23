import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AjoutProduit = () => {
    // Variables d'état pour les champs du formulaire
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');
    const [description, setDescription] = useState('');
    // Variables d'état pour les erreurs de validation
    const [error, setError] = useState('');
    const [nomError, setNomError] = useState('');
    const [prixError, setPrixError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    // Variable de navigation, pour rediriger les pages
    const navigate = useNavigate();

    // Fonction de validation de la désignation
    const validateNom = (value) => {
        if (!value.trim()) {
            setNomError('La désignation est requis');
            return false;
        }
        if (value.length > 150) {
            setNomError('La désignation ne doit pas dépasser 150 caractères');
            return false;
        }
        setNomError('');
        return true;
    };

    // Fonction de validation du prix
    const validatePrix = (value) => {
        if (!value.trim()) {
            setPrixError('Le prix est requis');
            return false;
        }
        if (!Number.isInteger(Number(value))) {
            setPrixError('Le prix doit être un nombre entier');
            return false;
        }
        if (value < 0) {
            setPrixError('Le prix doit être positif'); 
            return false;
        }
        setPrixError('');
        return true;
    };

    // Fonction de validation de la description
    const validateDescription = (value) => {
        if (!value.trim()) {
            setDescriptionError('Le contenu est requis');
            return false;
        }
        if (value.length > 250) {
            setDescriptionError('La désignation ne doit pas dépasser 250 caractères');
            return false;
        }
        setDescriptionError('');
        return true;
    };

    // Fonctions de gestion des changements des champs du formulaire
    const handleNomChange = (e) => {
        setNom(e.target.value);
        validateNom(e.target.value);
    };

    const handlePrixChange = (e) => {
        setPrix(e.target.value);
        validatePrix(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        validateDescription(e.target.value);
    };
    // fin des fonctions de gestion des changements des champs du formulaire

    // Fonction de validation du formulaire
    const validateForm = () => {
        if (!nom.trim()) {
            setNomError('La désignation est requise');
            return false;
        }
        if (!prix.trim()) {
            setPrixError('Le prix est requis');
            return false;
        }
        if (prix < 0) {
            setPrixError('Le prix doit être positif'); 
            return false;
        }
        if (!Number.isInteger(Number(prix))) {
            setPrixError('Le prix doit être un nombre entier');
            return false;
        }
        if (nom.length > 150) {
            setNomError('La désignation ne doit pas dépasser 150 caractères');
            return false;
        }
        if (description.length > 250) {
            setDescriptionError('La description ne doit pas dépasser 250 caractères');
            return false;
        }
        setNomError('');
        setPrixError('');
        setDescriptionError('');
        return true;
    };
    
    // Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; // Valider le formulaire avant la soumission

        try {
            // Envoi de la requête de création du produit dans le backend
            const response = await axios.post('http://localhost:8000/nouveau/produit/', {
                nom,
                prix,
                description,
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 201) {
                navigate('/accueil');  // Rediriger vers la page d'accueil après la création
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);  // Afficher les erreurs de validation venant du backend
            } else {
                setError('Erreur lors de la création du produit');
            }
            
        }
    };

    // Formulaire d'ajout d'un produit
    return (
        <div className="container mt-5">
            <nav aria-label="breadcrumb row justify-content-end">
                <ol className="breadcrumb col">
                    <li className="breadcrumb-item"><Link to="/accueil">Liste des produits</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Ajouter un produit</li>
                </ol>
            </nav>
            <h2>Ajouter un nouveau produit</h2>
            {error && (<span className="text-danger">{error}</span>)}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Désignation :</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nom}
                        onChange={handleNomChange}
                        aria-describedby="nomHelp"
                    />
                    {nomError && <div  id="nomHelp" className="form-text text-danger">{nomError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix :</label>
                    <input
                        type="text"
                        className="form-control"
                        value={prix}
                        onChange={handlePrixChange}
                        aria-describedby="prixHelp"
                    />
                    {prixError && <div id="prixHelp" className="form-text text-danger">{prixError}</div>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description :</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={handleDescriptionChange}
                        aria-describedby="descHelp"
                    />
                    {descriptionError && <div  id="descHelp" className="form-text text-danger">{descriptionError}</div>}
                </div>
                <div className="row justify-content-evenly">
                    <button type="submit" className="btn btn-primary col-3">Créer le produit</button>
                    <button type="reset" className="btn btn-secondary col-3" onClick={() => {
                        setNom('');
                        setPrix('');
                        setDescription('');
                        setNomError('');
                        setPrixError('');
                        setDescriptionError('');
                        setError('');
                    }}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default AjoutProduit;