import { Chip, Stack } from "@mui/material";
import type { FC } from "react";
import { useAppStore } from "../model/app-store";

export const TestsControls: FC = () => {
  const tests = useAppStore((state) => state.tests);
  const activeTestId = useAppStore((state) => state.activeTestId);

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
        />
      ))}
      <Stack direction="row" gap={1} flexWrap="wrap">
        <Chip label="Add" color="primary" onClick={addTest} />
        <Chip label="Reset" color="primary" onClick={resetTests} />
      </Stack>
    </Stack>
  );
};
