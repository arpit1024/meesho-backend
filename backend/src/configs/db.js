const mongoose = require("mongoose");

module.exports = () => {
  return mongoose
    .connect(
      "mongodb+srv://arpit321:test123@cluster0.epnav.mongodb.net/mydemoapp?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("connection success");
    })
    .catch((err) => {
      console.log(err);
    });
};
//mongodb+srv://arpit321:<password>@cluster0.epnav.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
