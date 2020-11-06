import { Theme } from "@material-ui/core";
import { CreateCSSProperties } from "@material-ui/core/styles/withStyles";

export const headerBar = (theme: Theme): CreateCSSProperties => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  fontWeight: "bold",
  backgroundImage: "url(/images/themes/header.png)",
});
