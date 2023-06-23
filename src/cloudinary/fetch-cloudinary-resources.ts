const v = require("./fetchCloudinary");

require("dotenv").config();

const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
};

const options = {
  type: "upload",
  max_results: 300,
};

v.fetchCloudinaryAssets(
  config,
  {
    ...options,
    prefix: "Long Island JavaScript/website-photos",
  },
  {
    savePath: "./src/cloudinary/output/photos.ts",
    height: 800,
  }
);
