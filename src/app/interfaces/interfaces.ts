export interface TaskForCreate {
    tittle: string,
    description: string,
}

export interface Task extends TaskForCreate {
    id: number,
    status: TaskStatus,
}

export interface Toast {
    id: number,
    message: string,
}

export enum TaskStatus {
    IN_PROGRESS = "InProgress",
    COMPLETED = "Completed",
}

export type TaskFilterOption = TaskStatus | "All"

export interface TaskFilterDescription {
    value: TaskFilterOption,
    alias: string
}