import { Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/core/styles/withStyles";

export const cardHeader = (theme: Theme): CreateCSSProperties => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: "bold",
});

export const cardFooter = (theme: Theme): CreateCSSProperties => ({
  justifyContent: "center",
  backgroundColor: theme.palette.background.default,
  fontStyle: "italic",
});
