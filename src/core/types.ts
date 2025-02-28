export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export type Toast = {
  type?: "success" | "error" | "warning" | "loading" | "default";
  icon?: React.ReactElement;
  id: string;
  delay?: number;
  pausedAt?: number;
  paused?: boolean;
  message: string;
  position: ToastPosition;
  createdAt: number;
  dismissed: boolean;
  height?: number;
};

export type ToasterOptions = {
  position: ToastPosition;
  delay?: number;
};
