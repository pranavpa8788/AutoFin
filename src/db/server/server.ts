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

    function fieldValidator(allowedFields: Array<string>, fields: string) {
        let selectedFields: Array<string> = [];

        if (fields) {
            let requestedFields = fields.split(",").map(s => s.trim());
            selectedFields = requestedFields.filter(f => allowedFields.includes(f));
        }

        return selectedFields;
    }

    app.get('/transactions', async (req, res) => {
        const rows = await db.all("SELECT * FROM transactions");
        res.json(rows);
    });

    app.get('/sources', (req, res) => {
        const allowedFields = ["name", "type"];
        const { fields } = req.query as { fields: string };

        let query = "SELECT * FROM sources";

        const selectedFields = fieldValidator(allowedFields, fields);

        if (selectedFields) {
            query = `SELECT ${selectedFields} FROM sources`; 
        }

        db.all(query).then((rows) => {
            return res.json(rows);
        }).catch();
    })

    app.get('/categories', (req, res) => {
        const allowedFields = ["name"];
        const { fields } = req.query as { fields: string };

        let query = "SELECT * FROM categories"

        const selectedFields = fieldValidator(allowedFields, fields);

        if (selectedFields) {
            query = `SELECT ${selectedFields} FROM categories`;
        }

        db.all(query).then((rows) => {
            return res.json(rows);
        });
    })

    app.get('/entities', async (req, res) => {
        const allowedFields = ["name"];
        const { fields } = req.query as { fields: string };

        let query = "SELECT * FROM entities";

        const selectedFields = fieldValidator(allowedFields, fields);

        if (selectedFields) {
            query = `SELECT ${selectedFields} FROM entities`;
        }

        db.all(query).then((rows) => {
            return res.json(rows);
        });
    })

    app.get('/health', async (req, res) => {
        return res.status(200).send({ status: 'ok' });
    });

    app.listen(port, () => {
        console.log(`DB server is running...`);
    });
});