import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { renderHook } from "@testing-library/react";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const renderHookWithClient = <T,>(hook: () => T) => {
  return renderHook(hook, {
    wrapper: createWrapper(),
  });
};
