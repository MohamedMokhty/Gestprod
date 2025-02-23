import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AfficheProduit from './AfficheProduit';

const ProduitsList = () => {
    // Variable pour contenir les produits
    const [produits, setProduits] = useState([]);
    // Variable pour la page courante, initialisée à 1
    const [currentPage, setCurrentPage] = useState(1);
    // Variable pour le total des pages paginés, initialisée à 0
    const [totalPages, setTotalPages] = useState(0);
    // Variable pour garder les infos d'un produit désigné pour la modal de modification
    const [currentProduit, setCurrentProduit] = useState(null);
    // Variable d'etat pour l'affichage de la modal de modification
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                // Envoi de la requête pour recuperer les produits en pagination de 5 dans le backend
                const response = await axios.get(`http://localhost:8000/produits/?page=${currentPage}`, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setProduits(response.data.results);  // Les produits paginés
                setTotalPages(Math.ceil(response.data.count / 5));  // Nombre total de pages, paginé à 5
            } catch (err) {
                console.error('Erreur lors de la récupération des produits', err);
            }
        };

        fetchProduits();
    }, [currentPage]);

    // Fonction d'appel de la modal de modification d'un produit
    const handleEdit = (produit) => {
        setCurrentProduit(produit);
        setShowModal(true);
    };

    // Fonction de mise à jour d'un produit sur le frontend
    const handleUpdate = (updatedProduit) => {
        setProduits((prevProduits) =>
            prevProduits.map((produit) =>
                produit.id === updatedProduit.id ? updatedProduit : produit
            )
        );
    };

    // Fonction de suppression d'un produit sur le frontend
    const handleDelete = (produitId) => {
        setProduits((prevProduits) =>
            prevProduits.filter((produit) => produit.id !== produitId)
        );
    };

    // Fonction mise à jour la page courante dans la pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Affichage de la liste des produits dans un tableau
    return (
        <div className="container mt-3">
            <nav aria-label="breadcrumb justify-content-end">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Liste des produits</li>
                </ol>
            </nav>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h2>Produits</h2>
                <Link to="/nouveau/produit">
                    <button className="btn btn-primary">Ajouter un produit</button>
                </Link>
            </div>
            {produits.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-primary">
                            <tr>
                                <th>Désignation</th>
                                <th>Prix</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produits.map((produit) => (
                                <tr key={produit.id}>
                                    <td>{produit.nom}</td>
                                    <td>{produit.prix}</td>
                                    <td>{produit.description}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleEdit(produit)}>
                                            Modifier 
                                        </button>{/* Appel de la modal pour la modification du produit */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Aucun produit disponible.</p>
            )}
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <React.Fragment key={index + 1}>
                            <li className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        </React.Fragment>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
            {/* Appel du composant modal de modification d'un produit avec pour parametres:
                    - le produit à modifier
                    - l'attribut 'show' pour l'affichage de la modal
                    - la fonction 'onHide' qui defini la valeur de 'setShowModal' à 'false'
                    - les fonctions frontend de suppressin et de mise à jour
            */}
            <AfficheProduit
                produit={currentProduit}
                show={showModal}
                onHide={() => {
                    setShowModal(false);
                    setCurrentProduit(null); // Clear the fields
                }}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ProduitsList;