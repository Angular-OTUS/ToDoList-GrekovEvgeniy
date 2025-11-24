export interface Task {
    title: string,
    description: string,
    id: number,
    status: TaskStatus,
}

export interface Toast {
    id: number,
    message: string,
}

export enum TaskStatus {
    SCHEDULED = "scheduled",
    IN_PROGRESS = "inProgress",
    COMPLETED = "completed",
}

export interface Description {
    value: string,
    alias: string,
}

export type SortedTasksByStatus = Record<TaskStatus, Task[]>
