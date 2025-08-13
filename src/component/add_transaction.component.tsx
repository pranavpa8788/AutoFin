import { useState, useEffect } from "preact/hooks";
import { useNavigate } from 'react-router-dom';
import '../styles/add_transaction.css';
import DatabaseService from "../services/database.service";


export default function AddTransaction() {
    let navigate = useNavigate();

    let [date, setDate] = useState<string>();
    let [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        // validation db queries
    }, []);

    useEffect(() => {
        // set the date field to today's date by default
        let today = new Date();
        let today_string = today.toISOString();
        today_string = today_string.slice(0, 10)
        setDate(today_string);
    }, []);

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(`handling submit`);
        let response = await DatabaseService.getTransactions();

        if (response.length == 0) {
            const timer = setTimeout(() => setShowDialog(true), 1);
            // setShowDialog(true);
            // navigate("/");
        }
    }

    return (
        <>
        <div className={`${showDialog ? "blur-bg" : ""}`}>
            <form onSubmit={submitHandler}>
                <label>
                    Date: <input type="date" value={date} />
                </label>


                <label>
                    Type: 
                    <select>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>
                </label>

                <label>
                    Source:
                    <select>
                    </select>
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>

        <div className={`popup ${showDialog ? 'open' : ''}`}>
            <div>POPUP!</div>
        </div>

        </>
    );
}