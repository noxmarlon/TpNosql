const express = require('express');
const { faker } = require('@faker-js/faker');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3002;

app.use(express.json());

const uri = 'mongodb://mongo-rs0-1:27017,mongo-rs0-2:27017,mongo-rs0-3:27017/nosql?replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function connectAndCreateDBAndCollection() {
    try {
        await client.connect();
        const database = client.db('nosql');
        const collection = database.collection('users');

        const collectionExists = await database.listCollections({ name: 'users' }).hasNext();

        if (!collectionExists) {
            await database.createCollection('users');
            console.log('La colección "users" ha sido creada.');
        } else {
            console.log('La colección "users" ya existe.');
        }
    } catch (error) {
        console.error('Erreur lors de la connexion ou de la création de la collection :', error);
    } finally {
        await client.close();
    }
}

function generateUser() {
    const firstName = faker.internet.userName();
    const lastName = faker.name.lastName();
    return {
        "name": `${firstName} ${lastName}`,
        "age": Math.floor(Math.random() * (80 - 18 + 1)) + 18,
        "email": faker.internet.email(),
        "createdAt": randomDate(new Date(2020, 0, 1), new Date()).toISOString()
    };
}


app.post('/generer_utilisateurs', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('nosql');
        const collection = database.collection('users');


        const users = [];
        for (let i = 0; i < 100; i++) {
            users.push(generateUser());
        }

        const resultat = await collection.insertMany(users);
        res.json(resultat);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: 'Erreur lors de l\'insertion des utilisateurs' });
    } finally {
        await client.close();
    }
});

app.get('/db_status', async (req, res) => {
    try {
        await client.connect();
        res.status(200).json({ status: 'Connexion réussie à la base de données MongoDB' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur de connexion à la base de données MongoDB' });
    } finally {
        await client.close();
    }
});


app.post('/utilisateurs', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('nosql');
        const collection = database.collection('users');
        const resultat = await collection.insertOne(req.body);
        res.json(resultat);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: 'Erreur lors de l\'insertion de l\'utilisateur' });
    } finally {
        await client.close();
    }
});


app.get('/utilisateurs/majeurs_de_30', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('nosql');
        const collection = database.collection('users');
        const utilisateurs = await collection.find({ age: { $gt: 30 } }).toArray();
        res.json(utilisateurs);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: 'Erreur lors de la récupération des utilisateurs de plus de 30 ans' });
    } finally {
        await client.close();
    }
});

app.put('/utilisateurs/actualiser_age', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('nosql');
        const collection = database.collection('users');
        const resultat = await collection.updateMany({}, { $inc: { age: 5 } });
        res.json(resultat);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: 'Erreur lors de la mise à jour des âges des utilisateurs' });
    } finally {
        await client.close();
    }
});

app.delete('/utilisateurs/:id', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('nosql');
        const collection = database.collection('users');
        const resultat = await collection.deleteOne({ _id: ObjectId(req.params.id) });
        res.json(resultat);
    } catch (erreur) {
        console.error(erreur);
        res.status(500).json({ erreur: 'Erreur lors de la suppression de l\'utilisateur' });
    } finally {
        await client.close();
    }
});

connectAndCreateDBAndCollection();

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port}`);
});
