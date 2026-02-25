import Joi from "joi";

class CredentialsModel {
    public email: string;
    public password: string;

    public constructor(user: CredentialsModel) {
        this.email = user.email;
        this.password = user.password;
    }

    private static validationScheme = Joi.object({
        email: Joi.string().required().min(4).max(100),
        password: Joi.string().required().min(4).max(100),
    });

    public validate(): string {
        const result = CredentialsModel.validationScheme.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;