import { catchAsync } from "../util/catchAsync.js";

export const signUp = catchAsync((req,res)=>{
    res.send(req.body)
})