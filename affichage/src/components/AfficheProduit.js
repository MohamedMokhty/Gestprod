import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AfficheProduit = ({ produit, show, onHide, onUpdate, onDelete }) => {
    // Variables d'état pour les champs du formulaire
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');
    const [description, setDescription] = useState('');
    // Variables d'état pour les erreurs de validation
    const [nomError, setNomError] = useState('');
    const [prixError, setPrixError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        if (produit) {
            // Si le produit existe, mettre à jour les champs du formulaire
            setNom(produit.nom);
            setPrix(produit.prix);
            setDescription(produit.description);
        }
    }, [produit]);

    // Fonction de validation de la désignation
    const validateNom = (value) => {
        if (value.length > 150) {
            setNomError('La désignation ne doit pas dépasser 150 caractères');
            return false;
        }
        setNomError('');
        return true;
    };

    // Fonction de validation du prix
    const validatePrix = (value) => {
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

    // Fonction de mise à jour d'un produit
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            // Envoi de la requête de mise à jour du produit dans le backend
            const response = await axios.put(`http://localhost:8000/affiche/produit/${produit.id}/`, 
                { 
                    'nom' : nom, 
                    'prix' : prix, 
                    'description' : description 
                }, 
                {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.status === 200) {
                onUpdate(response.data);  // Mettre à jour le produit dans le tableau
                onHide();  // Fermer la modal
            }
        } catch (err) {
            console.error('Erreur lors de la modification du produit', err);
        }
    };

    // Fonction de suppression d'un produit
    const handleDelete = async () => {
        try {
            // Envoi de la requête de suppression du produit dans le backend
            const response = await axios.delete(`http://localhost:8000/supprime/produit/${produit.id}/`,
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.status === 204) {
                onDelete(produit.id);  // Supprimer le produit du tableau
                onHide();  // Fermer la modal
            }
        } catch (err) {
            console.error('Erreur lors de la suppression du produit', err);
        }
    };

    // Modal de modification et de suppression d'un produit
    return (
        <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modifier le produit {produit ? produit.nom : ''}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Désignation </label>
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
                                <label className="form-label">Prix</label>
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
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    aria-describedby="descHelp"
                                ></textarea>
                                {descriptionError && <div  id="descHelp" className="form-text text-danger">{descriptionError}</div>}
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
                            Supprimer le produit
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onHide}>
                            Annuler
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AfficheProduit;