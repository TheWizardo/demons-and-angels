import { FrontendConfig, IFrontendConfig } from "../Models/frontendConfig-model";
import mailService from "../Services/mailService";
import ContactModel from "../Models/contact-model";

async function getConfig(): Promise<IFrontendConfig> {
    const conf = await FrontendConfig.findOne();
    return conf;
}

async function updateConfig(newConf: Partial<IFrontendConfig>): Promise<IFrontendConfig> {
    const updatedConfig = await FrontendConfig.findByIdAndUpdate(newConf._id, newConf, { new: true, runValidators: true });

    await mailService.sendContactEmail(new ContactModel({
        reply_to: "noone@abc.xyz",
        from_name: "Yours truely",
        subject: "confBackup",
        message: JSON.stringify(updatedConfig),
        validate: () => ""
    }));
    return updatedConfig;
}

export default {
    getConfig,
    updateConfig
};