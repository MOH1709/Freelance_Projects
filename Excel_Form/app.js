import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import path from 'path';

//-----------------------------------------------> custom
// import "./helpers/init_mongodb.js";
import createHttpError from "http-errors";
import { addDataToSheet } from "./src/helpers/google.js";
import { sendMail } from "./src/helpers/mail.js";

//-----------------------------------------------> using imports
const app = express();
app.use(cors({ origin: [process.env.FRONTEND_URL] })); // temp allow localhost 3000
app.use(express.json()); // to convert all post request into json format
app.use(morgan("dev")); // to convert all post request into json format

// ------------------> self impot
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//-----------------------------------------------> using routes
app.post("/excel", async (req, res, next) => {
  try {
    const { fname, email, phoneNumber, address } = req.body;

    const sheetData = await addDataToSheet({ fname, email, phoneNumber, address });

    if (sheetData) {
      const mailOptions = {
        to: email,
        subject: "Mail From MS University",
        text: `
          name: ${fname}
          email: ${email}
          contact number: ${phoneNumber}
          address: ${address}
          
          above details are saved succesfully!!
        `
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
// app.use((req, res, next) => {
//   // const error = new Error("not found");
//   // error.status = 404;
//   next(createHttpError(404));
// });

// //-----------------------------------------------> check for heroku
// if (process.env.NODE_ENV == "production") {
const root = path.join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile('index.html', { root });
})

// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   try {
//     res.sendFile(path.join((__dirname).replace("src", ""), "client/build/index.html"));
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
