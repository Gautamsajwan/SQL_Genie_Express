import express from 'express';
import db from '../config/db';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    console.log("registering user")
    console.log(req.body)
    const { email, username, imageUrl, externalUserId, bio } = req.body;
    try {
        const newUser = await db.user.create({
            data: {
                email,
                username,
                imageUrl,
                externalUserId,
                bio,
            },
        });
        res.status(201).json(newUser);
        console.log(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'User registration failed', details: error });
    }
});

// Update user details
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { email, username, imageUrl, externalUserId, bio } = req.body;
    try {
        const updatedUser = await db.user.update({
            where: { id },
            data: {
                email,
                username,
                imageUrl,
                externalUserId,
                bio,
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'User update failed', details: error });
    }
});

// Delete user details
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.user.delete({
            where: { id },
        });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: 'User deletion failed', details: error });
    }
});

export default router;