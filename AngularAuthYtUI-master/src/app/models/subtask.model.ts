export interface Subtask {
    id: number;
    name: string;
    description: string;
    isCompleted: boolean;
    taskPriority:Priority;
  }
  export enum Priority {
    Urgent = 'Urgent',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
  }