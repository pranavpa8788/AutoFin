import { useEffect } from 'preact/hooks';
import { useNavigate, type NavigateFunction } from 'react-router-dom';

export default class HomeController {
    navigate!: NavigateFunction;

    initHooks() {
        this.navigate = useNavigate();
    }

    addTransactionHandler() {
        this.navigate("/add-transaction", { state: "homepage" });
    };
}