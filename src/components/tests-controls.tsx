import { Chip, Stack, type ChipProps } from "@mui/material";
import type { FC } from "react";
import { useAppStore } from "../model/app-store";
import type { Test } from "../types";

const getTestColor = (test: Test): ChipProps["color"] => {
  if (test.result === null) {
    return "default";
  }

  return test.result === test.expectedOutput ? "success" : "error";
};

export const TestsControls: FC = () => {
  const tests = useAppStore((state) => state.tests);
  const activeTestId = useAppStore((state) => state.selectedTestId);

  const addTest = useAppStore((state) => state.addTest);
  const deleteTest = useAppStore((state) => state.deleteTest);
  const resetTests = useAppStore((state) => state.resetTests);
  const selectTest = useAppStore((state) => state.selectTest);

  return (
    <Stack direction="row" gap={1} flexWrap="wrap" alignItems="center">
      {tests.map((test, index) => (
        <Chip
          key={test.id}
          label={`Test ${index + 1}`}
          onDelete={tests.length > 1 ? () => deleteTest(test.id) : undefined}
          onClick={() => selectTest(test.id)}
          variant={activeTestId === test.id ? "filled" : "outlined"}
          color={getTestColor(test)}
        />
      ))}
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Chip label="Add" color="primary" onClick={addTest} />
        <Chip label="Reset" color="primary" onClick={resetTests} />
      </Stack>
    </Stack>
  );
};
