import { Subtask } from "./subtask.model";

export interface Task {
    id: number;
    name: string;
    description: string;
    taskCategory: string;
    isCompleted: boolean;
    bookmark: boolean;
    subtasks?: Subtask[];
  }
  