const mongoose = require("mongoose");

//connection to database
// mongoose.connect("mongodb://127.0.0.1:27017/learning-app-easy", {
  mongoose.connect(
    "mongodb+srv://mny:QTCdKtIouJJWbUYN@cluster0.zxfwd.mongodb.net/LearningApp?retryWrites=true&w=majority",
 {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
