export class PriceSuggestion {
    [key: string]: Condition;
}

interface Condition {
    currency: string;
    value: number;
}
