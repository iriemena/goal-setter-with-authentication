const mongoose = require("mongoose");

const connectDB = async() =>{
 try {
   const conn = await mongoose.connect(process.env.DB_URI)
   console.log(`DB connected on ${conn.connection.host}`.cyan)
 } catch (error) {
  console.log(error)
 }
}

module.exports = connectDB