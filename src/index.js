const app = require("./app");

 const port = process.env.PORT || 8001

 app.listen(port, () => {
    console.log("Backend is running on port "+ port);
});

//initialisation of db
// require('./mongoose/db/defaultDB')