import { type FC } from "react";
import { useAppStore } from "../model/app-store";
import { Grid, TextField, type TextFieldProps } from "@mui/material";

export const SelectedTest: FC = () => {
  const selectedTest = useAppStore((state) =>
    state.tests.find((test) => test.id === state.selectedTestId)
  );
  const changeTest = useAppStore((state) => state.changeSelectedTest);

  if (!selectedTest) {
    return "Test isn't selected!";
  }

  const handleChangeInput: TextFieldProps["onChange"] = (e) => {
    changeTest({ input: e.currentTarget.value });
  };

  const handleChangeOutput: TextFieldProps["onChange"] = (e) => {
    changeTest({ output: e.currentTarget.value });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={6}>
          <TextField
            label="Input"
            multiline
            fullWidth
            value={selectedTest.input}
            onChange={handleChangeInput}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Expected output"
            multiline
            fullWidth
            value={selectedTest.output}
            onChange={handleChangeOutput}
          />
        </Grid>
      </Grid>
    </>
  );
};
