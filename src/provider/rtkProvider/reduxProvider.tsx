"use client";
import { store } from "@/store/store";
import { Provider } from "react-redux";

type ReduxProvider = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: ReduxProvider) {
  return <Provider store={store}>{children}</Provider>;
}
