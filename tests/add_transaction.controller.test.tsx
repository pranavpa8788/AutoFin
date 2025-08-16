import AddTransactionController from "../src/controller/add_transaction.controller";
import DatabaseService from "../src/services/database.service";
import { useLocation } from "react-router-dom";

let addTransactionController: AddTransactionController;

beforeEach(() => {
    addTransactionController = new AddTransactionController();
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

            (addTransactionController as any).navigate = jest.fn();
            (addTransactionController as any).location = useLocation();

            addTransactionController.validateNavigation();

            expect((addTransactionController as any).navigate).toHaveBeenCalledWith("/");
        });

        test("validateNavigation: With null location.state", () => {
            (useLocation as jest.Mock).mockReturnValue({
                state: null
            });

            (addTransactionController as any).navigate = jest.fn();
            (addTransactionController as any).location = useLocation();

            addTransactionController.validateNavigation();

            expect((addTransactionController as any).navigate).toHaveBeenCalledWith("/");
        });

        test("validateNavigation: With valid location.state", () => {
            (useLocation as jest.Mock).mockReturnValue({
                state: "homepage"
            });

            (addTransactionController as any).navigate = jest.fn();
            (addTransactionController as any).location = useLocation();

            addTransactionController.validateNavigation();

            expect((addTransactionController as any).navigate).not.toHaveBeenCalled();
        });

    });

    describe("validateSources", () => {

        test("validateSources: Non-empty array response", async() => {
            jest.useFakeTimers();

            jest.spyOn(DatabaseService, "getSources").mockResolvedValue([{ id: 1 }]);

            (addTransactionController as any).setShowDialog = jest.fn();
            (addTransactionController as any).navigate = jest.fn();

            const cleanup = addTransactionController.validateSources();

            await Promise.resolve();

            expect((addTransactionController as any).setShowDialog).not.toHaveBeenCalled();
            expect((addTransactionController as any).navigate).not.toHaveBeenCalled();

            cleanup();

            jest.useRealTimers();
        });

        test("validateSources: Empty array response", async () => {
            jest.useFakeTimers();

            jest.spyOn(DatabaseService, "getSources").mockResolvedValue([]);
            (addTransactionController as any).setShowDialog = jest.fn();
            (addTransactionController as any).navigate = jest.fn();

            const cleanup = addTransactionController.validateSources();

            await Promise.resolve();

            jest.advanceTimersByTime(200);
            expect((addTransactionController as any).setShowDialog).toHaveBeenCalledWith(true);

            jest.advanceTimersByTime(2800);
            expect((addTransactionController as any).navigate).toHaveBeenCalledWith("/");

            cleanup();

            jest.useRealTimers();
        });

    });

    test("updateDate", () => {
        let date = '';
        
        (addTransactionController as any).setDate = (val: string) => { date = val; };
        
        addTransactionController.updateDate();
        
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        
        expect(date).toMatch(todayStr);
    });

});