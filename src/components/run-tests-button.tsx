import { Button } from "@mui/material";
import type { FC } from "react";

export const RunTestsButton: FC = () => (
  <Button
    variant="contained"
    color="success"
    sx={{
      mb: 2,
    }}
  >
    Run tests
  </Button>
);
