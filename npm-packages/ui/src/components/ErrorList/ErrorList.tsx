import { makeStyles } from "@material-ui/core/styles";
import { IApiError } from "@openworkshop/lib/api/ApiCall";
import React from "react";

const useStyles = makeStyles((theme) => ({
  errorsList: {
    listStyleType: "none",
    color: theme.palette.error.main,
    margin: 0,
    padding: 0,
    marginTop: 2,
    fontStyle: "italic",
  },
}));

interface IApiErrorListProps {
  apiErrors?: Array<IApiError>;
  errorMessages?: Array<string>;
}

const ErrorList: React.FunctionComponent<IApiErrorListProps> = (props) => {
  const classes = useStyles();

  return (
    <ul className={classes.errorsList}>
      {props.apiErrors &&
        props.apiErrors.map((err) => {
          return <li key={err.message}>{err.message}</li>;
        })}
      {props.errorMessages &&
        props.errorMessages.map((msg) => {
          return <li key={msg}>{msg}</li>;
        })}
    </ul>
  );
};

export default ErrorList;
