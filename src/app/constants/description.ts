import { Description, TaskStatus } from "../interfaces/interfaces";

export const descTaskStatus = new Map<TaskStatus, string>([
    [TaskStatus.SCHEDULED, "Запланировано"],
    [TaskStatus.IN_PROGRESS, "В процессе"],
    [TaskStatus.COMPLETED, "Завершено"],
])

  export const descMainLayoutLinks: Description[] = [
    {value: "board", alias: "Доска задач"},
    {value: "backlog", alias: "Редактор"},
  ];