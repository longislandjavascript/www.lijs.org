const fs = require("fs");
const cloudinary = require("cloudinary");
require("dotenv").config();

type Args = {
  config: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
    secure: boolean;
  };
  options: {
    type: string;
    max_results: number;
    prefix: string;
  };
  settings: {
    savePath: string;
    height: number;
  };
};

type Result = {
  src: string;
  height: number;
  width: number;
};

async function fetchCloudinaryAssets(
  config: Args["config"],
  options: Args["options"],
  settings: Args["settings"]
) {
  // Configure Cloudinary
  const { cloud_name, api_key, api_secret, secure } = config;
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure,
  });

  const temp = {
    values: [],
    nextCursor: null,
  };

  await listResources({ options, settings, temp });
}

type AArgs = {
  options: Args["options"];
  settings: Args["settings"];
  temp: {
    values: Result[] | [];
    nextCursor: string | null;
  };
};

async function listResources(args: AArgs) {
  const { options, settings, temp } = args;
  const _result = [...temp.values];
  if (temp.nextCursor) {
    options["next_cursor"] = temp.nextCursor;
  }
  await cloudinary.v2.api.resources(options, async function (_, res) {
    const more = res?.next_cursor;
    const resources = res?.resources;

    for (let _res in resources) {
      res = resources[_res];
      const resultTemp: any = [];
      resultTemp.push({
        src: settings.height
          ? res.secure_url.replace("/upload/", `/upload/h_${settings.height}/`)
          : res.secure_url,
        height: settings.height || res.height,
        width: settings.height
          ? +(res.width * (settings.height / res.height)).toFixed(0)
          : res.width,
      });
      _result.push(resultTemp);
    }

    if (more) {
      const _temp = {
        values: _result,
        nextCursor: more,
      };
      await listResources({ options, settings, temp: _temp });
    } else {
      console.info("Done 🎉");
      fs.writeFile(
        settings.savePath,
        `export const images = ${JSON.stringify(
          _result.map((url) => url[0])
        )};`,
        function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        }
      );
    }
  });
}

module.exports = { fetchCloudinaryAssets };
