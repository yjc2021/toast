import { ComponentProps } from "react";
import type { Toast } from "../../core/types";
import { cn } from "../../utils/tailwind";

type ToastProps = {
  toast: Toast;
  onClickClose: () => void;
} & ComponentProps<"div">;

// const enterAnimation = (factor: number) => `
// 0% {transform: translate3d(0,${factor * -200}%,0) scale(.6); opacity:.5;}
// 100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
// `;

// const exitAnimation = (factor: number) => `
// 0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
// 100% {transform: translate3d(0,${factor * -150}%,-1px) scale(.6); opacity:0;}
// `;

// const getAnimationStyle = (
//   position: Toast["position"],
//   dismissed: boolean,
// ): React.CSSProperties => {
//   const top = position.includes("top");
//   const factor = top ? 1 : -1;

//   return {
//     animation: !dismissed
//       ? `${enterAnimation(factor)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`
//       : `${exitAnimation(factor)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`,
//   };
// };

function Toast({ toast, onClickClose, ...props }: ToastProps) {
  const { message } = toast;

  return (
    <div
      className={cn("h-[80px] rounded-md bg-gray-400 p-4")}
      // style={{
      //   ...getAnimationStyle(position, dismissed),
      // }}
      {...props}
    >
      <button onClick={onClickClose}>CLOSE</button>
      {message}
    </div>
  );
}

export default Toast;
