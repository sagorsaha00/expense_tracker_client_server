import * as Yup from "yup";

export const schema = Yup.object({
    username: Yup.string().min(3, "Min 3 characters").required("Username required"),
    email: Yup.string().email("Invalid email").required("Email required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password required"),
    confirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm your password"),
});