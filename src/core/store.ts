import { Toast } from "./types";

const TOAST_LIMIT = 15;

export enum ActionType {
  ADD_TOAST,
  UPDATE_TOAST,
  UPSERT_TOAST,
  REMOVE_TOAST,
  DISMISS_TOAST,
  START_PAUSE,
  END_PAUSE,
}

type Action =
  | {
      type: ActionType.ADD_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.UPDATE_TOAST;
      toast: Pick<Toast, "id" | "height">;
    }
  | {
      type: ActionType.UPSERT_TOAST;
      toast: Toast;
    }
  | {
      type: ActionType.REMOVE_TOAST;
      toastId?: string;
    }
  | {
      type: ActionType.DISMISS_TOAST;
      toastId?: string;
    }
  | {
      type: ActionType.START_PAUSE;
      toastId: string;
    }
  | {
      type: ActionType.END_PAUSE;
      toastId: string;
    };

export const reducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case ActionType.ADD_TOAST:
      return [...state, { ...action.toast, paused: false }].slice(0, TOAST_LIMIT);

    case ActionType.UPDATE_TOAST:
      return state.map((toast) =>
        toast.id === action.toast.id ? { ...toast, ...action.toast } : toast,
      );

    case ActionType.UPSERT_TOAST:
      return reducer(state, {
        type: state.find((toast) => toast.id === action.toast.id)
          ? ActionType.UPDATE_TOAST
          : ActionType.ADD_TOAST,
        toast: action.toast,
      });

    case ActionType.REMOVE_TOAST:
      if (action.toastId === undefined) return [];
      return state.filter((toast) => toast.id !== action.toastId);

    case ActionType.DISMISS_TOAST:
      return state.map((toast) =>
        toast.id === action.toastId || toast.id === undefined
          ? {
              ...toast,
              dismissed: true,
            }
          : toast,
      );

    case ActionType.START_PAUSE:
      return state.map((toast) =>
        toast.id === action.toastId
          ? {
              ...toast,
              pausedAt: Date.now(),
              paused: true,
            }
          : toast,
      );

    case ActionType.END_PAUSE:
      return state.map((toast) =>
        toast.id === action.toastId
          ? {
              ...toast,
              paused: false,
            }
          : toast,
      );
  }
};
