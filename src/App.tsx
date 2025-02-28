import { useState } from "react";
import "./App.css";
import { useToast } from "./core/toast";
import { ToastPosition } from "./core/types";

const options = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];
function App() {
  const { showToastMessage } = useToast();
  const [position, setPosition] = useState<ToastPosition>("top-center");
  const [delay, setDelay] = useState(3000);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex items-start gap-12">
        <div onChange={(e) => setPosition(e.target.value)}>
          <h3 className="text-xl font-bold">Position</h3>
          {options.map((option) => (
            <div key={option} className="mb-1 flex items-center space-x-2">
              <input type="radio" id={option} name="position" value={option} className="mr-2" />
              <label htmlFor={option} className="cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="delay" className="text-xl font-bold">
            Delay(ms)
          </label>
          <input
            type="number"
            id="delay"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="rounded-md border"
          />
        </div>
      </div>
      <button
        className="cursor-pointer"
        onClick={() => {
          showToastMessage("toast created", "default", position, delay);
        }}
      >
        add toast
      </button>
    </div>
  );
}

export default App;
