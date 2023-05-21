import "dotenv/config";
import express from "express";
import cors from "cors";

//-----------------------------------------------> custom
// import "./helpers/init_mongodb.js";
import createHttpError from "http-errors";
import { addDataToSheet } from "./helpers/google.js";
import { sendMail } from "./helpers/mail.js";

//-----------------------------------------------> using imports
const app = express();
app.use(cors({ origin: [process.env.FRONTEND_URL] })); // temp allow localhost 3000
app.use(express.json()); // to convert all post request into json format

//-----------------------------------------------> using routes
app.post("/excel", async (req, res, next) => {
  try {
    const { fname, email, phoneNumber, address } = req.body;

    const sheetData = await addDataToSheet({ fname, email, phoneNumber, address });

    if (sheetData) {
      const mailOptions = {
        to: process.env.TEST_EMAIL,
        subject: "Mail From XYZ Colledge",
        text: "Your Response Have been Saved Successfully"
      }

      sendMail(mailOptions);
    }
    res.send({
      success: {
        status: 200,
        data: sheetData,
        message: "Contact Details Submitted",
      }
    })
  } catch (err) {
    console.log(err);
    next(createHttpError(500));
  }
})



//-----------------------------------------------> handle error
app.use((req, res, next) => {
  // const error = new Error("not found");
  // error.status = 404;
  next(createHttpError(404));
});

// //-----------------------------------------------> check for heroku
// if (process.env.NODE_ENV == "production") {
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   } catch (error) {
//     console.log(error.message);
//     // res.redirect("/404");
//     next();
//   }
// });
// }

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  });
});


//-----------------------------------------------> adding listener
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`connection successful at port ${port}`);
  console.log(`allowed url ${process.env.FRONTEND_URL}`);
});
