//require('dotenv').config();

const key = "e33c3ee5dec8209e1f40";
const secret =
  "244fa51b5db6740c2dee8243039a54e34de65ab71572ea8cddbecf6e68574775";

const axios = require("axios");
const FormData = require("form-data");

export const uploadJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataURL:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append("file", file);

  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  try {
    const response = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    });

    console.log("Image uploaded to Pinata:", response.data.IpfsHash);

    return {
      success: true,
      pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
    };
  } catch (error) {
    console.error("Error uploading image to Pinata:", error.message);
    console.log("PINATA_KEY:", process.env.PINATA_KEY);
    console.log("PINATA_SECRET:", process.env.PINATA_SECRET);

    return {
      success: false,
      message: error.message,
    };
  }
};
