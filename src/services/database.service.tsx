export default class DatabaseService {
    private static db_url: string = "http://127.0.0.1:3303";

    static async getHealth(): Promise<boolean> {
        try {
            const res = await fetch(this.db_url + "/health");
            return res.ok;
        } catch (err) {
            console.error("Health check failed:", err);
            return false;
        }
    }

    static async getTransactions(): Promise<any> {
        return fetch(this.db_url + "/transactions")
        .then(res => res.json())
        .catch();
    }

    static async getSources(): Promise<any> {
        return fetch(this.db_url + "/sources")
        .then(res => res.json())
        .catch();
    }

    static async getSourcesName(): Promise<any> {
        return fetch(this.db_url + "/sources?fields=name, type")
        .then(res => res.json())
        .catch();
    }

    static async getEntities(): Promise<any> {
        return fetch(this.db_url + "/entities")
        .then(res => res.json())
        .catch();
    }

    static async getEntitiesName(): Promise<any> {
        return fetch(this.db_url + "/entities?fields=name")
        .then(res => res.json())
        .catch();
    }

    static async getCategories(): Promise<any> {
        return fetch(this.db_url + "/categories")
        .then(res => res.json())
        .catch();
    }

    static async getCategoriesName(): Promise<any> {
        return fetch(this.db_url + "/categories?fields=name")
        .then(res => res.json())
        .catch();
    }
}