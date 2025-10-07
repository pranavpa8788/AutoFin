CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "sources" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	"balance"	REAL NOT NULL,
	"interest_rate"	INTEGER,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "entities" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT NOT NULL,
	"amount"	REAL NOT NULL,
	"description"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "transactions" (
	"id"	INTEGER NOT NULL UNIQUE,
	"date"	TEXT NOT NULL,
	"type"	TEXT NOT NULL,
	"amount"	REAL NOT NULL,
	"direction"	TEXT NOT NULL,
	"category_id"	INTEGER NOT NULL,
	"source_id"	INTEGER NOT NULL,
	"entity_id"	INTEGER,
	"description"	NUMERIC,
	"due_date"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "category" FOREIGN KEY("category_id") REFERENCES "categories"("id"),
	CONSTRAINT "entity" FOREIGN KEY("entity_id") REFERENCES "entities"("id"),
	CONSTRAINT "source" FOREIGN KEY("source_id") REFERENCES "sources"("id")
);
