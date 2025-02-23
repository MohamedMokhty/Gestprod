Cette application fait le CRUD de produits. Elle est faite en Django REST pour le Back-End et React JS pour Front-End, accompgnée par Bootstrap5 en ce qui concerne l'habillage.

Pour l'installer, suivre ces étapes après avour installé Python sur votre machine :

1- créer un dossier et se positionner à l'intérieur : 
    mkdir Test-Full-Stack
	cd Test-Full-Stack

2- créer un environnement virtuel python et s'y connecter : 
	python -m venv VirtualAera ;
	cd VirtualAera  et source bin/activate(linux) ;
	ou VirtualAera\scripts\activate.bat(windows)

3- installer Django : 
	pip install Django

4- installer les dépendances de l'application : 
	pip install -r requirements.txt

5- migrer les éléments de model.py vers la base de données : 
	python manage.py migrate

6- créer un super ou un premier utilisateur : 
	python manage.py createsuperuser --email test@example.com --username test2025 ;
	password: Test&2025

7- lancer le serveur avec la commande : 
	python manage.py runserver

8- se connecter à http://127.0.0.1:8000/admin/ avec le username et le password ; puis aller au menu produit pour enregistrer quelques produits

9- se positionner dans le module d'affichage, depuis une autre invite de commande : 
	cd affichage

10- démarrer le serveur React : 
	npm start
