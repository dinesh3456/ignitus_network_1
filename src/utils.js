export const GetIpfsUrlFromPinata = (pinataUrl) => {
  if (!pinataUrl) {
    console.error("Error: Pinata URL is null or undefined");
    return null;
  }

  const IPFSUrlParts = pinataUrl.split("/");

  if (IPFSUrlParts.length === 0) {
    console.error("Error: Invalid Pinata URL structure");
    return null;
  }

  const lastIndex = IPFSUrlParts.length;
  const IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrlParts[lastIndex - 1];

  return IPFSUrl;
};
