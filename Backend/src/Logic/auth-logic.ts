import encryptionService from "../Services/encryptionService";
import auth from "../Utils/auth";
import { UnauthorizedError, ValidationError } from "../Models/errors-models";
import { IUserModel, UserModel } from "../Models/user-model";
import CredentialsModel from "../Models/credentials-model";
import { Types } from "mongoose";


async function login(creds: CredentialsModel): Promise<string> {
    const error = creds.validate();
    if (error) throw new ValidationError(error, "AuthLogic-Login");

    creds.password = encryptionService.sha256(creds.password);
    const user = await UserModel.findOne({email: creds.email, password: creds.password});
    if (!user) throw new UnauthorizedError("Incorrect email or password", "AuthLogic-Login");
    // generating token
    user.password = undefined;
    const token = auth.generateNewToken(user);
    return token;
}

async function register(user: IUserModel): Promise<string> {
    const addedUser = await UserModel.create(user);
    addedUser.password = undefined;
    const token = auth.generateNewToken(addedUser);
    return token;
}

async function deleteUser(id: Types.ObjectId | string): Promise<IUserModel | null> {
    // need to maybe modify orders made by the user. *****************************************
    return await UserModel.findByIdAndDelete(id);
}

export default {
    login,
    register,
    deleteUser
};