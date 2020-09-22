export interface Measure {
    id?: number;
    name?: string;
    deleted: boolean;
}

// URLs
export enum MeasureURL {
    BASE = 'measure',
    LIST = 'list'
}
