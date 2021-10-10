import "./App.css";
import URLForm from "./components/URLForm";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  appBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
  },
  footer: {
    backgroundColor: "#333",
    color: "white",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  content: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5">URL Shortener</Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <div className={classes.content}>
        <URLForm />
      </div>
      {/* <Dashboard /> */}
      <div className={classes.footer}>
        <span className="font-weight-bold">
          Made with ❤️ and passion by{" "}
          <a
            style={{ color: "#03a9f4", textDecoration: "none" }}
            href="https://www.linkedin.com/in/saiphani1998/"
          >
            Phani
          </a>
        </span>
      </div>
    </div>
  );
}

export default App;
