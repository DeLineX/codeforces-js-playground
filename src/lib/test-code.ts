import type { Test } from "../types";

const runTest = (code: string, test: Test) => {
  const resume = () => {};
  const setEncoding = () => {};

  type EventTypes = "data" | "end";

  type EventCallback = (data: string) => void;

  const callbacksMap: Record<EventTypes, EventCallback[]> = {
    data: [],
    end: [],
  };

  const on = (event: EventTypes, cb: (data: string) => void) => {
    callbacksMap[event].push(cb);
  };

  const trigger = (event: EventTypes, data: string) => {
    callbacksMap[event].forEach((cb) => cb(data));
  };

  const stdin = {
    resume,
    setEncoding,
    on,
    trigger,
  };

  const process = { stdin };

  let result = "";

  const log = (...args: unknown[]) => {
    result += `${args.join(" ")}\n`;
  };

  const console = { log };

  eval(code);

  process.stdin.trigger("data", test.input);
  process.stdin.trigger("end", "");

  console.log();
  result = result.slice(0, -1);

  return result;
};

export const testCode = (code: string, tests: Test[]) =>
  tests.map((test) => runTest(code, test));
