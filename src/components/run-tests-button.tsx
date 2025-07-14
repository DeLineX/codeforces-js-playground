import { Button } from "@mui/material";
import type { FC } from "react";
import { testCode } from "../lib/test-code";
import { useAppStore } from "../model/app-store";
import type { Test } from "../types";

export const RunTestsButton: FC = () => {
  const code = useAppStore((state) => state.code);
  const tests = useAppStore((state) => state.tests);
  const changeTests = useAppStore((state) => state.changeTests);

  const handleRunTests = () => {
    const results = testCode(code, tests);

    const newTests: Test[] = [];

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      const result = results[i];

      newTests.push({ ...test, result });
    }

    changeTests(newTests);
  };

  return (
    <Button
      variant="contained"
      color="success"
      sx={{
        mb: 2,
      }}
      onClick={handleRunTests}
    >
      Run tests
    </Button>
  );
};
