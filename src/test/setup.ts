import "@testing-library/jest-dom";
import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { QueryClient } from "@tanstack/react-query";

// add jest-dom matchers to Vitest's expect
expect.extend(matchers);

afterEach(() => {
  cleanup();
  queryClient.clear(); // clear cache
});

// setup for test
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity, // keep data fresh
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

// setup for global fetch mock
vi.stubGlobal("fetch", vi.fn());
