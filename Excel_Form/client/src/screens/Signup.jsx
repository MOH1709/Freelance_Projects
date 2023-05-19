import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { MdMail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";


//-----------------------------------------------> custom imports
import { Button, InputBox } from "../components";
import { SHADOW } from "../theme";
import { addDataToExcel } from "../services/googleapis";

export default function Signup() {
  const styles = useStyles();

  // states
  const [input, setInput] = useState({
    fname: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  //-----------------------------------------------> on chane
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  }

  //-----------------------------------------------> submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await addDataToExcel(input);

      if (response?.success) {
        alert("Data Submitted succesfully");
      } else {
        alert("OPPS! Something went wrong");
      }

      setInput({
        fname: "",
        address: "",
        email: "",
        phoneNumber: "",
      });

    } catch (error) {
      alert("OPPS! Something went wrong");
      setInput({
        fname: "",
        address: "",
        email: "",
        phoneNumber: "",
      });

    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Contact Details
      </h3>


      <form className={styles.form} onSubmit={handleSubmit}>
        <InputBox
          title={"Full Name"}
          value={input.fname}
          name="fname"
          required={true}
          onChange={handleChange}
        />
        <InputBox
          title={"Address"}
          value={input.address}
          name="address"
          required={true}
          onChange={handleChange}
        />
        <InputBox
          title={"Email"}
          value={input.email}
          name="email"
          required={true}
          onChange={handleChange}
          Icon={<MdMail size={23} />}
        />
        <InputBox
          type={"number"}
          title={"Contact Number"}
          value={input.phoneNumber}
          name="phoneNumber"
          required={true}
          onChange={handleChange}
          Icon={<AiFillPhone size={23} />}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }} >

          <Button
            text={"Submit"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}

//------------------------------------------->custom styles
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 500,
    padding: 20,
    marginInline: "auto",
    borderRadius: 20,
    boxShadow: SHADOW,
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  linkDiv: {
    "& p": {
      marginRight: 10,
    },
    display: "flex",
    margin: 10,
  },
  form: {

  }
});