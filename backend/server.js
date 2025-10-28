import app from './app.js';
import dotenv from 'dotenv';
import { connectMongoDatabase } from './config/database.js';
dotenv.config({path:'backend/config/config.env'})
connectMongoDatabase();
//Handle uncaught exception errors
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down due to uncaught exception errors`);
  process.exit(1);
})

const port =process.env.PORT || 3000;

const Server=app.listen(port,()=>{
  console.log(`Server is running on PORT ${port}`)
})



//unhandledRejection is nothing but event.
process.on('unhandledRejection',(err)=>{
  console.log(`Error: ${err.message}`);
  console.log(`Server is Sutting down, due to unhandled promise rejection.`);
  Server.close(()=>{
    process.exit(1)
  })
})         