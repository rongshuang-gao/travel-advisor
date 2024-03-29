import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "10px 10px 0px 10px",
    height: "100%",
    overflowY: "scroll",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    overflow: "auto",
  },
}));
