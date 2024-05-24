const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

const port=5000

dotenv.config({ path: './config/.env' });
const app = express();
// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connecté...'))
.catch(err => console.log(err));

// Route pour retourner tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});

// Route pour ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = new User({ name, email, password });
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});
// Route pour modifier un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});
// Route pour supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé' });
        }

        res.json({ msg: 'Utilisateur supprimé' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
    }
});


app.listen(port, () => {
    console.log(`App is listening to port: ${port}`);
});