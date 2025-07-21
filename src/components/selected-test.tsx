import { type FC } from "react";
import { useAppStore } from "../model/app-store";
import {
  Box,
  Button,
  TextField,
  Tooltip,
  type TextFieldProps,
} from "@mui/material";

export const SelectedTest: FC = () => {
  const selectedTest = useAppStore((state) =>
    state.tests.find((test) => test.id === state.selectedTestId)
  );
  const isResultInputCollapsed = useAppStore(
    (state) => state.isResultInputCollapsed
  );

  const changeSelectedTest = useAppStore((state) => state.changeSelectedTest);
  const toggleIsResultInputCollapsed = useAppStore(
    (state) => state.toggleIsResultInputCollapsed
  );

  if (!selectedTest) {
    return "Test isn't selected!";
  }

  const renderNotStartedTest = () => {
    const handleChangeInput: TextFieldProps["onChange"] = (e) => {
      changeSelectedTest({ input: e.currentTarget.value });
    };

    const handleChangeOutput: TextFieldProps["onChange"] = (e) => {
      changeSelectedTest({ expectedOutput: e.currentTarget.value });
    };

    return (
      <>
        <TextField
          label="Input"
          multiline
          fullWidth
          value={selectedTest.input}
          onChange={handleChangeInput}
        />
        <TextField
          sx={{
            mt: 4,
          }}
          label="Expected output"
          multiline
          fullWidth
          value={selectedTest.expectedOutput}
          onChange={handleChangeOutput}
        />
      </>
    );
  };

  const renderTestResult = () => {
    if (selectedTest.result === null) return;

    const handleEditTest = () => {
      changeSelectedTest({ result: null });
    };

    const expectedOutputLines = selectedTest.expectedOutput.split("\n");
    const resultLines = selectedTest.result.split("\n");

    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button size="small" onClick={toggleIsResultInputCollapsed}>
            {isResultInputCollapsed ? "Expand" : "Collapse"} input
          </Button>
          <Button size="small" onClick={handleEditTest}>
            Edit
          </Button>
        </Box>
        <TextField
          maxRows={isResultInputCollapsed ? 1 : undefined}
          label="Input"
          multiline
          fullWidth
          value={selectedTest.input}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{
            mt: 1,
          }}
        />
        <Box
          sx={{
            mt: 2,
          }}
        >
          Result
        </Box>
        {resultLines.map((resultLine, index) => {
          const expectedLine: string | undefined = expectedOutputLines[index];
          const isLinesEqual = resultLine === expectedLine;

          return (
            <Box key={index}>
              <Tooltip
                title={
                  expectedLine !== undefined
                    ? `Expected: ${expectedLine}`
                    : "Not expected"
                }
                placement="left"
              >
                <span style={{ color: isLinesEqual ? "green" : "red" }}>
                  {resultLine} {isLinesEqual}
                </span>
              </Tooltip>
            </Box>
          );
        })}
        {expectedOutputLines
          .slice(resultLines.length - 1)
          .map((expectedLine, index) => (
            <Tooltip title="Not in result" placement="left" key={index}>
              <Box color="lightgray">{expectedLine}</Box>
            </Tooltip>
          ))}
        <TextField
          label="Expected output"
          multiline
          fullWidth
          value={selectedTest.expectedOutput}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{
            mt: 2,
          }}
        />
      </>
    );
  };

  return selectedTest.result === null
    ? renderNotStartedTest()
    : renderTestResult();
};
