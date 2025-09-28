import { useEffect, useState } from 'preact/hooks';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import DatabaseService from '../services/database.service';

export default class HomeController {
    navigate!: NavigateFunction;

    healthy!: boolean;
    private SetHealthy: Setter<boolean>;

    private readonly checkHealthInterval: number = 5000;

    initHooks() {
        this.navigate = useNavigate();
        [this.healthy, this.SetHealthy] = useState<boolean>(false);

        useEffect(() => {
            const checkAndSetHealthy = async () => {
                const healthy = await DatabaseService.getHealth();
                this.SetHealthy(healthy);
            };

            checkAndSetHealthy();

            const interval = setInterval(() => {
                checkAndSetHealthy();
            }, this.checkHealthInterval);

            
            return () => clearInterval(interval);
        }, []);

    }

    addTransactionHandler() {
        this.navigate("/add-transaction", { state: "homepage" });
    };
}