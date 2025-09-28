import { useLocation } from 'react-router-dom';
import '../styles/add_transaction.css';
import AddTransactionController from "../controller/add_transaction.controller";

export default function AddTransaction() {
    const addTransactionController = new AddTransactionController();
    addTransactionController.initHooks();

    const location = useLocation();

    console.log(`arg: ${JSON.stringify(location)}`);

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
                        {addTransactionController.sources}
                    </select>
                </label>

                <label>
                    Amount: <input type="number" />
                </label>

                <label>
                    Direction:
                    <select>
                        <option key="credit">Credit</option>
                        <option key="debit">Debit</option>
                    </select>
                </label>

                <label>
                    Category:
                    <select>
                        {addTransactionController.categories}
                    </select>
                </label>

                <label>
                    Description: <input type="text" />
                </label>

                <label>
                    Lend/Borrow: <input type="checkbox" onChange={addTransactionController.lendOrBorrowHandler.bind(addTransactionController)} />
                </label>

                {addTransactionController.lendOrBorrow &&
                    <>
                        <label>
                            Entity:
                            <select>
                                {addTransactionController.entities}
                            </select>
                        </label>

                        <label>
                            DueDate: <input type="date" />
                        </label>
                    </>
                }

                <button type="submit">Submit</button>
            </form>
        </div>

        <div className={`popup ${addTransactionController.showDialog ? 'open' : ''}`}>
            <div>POPUP!</div>
        </div>

        </>
    );
}