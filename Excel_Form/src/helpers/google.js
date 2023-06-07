import { google } from "googleapis";
import { v4 } from "uuid";

let auth = new google.auth.GoogleAuth({
  keyFile: process.env.KEY_FILE_PATH,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    // 'https://mail.google.com/',
    // 'https://www.googleapis.com/auth/gmail.modify',
    // 'https://www.googleapis.com/auth/gmail.compose',
    // 'https://www.googleapis.com/auth/gmail.send',

  ]
});


async function addDataToSheet({ fname, email, phoneNumber, address, inqueryFor }) {
  try {
    // create insatance for auth
    const client = await auth.getClient();

    // create instance of google apps api
    const googleSheets = google.sheets({ version: "v4", auth: client });


    // metadata
    const spreadsheetId = process.env.SPREADSHEET_ID;
    // const metaData = await googleSheets.spreadsheets.values.get({
    //   auth,
    //   spreadsheetId,
    //   range: "Sheet1",
    // })



    const metaData = await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "2023 student detail!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            v4(),
            fname,
            email,
            phoneNumber,
            address,
            inqueryFor
          ]
        ]
      }
    })

    return metaData?.data;
  } catch (error) {
    console.log(error);
  }
}

export { addDataToSheet };


