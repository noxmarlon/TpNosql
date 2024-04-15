Projet Docker Compose pour MongoDB et node js pour tester 

Ce projet utilise Docker Compose pour orchestrer un cluster MongoDB et un serveur Node.js.

Utilisation
Docker Compose
Pour lancer le cluster MongoDB et le serveur Node.js  exécutez la commande suivante :


- docker-compose up --build

- Vérification
Après le lancement des conteneurs, vous pouvez vérifier que toutes les images se sont bien lancées en utilisant Docker Desktop. Connectez-vous ensuite à la base de données MongoDB à l'aide de MongoDB Compass en utilisant l'adresse suivante :

mongodb://localhost:27017
mongodb://localhost:27018
mongodb://localhost:27019



- Postman

Le fichier de collection Postman à utiliser pour tester les routes du serveur Node.js est postmanNosql.json. Importez ce fichier dans votre client Postman pour effectuer les tests

