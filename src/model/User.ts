import mongoose,{Schema, Document} from 'mongoose';

export interface User extends Document{
    name: string;
    email: string;
    password: string;

}

const UserSchema :Schema<User> = new Schema({
    name:{
        type: String,
        required: [true,"name is required"],
    },
    email:{
        type: String,
        required: [true,"email address is required"],
        unique: true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,"please enter a valid email address"]
    },
    password:{
        type: String,
        required: [true,"password is required"],
    }
})
//check if the model is already created and if not create new model
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel