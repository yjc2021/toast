import { createContext } from "react";
import { Toast } from "../../core/types";

type ToastHandlers = {
  createToast: (toast: Toast) => void;
  dismissToast: (toastId?: string) => void;
  pauseToast: (toastId: string) => void;
  resumeToast: (toastId: string) => void;
};
export const ToastContext = createContext<ToastHandlers>({} as ToastHandlers);
