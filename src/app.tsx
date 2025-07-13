import { Box, CssBaseline, Grid } from "@mui/material";
import { type FC } from "react";
import { useAppStore } from "./model/app-store";
import { TestsControls } from "./components/tests-controls";
import { CodeArea } from "./components/code-area";
import { RunTestsButton } from "./components/run-tests-button";

export const App: FC = () => {
  const activeTestId = useAppStore((state) => state.activeTestId);

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid size={8}>
          <CodeArea />
        </Grid>
        <Grid size={4}>
          <Box p={2}>
            <RunTestsButton />
            <TestsControls />
          </Box>
          <Box
            sx={{
              mt: 5,
            }}
          >
            active test id: {activeTestId}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
