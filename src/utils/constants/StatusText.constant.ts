import TodoStatus from "@/utils/enums/TodoStatus.enum";

const StatusText: Record<TodoStatus, string> = {
  [TodoStatus.PENDING]: "Pendiente",
  [TodoStatus.IN_PROGRESS]: "En progreso",
  [TodoStatus.COMPLETED]: "Completado"
};

export default StatusText;
