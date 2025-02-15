import "dotenv/config";

export const enviromentVariables = {
  SERVER_PORT: process.env.SERVER_PORT || 3003,
  AUTH_API_URL: process.env.AUTH_API_URL || "",
};
