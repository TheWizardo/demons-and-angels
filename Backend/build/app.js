"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var catch_all_1 = __importDefault(require("./Middleware/catch-all"));
var route_not_found_1 = __importDefault(require("./Middleware/route-not-found"));
var auth_controller_1 = __importDefault(require("./Controllers/auth-controller"));
var images_controller_1 = __importDefault(require("./Controllers/images-controller"));
var coupons_controller_1 = __importDefault(require("./Controllers/coupons-controller"));
var contact_controller_1 = __importDefault(require("./Controllers/contact-controller"));
var orders_controller_1 = __importDefault(require("./Controllers/orders-controller"));
var config_controller_1 = __importDefault(require("./Controllers/config-controller"));
var products_controller_1 = __importDefault(require("./Controllers/products-controller"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var cors_1 = __importDefault(require("cors"));
var logger_mw_1 = __importDefault(require("./Middleware/logger-mw"));
var config_1 = __importDefault(require("./Utils/config"));
var sanitize_1 = __importDefault(require("./Middleware/sanitize"));
var http_1 = __importDefault(require("http"));
var dal_1 = __importDefault(require("./Utils/dal"));
dal_1.default.connect();
var server = (0, express_1.default)();
var allowedOrigins = [
    "http://localhost:3000",
    "https://demonsandangels.co.il",
];
server.use((0, cors_1.default)({
    origin: function (origin, cb) {
        // allow non-browser tools (like curl/postman) that send no origin
        if (!origin)
            return cb(null, true);
        if (allowedOrigins.includes(origin))
            return cb(null, true);
        return cb(new Error("CORS blocked for origin: ".concat(origin)));
    },
    credentials: true,
}));
server.use("/", (0, express_rate_limit_1.default)({ windowMs: 500, max: 20, message: "Please try again later" }));
server.use(express_1.default.json());
server.use(sanitize_1.default);
server.use(logger_mw_1.default); ///////////////////////////////////////////////////////////////////////////////////////////////
server.use(config_1.default.baseURL, auth_controller_1.default);
server.use(config_1.default.baseURL, images_controller_1.default);
server.use(config_1.default.baseURL, coupons_controller_1.default);
server.use(config_1.default.baseURL, contact_controller_1.default);
server.use(config_1.default.baseURL, orders_controller_1.default);
server.use(config_1.default.baseURL, config_controller_1.default);
server.use(config_1.default.baseURL, products_controller_1.default);
server.use("*", route_not_found_1.default);
server.use(catch_all_1.default);
var httpServer = http_1.default.createServer(server).listen(config_1.default.port, function () { return console.log("Listening on port ".concat(config_1.default.port)); });
function shutdown() {
    console.log('Received kill signal, shutting down gracefully...');
    httpServer.close(function () {
        console.log('Closed out remaining connections.');
        process.exit(0);
    });
    // If after 5 seconds it still hasn't exited, force it
    setTimeout(function () {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 5000);
}
// Listen for TERM signal (e.g., Docker stop)
process.on('SIGTERM', shutdown);
