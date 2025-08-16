import { useState, useEffect, type Dispatch, type StateUpdater } from "preact/hooks";
import { useNavigate, useLocation, type NavigateFunction, type Location } from 'react-router-dom';
import DatabaseService from "../services/database.service";
import type { VNode as Element } from "preact";
import type { JSX } from "preact/jsx-runtime";

export default class AddTransactionController {
    private navigate!: NavigateFunction;

    private location!: Location;

    sources!: Array<Element>;
    private setSources!: Dispatch<StateUpdater<Array<Element>>>;

    loading!: boolean;
    private setLoading!: Dispatch<StateUpdater<boolean>>;

    date!: string;
    private setDate!: Dispatch<StateUpdater<string>>;

    showDialog!: boolean;
    private setShowDialog!: Dispatch<StateUpdater<boolean>>;

    // istanbul ignore next
    initHooks() {
        this.navigate = useNavigate();
        this.location = useLocation();

        [this.sources, this.setSources] = useState<Array<Element>>([]);
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

        this.validateNavigation();
    }

    mapSourcesToElement(sources: Array<SourceName>) {
        return sources.map((source) => {
            return <option key={source.name}>{source.name}</option>
        });
    }

    validateNavigation() {
        if (this.location.state != "homepage") {
            this.navigate("/");
        }
    }

    validateSources() {
        let animation_timer: NodeJS.Timeout;
        let navigation_timer: NodeJS.Timeout;

        DatabaseService.getSources().then((response) => {
            if (response.length == 0) {
                animation_timer = setTimeout(() => this.setShowDialog(true), 200);
                navigation_timer = setTimeout(() => this.navigate("/"), 3000);
            } else {
                let sourcesName = this.mapSourcesToElement(response);
                this.setSources(sourcesName);
            }
        });

        return () => {
            clearTimeout(animation_timer);
            clearTimeout(navigation_timer);
        }
    }

    updateDate() {
        let today = new Date();
        let today_string = today.toISOString();
        today_string = today_string.slice(0, 10)
        this.setDate(today_string);
    }

    // istanbul ignore next
    async submitHandler(event: JSX.TargetedEvent<HTMLFormElement, Event>) {
        event.preventDefault();
        console.log(`handling submit`);
    }
}