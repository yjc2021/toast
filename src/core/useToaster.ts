import { useCallback, useEffect, useReducer } from "react";
import { Toast, ToasterOptions } from "./types";
import { ActionType, reducer } from "./store";

const REMOVE_DELAY = 0;

const dismissedToasts = new Map<Toast["id"], ReturnType<typeof setTimeout>>();

export function useToaster({ delay, position }: ToasterOptions) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const createToast = (toast: Toast) => {
    dispatch({
      type: ActionType.UPSERT_TOAST,
      toast: { ...toast, position, delay },
    });
  };
  const removeToast = (toastId: string) => {
    dispatch({ type: ActionType.REMOVE_TOAST, toastId });
  };
  const dismissToast = (toastId?: string) => {
    dispatch({ type: ActionType.DISMISS_TOAST, toastId });
  };
  const pauseToast = (toastId: string) => {
    dispatch({ type: ActionType.START_PAUSE, toastId });
  };
  const resumeToast = (toastId: string) => {
    dispatch({ type: ActionType.END_PAUSE, toastId });
  };

  const addToRemove = useCallback((toastId: string, removeDelay = REMOVE_DELAY) => {
    if (dismissedToasts.has(toastId)) return;

    const timeoutId = setTimeout(() => {
      dismissedToasts.delete(toastId);
      removeToast(toastId);
    }, removeDelay);

    dismissedToasts.set(toastId, timeoutId);
  }, []);

  const calculateOffset = useCallback(
    (toast: Toast) => {
      const relevantToasts = toasts.filter((t) => t.position === toast.position);
      const toastIndex = relevantToasts.findIndex((t) => t.id === toast.id);
      const toastsBefore = relevantToasts.filter(
        (toast, i) => i < toastIndex && !toast.dismissed,
      ).length;
      const offset = relevantToasts
        .filter((t) => !t.dismissed)
        .slice(...[0, toastsBefore])
        .reduce((acc) => acc + 80 + 8, 0);

      return offset;
    },
    [toasts],
  );

  useEffect(() => {
    console.log(toasts);
    const timeouts: number[] = [];
    const now = Date.now();
    toasts.forEach((toast) => {
      if (toast.delay === undefined) return;
      if (toast.paused) return;

      const delayLeft =
        toast.delay - (now - toast.createdAt) + (toast.pausedAt ? now - toast.pausedAt : 0);

      if (delayLeft <= 0) {
        if (!toast.dismissed) dismissToast(toast.id);
      } else {
        timeouts.push(setTimeout(() => dismissToast(toast.id), delayLeft));
      }
    });

    return () => timeouts.forEach(clearTimeout);
  }, [toasts]);

  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.dismissed) {
        addToRemove(toast.id);
      }
    });
  }, [toasts, addToRemove]);

  return {
    toasts,
    handlers: {
      createToast,
      dismissToast,
      pauseToast,
      resumeToast,
      calculateOffset,
    },
  };
}
