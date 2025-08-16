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
        const allowedFields = ["name", "type"];
        let selectedFields = allowedFields;
        const { fields } = req.query;

        let query = "SELECT * FROM sources";

        if (fields) {
            let requestedFields = (fields as string).split(",").map(s => s.trim());
            selectedFields = requestedFields.filter(f => allowedFields.includes(f));

            if (selectedFields.length == 0) {
                return res.status(400).json({ error: "Invalid fields provided" });
            }

            query = `SELECT ${selectedFields} FROM SOURCES`; 
        }

        const rows = await db.all(query);

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