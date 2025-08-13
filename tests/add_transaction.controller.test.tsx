import AddTransactionController from "../src/controller/add_transaction.controller";
import DatabaseService from "../src/services/database.service";


const addTransactionController = new AddTransactionController();

test("updateDate", () => {
    let date = '';
    
    (addTransactionController as any).setDate = (val: string) => { date = val; };
    
    addTransactionController.updateDate();
    
    const today = new Date();
    const todayStr = today.toISOString().slice(0, 10);
    
    expect(date).toMatch(todayStr);
});

test("validateSources: Empty array response", async () => {
    jest.useFakeTimers();

    jest.spyOn(DatabaseService, "getTransactions").mockResolvedValue([]);
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

test("validateSources: Non-empty array response", async() => {
    jest.useFakeTimers();

    jest.spyOn(DatabaseService, "getTransactions").mockResolvedValue([{ id: 1 }]);

    (addTransactionController as any).setShowDialog = jest.fn();
    (addTransactionController as any).navigate = jest.fn();

    const cleanup = addTransactionController.validateSources();

    await Promise.resolve();

    expect((addTransactionController as any).setShowDialog).not.toHaveBeenCalled();
    expect((addTransactionController as any).navigate).not.toHaveBeenCalled();

    cleanup();

    jest.useRealTimers();
});