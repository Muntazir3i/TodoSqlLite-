// backend/server.js
import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', (req, res) => {
    const todos = db.prepare('SELECT * FROM todos').all();
    res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
    const { text } = req.body;
    const stmt = db.prepare('INSERT INTO todos (text) VALUES (?)');
    const info = stmt.run(text);
    res.json({ id: info.lastInsertRowid });
});

// Toggle todo done
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.prepare('UPDATE todos SET done = NOT done WHERE id = ?').run(id);
    res.json({ success: true });
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    res.json({ success: true });
});

// Start server
app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
