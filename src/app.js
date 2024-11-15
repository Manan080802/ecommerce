import express from "express"
import dotenv from "dotenv"
import httpStatus from "http-status"
import ApiError from "./util/ApiError.js";
import { errorConverter,errorHandler } from "./middleware/error.js";


dotenv.config({})
const app = express()
app.use(express.json())


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
  });
app.use(errorConverter);
  
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})