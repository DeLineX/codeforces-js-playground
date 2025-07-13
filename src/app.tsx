import { Editor, type EditorProps } from "@monaco-editor/react";
import { Box, Button, CssBaseline, Grid } from "@mui/material";
import { type FC } from "react";
import { useAppStore } from "./model/app-store";
import { TestsControls } from "./components/tests-controls";

export const App: FC = () => {
  const code = useAppStore((state) => state.code);
  const activeTestId = useAppStore((state) => state.activeTestId);

  const changeCode = useAppStore((state) => state.changeCode);

  const handleEditorChange: EditorProps["onChange"] = (value) => {
    if (value) {
      changeCode(value);
    }
  };

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid size={8}>
          <Editor
            height="100vh"
            language="javascript"
            value={code}
            onChange={handleEditorChange}
          />
        </Grid>
        <Grid size={4}>
          <Box p={2}>
            <Button
              variant="contained"
              color="success"
              sx={{
                mb: 2,
              }}
            >
              Run tests
            </Button>
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
