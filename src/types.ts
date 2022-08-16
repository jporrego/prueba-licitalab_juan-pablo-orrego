export interface Task {
  _id: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
}

export interface Filters {
  content: string;
  dateRange: Date[];
  taskState: string[];
}
