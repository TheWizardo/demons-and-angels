import path from "path";

class Config {
    public environment = process.env.NODE_ENV; //"development" || "production";
    public baseURL = process.env.BASE_URL || "/api/v2";
    public port = +process.env.PORT || 4272;

    private mongoDBName = process.env.MONGO_DB_NAME || "DemonsAndAngels";
    public dbURI = `${process.env.MONGO_URI}/${this.mongoDBName}` || `mongodb://127.0.0.1:27017/${this.mongoDBName}`;
    public imagesFolder = path.resolve(__dirname, "..", "Assets", "images");

    public publicKey =  path.resolve(__dirname, "..", "Assets", "Key", "publicKey.pem");

    public certFilesPath = "/etc/letsencrypt/live/api.demonsandangels.co.il/";

    public EmailJs = "https://api.emailjs.com/api/v1.0/email/send";
    public EmailJsUserId = "H9rn7GTghDk4HNmXP";
    public EmailJsServiceId = "service_ktckf8a";
    public EmailJsContactTemplateId = "template_8d6mkgg";
    public EmailJsPurchaseTemplateId = "template_0gmbv7p";

    public secretKey = process.env.SECRET_KEY || "mySuperSecretKeyForSigningTokens";
    public salt = process.env.SALT || "mySuperSecretSaltForHashingPasswords";
}

const config = new Config();
export default config;