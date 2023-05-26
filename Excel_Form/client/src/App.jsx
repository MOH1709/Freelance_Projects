import { makeStyles } from "@material-ui/core";

//----------------------------------------> custom imports
import Router from "./Router";
// import { COLOR } from "./theme";

export default function App() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <img src="/MS.png" alt="MS University" className={styles.img} />
      <Router />
    </div>
  );
}

//-------------------------------------------> custom styles
const useStyles = makeStyles({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLOR.primary,
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    opacity: 0.9,
    objectFit: "cover",
  }
});