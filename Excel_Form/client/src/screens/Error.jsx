import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

//-----------------------------------------------> custom imports
import { Button } from "../components";

export default function Error() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Submit Details</h1>
      <Button text={"Go To Form"} onClick={() => {
        navigate("/Freelance_Projects");
      }} />
    </div>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});