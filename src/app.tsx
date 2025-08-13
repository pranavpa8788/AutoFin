import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/home.component';
import AddTransaction from './component/add_transaction.component';

export function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" Component={Home}>hi</Route>
                <Route path="/add-transaction" Component={AddTransaction}/>
            </Routes>
        </Router>
    )
}
