const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose
    .connect("mongodb+srv://nguyenducmanh1809:manh1234@cluster0.1ya4y.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Connected"));
}  catch (error) {
    console.log(error);
    process.exit(1);
}
};
module.exports = connectDB;