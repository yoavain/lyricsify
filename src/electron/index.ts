process.env.NODE_ENV === "production" ? require("./prod.ts") : require("./dev.ts");
