import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const port = 3303;

app.use(cors({
    origin: "http://localhost:5173"
}));

async function initDB() {
    const db = await open({
        filename: "./db.sqlite",
        driver: sqlite3.Database
    });

    return db;
}

initDB().then((db) => {
    console.log(`Successfully connected to db`);

    app.get('/transactions', async (req, res) => {
        const rows = await db.all("SELECT * FROM transactions");
        res.json(rows);
    });

    app.get('/sources', async (req, res) => {
        const rows = await db.all("SELECT * FROM sources");
        res.json(rows);
    })

    app.get('/categories', async (req, res) => {
        const rows = await db.all("SELECT * FROM categories");
        res.json(rows);
    })

    app.get('/entities', async (req, res) => {
        const rows = await db.all("SELECT * FROM categories");
        res.json(rows);
    })

    app.listen(port, () => {
        console.log(`DB server is running...`);
    });
});