import { useNavigate, useLocation, type NavigateFunction, type Location } from 'react-router-dom';
import DatabaseService from "../services/database.service";
import type { VNode as Element } from "preact";
import type { JSX } from "preact/jsx-runtime";
import { useState, useEffect } from 'preact/hooks';

export default class AddTransactionController {
    private navigate!: NavigateFunction;

    private location!: Location;

    lendOrBorrow!: boolean;
    private setLendOrBorrow!: Setter<boolean>;

    categories!: Array<Element>;
    private setCategories!: Setter<Array<Element>>;

    entities!: Array<Element>;
    private setEntities!: Setter<Array<Element>>;

    sources!: Array<Element>;
    private setSources!: Setter<Array<Element>>;

    loading!: boolean;
    private setLoading!: Setter<boolean>;

    date!: string;
    private setDate!: Setter<string>;

    showDialog!: boolean;
    private setShowDialog!: Setter<boolean>;

    // istanbul ignore next
    initHooks() {
        this.navigate = useNavigate();
        this.location = useLocation();

        [this.sources, this.setSources] = useState<Array<Element>>([]);
        [this.categories, this.setCategories] = useState<Array<Element>>([]);
        [this.entities, this.setEntities] = useState<Array<Element>>([]);
        [this.lendOrBorrow, this.setLendOrBorrow] = useState(false);
        [this.loading, this.setLoading] = useState(false);
        [this.date, this.setDate] = useState<string>("");
        [this.showDialog, this.setShowDialog] = useState(false);

        this.setLoading(false);

        // set the date field to today's date by default
        useEffect(() => {
            this.loadFromDB();
            this.updateDate();
        }, []);

        this.validateNavigation();
    }

    async loadFromDB() {
        this.setLoading(true);

        const sourcesResponse = await DatabaseService.getSourcesName();
        this.validateSources(sourcesResponse);

        let sourcesName = this.mapSourcesToElement(sourcesResponse);
        this.setSources(sourcesName);

        const categoriesName = await DatabaseService.getCategoriesName();
        this.setCategories(categoriesName);

        const entitiesName = await DatabaseService.getEntitiesName();
        this.setEntities(entitiesName);

        this.setLoading(false);
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

    validateSources(response: Array<SourceName>) {
        let animation_timer: NodeJS.Timeout;
        let navigation_timer: NodeJS.Timeout;

        if (response.length == 0) {
            animation_timer = setTimeout(() => this.setShowDialog(true), 200);
            navigation_timer = setTimeout(() => this.navigate("/"), 3000);
        }

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
    submitHandler(event: JSX.TargetedEvent<HTMLFormElement, Event>) {
        event.preventDefault();
        console.log(`handling submit`);
    }

    lendOrBorrowHandler(event: Event) {
        const checkbox = event.target as HTMLInputElement;

        if (checkbox.checked) {
            console.log(`setting lendOrBorrow to true`);
            this.setLendOrBorrow(true);
        } else {
            this.setLendOrBorrow(false);
        }
    }
}