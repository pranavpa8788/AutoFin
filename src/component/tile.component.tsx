import { useNavigate } from 'react-router-dom';
import '../styles/tile.css';

export function Tile(obj: any) {
    console.log(`arg: ${JSON.stringify(obj)}`);
    let navigate = useNavigate();

    function addTransactionHandler() {
        console.log(`add transaction`);
        navigate("/add-transaction");
    };

    return (
        <button class="tile" onClick={addTransactionHandler}>
            {obj.children}
        </button>
    );
}