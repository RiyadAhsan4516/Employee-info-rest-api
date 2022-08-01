const { default: mongoose } = require("mongoose");
const app = require("./app");

require("dotenv").config();

const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to database created");
  });

app.listen(3000, "127.0.0.1", () => {
  console.log(`server running on port ${process.env.PORT}`);
});
