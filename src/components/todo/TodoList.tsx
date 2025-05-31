"use client";

import TodoCard from "@/components/todo/TodoCard";
import TodoStatus from "@/utils/enums/TodoStatus.enum";

export default function TodoList() {
  const handleEdit = (id: string) => {
    // TODO: Implementar la lógica de edición
    console.log("Editando tarea:", id);
  };

  return (
    <div className="space-y-4">
      <TodoCard
        title="Implementar autenticación"
        description="Agregar sistema de autenticación con JWT y manejo de sesiones"
        date={new Date()}
        status={TodoStatus.IN_PROGRESS}
        onEdit={() => handleEdit("1")}
      />
      <TodoCard
        title="Diseñar base de datos"
        description="Crear el esquema de la base de datos para el sistema de tareas"
        date={new Date()}
        status={TodoStatus.PENDING}
        onEdit={() => handleEdit("2")}
      />
      <TodoCard
        title="Configurar CI/CD"
        description="Implementar pipeline de integración y despliegue continuo"
        date={new Date()}
        status={TodoStatus.COMPLETED}
        onEdit={() => handleEdit("3")}
      />
    </div>
  );
}