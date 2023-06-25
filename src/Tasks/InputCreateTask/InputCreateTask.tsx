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

  const submit = ({ name }: InputCreateTaskInputs) => {
    addTask({ name });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" {...register("name", { required: true })} />
    </form>
  );
}
