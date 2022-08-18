export interface Task {
  _id: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
  done: boolean;
}

export interface Filters {
  content: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  taskState: string[];
}
