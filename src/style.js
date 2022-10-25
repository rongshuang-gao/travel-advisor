import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "0px",
    height: "100vh",
    position: "absolute",
    top: "0",
    left: "0",
    paddingTop: "64px",
    zIndex: "-100",
  },
  item: {
    padding: "0px !important",
    height: "100%",
    overflowY: "scroll",
  },
}));
