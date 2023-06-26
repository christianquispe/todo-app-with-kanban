import   "./styles.css";

// import { KeyboardEventHandler } from "react";
import { useForm } from "react-hook-form";

import { useTasks } from "../context/TaskProvider";

interface InputCreateTaskInputs {
  name: string;
}

export default function InputCreateTask() {
  const { register, handleSubmit } = useForm<InputCreateTaskInputs>();
  const { addTask } = useTasks();

  // const handleKeyDown: KeyboardEventHandler = (e) => {
  //   if (e.key === "Enter") {
  //     addTask({ name });
  //   }
  // };

  const submit = ( values : InputCreateTaskInputs) => {
    addTask({name: values.name})
  };

  return (
    <form className="InputCreateTaskForm" onSubmit={handleSubmit(submit)}>
      <input className="InputCreateTask" type="text" placeholder="Add new task..." {...register("name", { required: true })} />
    </form>
  );
}
