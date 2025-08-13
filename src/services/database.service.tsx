export default class DatabaseService {
    private static db_url: string = "http://127.0.0.1:3303";

    static async getTransactions(): Promise<any> {
        return fetch(this.db_url + "/transactions")
        .then(res => {
            let res_json = res.json();
            console.log(`res: ${res_json}`);
            return res_json;
        })
        .catch();
    }
}