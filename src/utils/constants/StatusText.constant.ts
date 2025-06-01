import TodoStatus from "@/utils/enums/TodoStatus.enum";

const StatusText: Record<TodoStatus, string> = {
  [TodoStatus.PENDING]: "Pending",
  [TodoStatus.IN_PROGRESS]: "In Progress",
  [TodoStatus.COMPLETED]: "Completed"
};

export default StatusText;
