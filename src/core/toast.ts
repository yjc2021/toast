import { useContext } from "react";
import { Toast } from "./types";
import { ToastContext } from "../components/Toast/ToastContext";

const createToastId = (() => {
  let toastCount = 0;
  return () => (++toastCount).toString();
})();
const createToastInfo = (
  type: Toast["type"] = "default",
  message: string,
  position?: Toast["position"],
  delay?: number,
): Toast => ({
  message,
  id: createToastId(),
  createdAt: Date.now(),
  type,
  dismissed: false,
  position: position || "top-center",
  delay,
});

export const useToast = () => {
  const { createToast, dismissToast } = useContext(ToastContext);

  const showToastMessage = (
    message: string,
    type: Toast["type"],
    position?: Toast["position"],
    delay?: number,
  ) => {
    const toast = createToastInfo(type, message, position, delay);
    createToast(toast);
  };
  return {
    showToastMessage,
    dismissAllToastMessages: () => dismissToast(),
  };
};
