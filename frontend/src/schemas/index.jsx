import * as Yup from "yup";

export const signUpSchema=Yup.object({
    fname:Yup.string().min(2).max(20).required("please enter your firstname"),
    lname:Yup.string().min(2).max(50).required("please enter your lastname"),
    email:Yup.string().email().min(12).required("please enter valid email address"),
    age:Yup.number().min(18).max(70).required("please enter your age")
})