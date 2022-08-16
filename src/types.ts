export interface Task {
  _id: string;
  description: string;
  creationDate: Date;
  dueDate: Date;
}

export interface Filters {
  content: string | null;
  dateRange: [Date, Date] | null;
  taskState: ["freed" | "expired" | "pending"] | null;
}
