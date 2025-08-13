import '../styles/add_transaction.css';
import AddTransactionController from "../controller/add_transaction.controller";

export default function AddTransaction() {
    const addTransactionController = new AddTransactionController();
    addTransactionController.initHooks();

    return (
        <>
        <div className={`${addTransactionController.showDialog ? "blur-bg" : ""}`}>
            <form onSubmit={addTransactionController.submitHandler}>
                <label>
                    Date: <input type="date" value={addTransactionController.date} />
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

        <div className={`popup ${addTransactionController.showDialog ? 'open' : ''}`}>
            <div>POPUP!</div>
        </div>

        </>
    );
}