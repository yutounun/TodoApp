import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Vitestのexpectにjest-domのmatchersを追加
expect.extend(matchers as any);

afterEach(() => {
  cleanup();
});
