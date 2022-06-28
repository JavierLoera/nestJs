export interface Itask {
    task: string;
    description: string;
    state: state.active;
}
declare enum state {
    active = "ACTIVE",
    completed = "COMPLETED"
}
export {};
