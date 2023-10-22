import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Incrementar</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Decrementar</button>
      <button onClick={() => localStorage.setItem("cooking", count.toString())}>
        Guardar
      </button>
    </div>
  );
};

const About = () => {
  const [count, setCount] = useState<number>(0);

  const handleListener = (event: StorageEvent) => {
    if (event.key === "cooking") {
      setCount(event.newValue ? parseInt(event.newValue) : 0);
    }
    console.log(event);
  };

  useEffect(() => {
    window.addEventListener("storage", handleListener);
    return () => {
      window.removeEventListener("storage", handleListener);
    };
  }, []);

  return <div>El contador es {count}</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <About />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
