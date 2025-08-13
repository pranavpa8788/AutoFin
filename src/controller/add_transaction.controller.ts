import { useState, useEffect, type Dispatch, type StateUpdater } from "preact/hooks";
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import DatabaseService from "../services/database.service";
import type { JSX } from "preact/jsx-runtime";

export default class AddTransactionController {
    private navigate!: NavigateFunction;

    loading!: boolean;
    private setLoading!: Dispatch<StateUpdater<boolean>>;

    date!: string;
    private setDate!: Dispatch<StateUpdater<string>>;

    showDialog!: boolean;
    private setShowDialog!: Dispatch<StateUpdater<boolean>>;

    // istanbul ignore next
    initHooks() {
        this.navigate = useNavigate();
        [this.loading, this.setLoading] = useState(false);
        [this.date, this.setDate] = useState<string>("");
        [this.showDialog, this.setShowDialog] = useState(false);

        this.setLoading(false);

        useEffect(() => {
            return this.validateSources();
        }, []);

        useEffect(() => {
            // set the date field to today's date by default
            this.updateDate();
        }, []);
    }

    updateDate() {
        let today = new Date();
        let today_string = today.toISOString();
        today_string = today_string.slice(0, 10)
        this.setDate(today_string);
    }

    validateSources() {
        let animation_timer: NodeJS.Timeout;
        let navigation_timer: NodeJS.Timeout;

        DatabaseService.getTransactions().then((response) => {
            if (response.length == 0) {
                animation_timer = setTimeout(() => this.setShowDialog(true), 200);
                navigation_timer = setTimeout(() => this.navigate("/"), 3000);
            }
        });

        return () => {
            clearTimeout(animation_timer);
            clearTimeout(navigation_timer);
        }
    }

    // istanbul ignore next
    async submitHandler(event: JSX.TargetedEvent<HTMLFormElement, Event>) {
        event.preventDefault();
        console.log(`handling submit`);
    }
}