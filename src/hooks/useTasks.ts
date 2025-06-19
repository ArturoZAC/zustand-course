import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";


export const useTasks = ( status: TaskStatus) => {
  
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { value, isConfirmed } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Deben de ingresar un nombre para la tarea";
        }
      },
    });

    if (!isConfirmed) return;
    addTask(value, status);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return {
    isDragging,
    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
