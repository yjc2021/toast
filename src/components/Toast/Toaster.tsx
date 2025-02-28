import { useToaster } from "../../core/useToaster";
import Toast from "./Toast";
import { ToastPosition } from "../../core/types";
import { ReactNode } from "react";
import { ToastContext } from "./ToastContext";

type ToasterProps = {
  position: ToastPosition;
  delay?: number;
  children?: ReactNode;
};

const getPositionStyle = (position: ToastPosition, offset: number): React.CSSProperties => {
  const top = position.includes("top");
  const verticalStyle: React.CSSProperties = top ? { top: 0 } : { bottom: 0 };
  const horizontalStyle: React.CSSProperties = position.includes("center")
    ? {
        justifyContent: "center",
      }
    : position.includes("right")
      ? {
          justifyContent: "flex-end",
        }
      : {};
  return {
    left: 0,
    right: 0,
    display: "flex",
    position: "absolute",
    transition: `all 230ms cubic-bezier(.21,1.02,.73,1)`,
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  };
};

function Toaster({ position, delay, children }: ToasterProps) {
  const { toasts, handlers } = useToaster({ position, delay });
  console.log(toasts);
  return (
    <ToastContext.Provider value={handlers}>
      <div className="fixed top-0 right-0 bottom-0 left-0 z-[9999]">
        {toasts.map((toast) => {
          const offset = handlers.calculateOffset(toast);
          return (
            <div id={toast.id} style={getPositionStyle(position, offset)} key={toast.id}>
              <Toast
                toast={toast}
                onClickClose={() => handlers.dismissToast(toast.id)}
                onMouseEnter={() => handlers.pauseToast(toast.id)}
                onMouseLeave={() => handlers.resumeToast(toast.id)}
              />
            </div>
          );
        })}
        {children}
      </div>
    </ToastContext.Provider>
  );
}

export default Toaster;
