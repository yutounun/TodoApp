import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { QueryClient } from "@tanstack/react-query";

// Vitestのexpectにjest-domのmatchersを追加
expect.extend(matchers);

afterEach(() => {
  cleanup();
});

export const queryClient = new QueryClient();
