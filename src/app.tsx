import { Box, CssBaseline, Grid, Paper } from "@mui/material";
import { type FC } from "react";
import { TestsControls } from "./components/tests-controls";
import { CodeArea } from "./components/code-area";
import { RunTestsButton } from "./components/run-tests-button";
import { SelectedTest } from "./components/selected-test";

export const App: FC = () => (
  <>
    <CssBaseline />
    <Grid container>
      <Grid size={8}>
        <CodeArea />
      </Grid>
      <Grid
        size={4}
        sx={{
          overflow: "auto",
          height: "100vh",
          p: 1,
        }}
      >
        <Paper
          sx={{
            position: "sticky",
            top: 0,
            p: 1,
            zIndex: 2,
          }}
        >
          <RunTestsButton />
          <TestsControls />
        </Paper>
        <Box
          sx={{
            p: 1,
            mt: 3,
          }}
        >
          <SelectedTest />
        </Box>
      </Grid>
    </Grid>
  </>
);
