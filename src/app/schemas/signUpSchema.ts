import { z } from "zod";

export const usernameValidation = z
.string()
.min(2, "name must be at least 2 characters")
.max(20,"name must not be more than 20 characters")
.regex(/^[a-zA-Z]+$/, "username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email : z.string().email({message: "invalid email address"}),
    password: z.string().min(6,{message: "invalid, password must be at least 6 characters"})

})