import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom imports
import { Button } from "../components";
import { useEffect } from "react";

export default function Error() {
  const styles = useStyles();
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate("/Freelance_Projects");
  // }, [])

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>THE MAHARAJA SAYAJIRAO UNIVERSITY OF VADODARA</h3>
      <img className={styles.logo} src="/ms_logo.png" alt="Maharaja Sayajirao University" />
      <Button text={"Go To Form"} onClick={() => {
        navigate("/Freelance_Projects");
      }} />
    </div>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    display: "none",
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    color: "rgb(29, 144, 245)",
    textAlign: "center",
  },
  logo: {
    width: "50%",
    // height: 200,
    marginInline: "auto"
  },
});