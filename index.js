import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Please type URL",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    let qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
    fs.writeFile('./userRequest.txt', url, err => {
        if (err) {
          console.error(err);
        }
        console.log("File written successfully!");
      });

  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Error!");
    } else {
      console.log("Something else is wrong!!!");
    }
  });