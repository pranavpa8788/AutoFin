export {};

declare global {
    type Source = {
        id: Number;
        name: String;
        type: String;
        balance: Number;
        interest_rate: Number;
        description: String;
    }

    type SourceName = {
        name: String;
        type: String;
    }

    type CategoryName = {
        name: String;
    }

    type EntityName = {
        name: String;
    }
    type Setter<T> = Dispatch<StateUpdater<T>>
}