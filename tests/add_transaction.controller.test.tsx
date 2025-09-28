import AddTransactionController from "../src/controller/add_transaction.controller";
import DatabaseService from "../src/services/database.service";
import { useLocation } from "react-router-dom";

let addTransactionController: any;

let sourcesName: Array<SourceName> = [{ name: "Bank A", type: "" }, { name: "Bank B", type: "" }];
let categoriesName: Array<CategoryName> = [{ name: "Food" }, { name: "Travel" }];
let entitiesName: Array<EntityName> = [{ name: "Bob" }, { name: "Alex" }];

beforeEach(() => {
    addTransactionController = new AddTransactionController();
    addTransactionController.setSources = jest.fn();
    addTransactionController.setCategories = jest.fn();
    addTransactionController.setEntities = jest.fn();
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn()
}));

describe("AddTransactionControllerTests", () => {

    describe("validateNavigation", () => {

        test("validateNavigation: With invalid location.state", () => {
            (useLocation as jest.Mock).mockReturnValue({
                state: "invalid"
            });

            addTransactionController.navigate = jest.fn();
            addTransactionController.location = useLocation();

            addTransactionController.validateNavigation();

            expect(addTransactionController.navigate).toHaveBeenCalledWith("/");
        });

        test("validateNavigation: With null location.state", () => {
            (useLocation as jest.Mock).mockReturnValue({
                state: null
            });

            addTransactionController.navigate = jest.fn();
            addTransactionController.location = useLocation();

            addTransactionController.validateNavigation();

            expect(addTransactionController.navigate).toHaveBeenCalledWith("/");
        });

        test("validateNavigation: With valid location.state", () => {
            (useLocation as jest.Mock).mockReturnValue({
                state: "homepage"
            });

            addTransactionController.navigate = jest.fn();
            addTransactionController.location = useLocation();

            addTransactionController.validateNavigation();

            expect(addTransactionController.navigate).not.toHaveBeenCalled();
        });

    });

    describe("validateSources", () => {

        test("validateSources: Non-empty array response", async() => {
            jest.useFakeTimers();


            addTransactionController.setShowDialog = jest.fn();
            addTransactionController.navigate = jest.fn();

            const cleanup = addTransactionController.validateSources(sourcesName);

            expect(addTransactionController.setShowDialog).not.toHaveBeenCalled();
            expect(addTransactionController.navigate).not.toHaveBeenCalled();
                
            cleanup();

            jest.useRealTimers();
        });

        test("validateSources: Empty array response", async () => {
            jest.useFakeTimers();

            addTransactionController.setShowDialog = jest.fn();
            addTransactionController.navigate = jest.fn();

            const cleanup = addTransactionController.validateSources([]);

            jest.advanceTimersByTime(200);
            expect(addTransactionController.setShowDialog).toHaveBeenCalledWith(true);

            jest.advanceTimersByTime(2800);
            expect(addTransactionController.navigate).toHaveBeenCalledWith("/");

            cleanup();

            jest.useRealTimers();
        });

    });

    test("updateDate", () => {
        let date = '';
        
        addTransactionController.setDate = (val: string) => { date = val; };
        
        addTransactionController.updateDate();
        
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        
        expect(date).toMatch(todayStr);
    });

    test("loadFromDB", async () => {
        addTransactionController.setLoading = jest.fn();

        DatabaseService.getSourcesName = jest.fn().mockResolvedValue(sourcesName);
        DatabaseService.getCategoriesName = jest.fn().mockResolvedValue(categoriesName);
        DatabaseService.getEntitiesName = jest.fn().mockResolvedValue(entitiesName);
        addTransactionController.validateSources = jest.fn();

        await addTransactionController.loadFromDB();

        expect(addTransactionController.setLoading).toHaveBeenCalledWith(true);

        expect(DatabaseService.getSourcesName).toHaveBeenCalledTimes(1);
        expect(addTransactionController.validateSources).toHaveBeenCalledWith(sourcesName);

        let sourcesNameMapped = addTransactionController.mapSourcesToElement(sourcesName);
        const [actualSources] = addTransactionController.setSources.mock.calls[0];
        expect(actualSources).toHaveLength(sourcesNameMapped.length);
        actualSources.forEach((element: any, index: number) => {
            expect(element.key).toBe(sourcesNameMapped[index].key);
            expect(element.props.children).toBe(sourcesNameMapped[index].props.children);
            expect(element.type).toBe("option");
        });

        expect(addTransactionController.setCategories).toHaveBeenCalledWith(categoriesName);

        expect(addTransactionController.setEntities).toHaveBeenCalledWith(entitiesName);

        expect(addTransactionController.setLoading).toHaveBeenCalledWith(false);
    });

});