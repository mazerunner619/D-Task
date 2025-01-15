import { Web3 } from "web3";
import ABI from "../../ABI.json";

const redirectToApp =
  "https://metamask.app.link/dapp/https://mazerunner619.github.io/dtask/";

const getDeviceOS = () => {
  const agent = navigator.userAgent;
  if (/android/i.test(agent)) {
    return "Android";
  } else if (/iPad|iPhone|iPod/i.test(agent)) {
    return "iOS";
  }
  return "Other";
};

export const connectWallet = async () => {
  try {
    // for wallet installed on browser
    // const os = getDeviceOS();
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const contractAddress = import.meta.env.VITE_API_CONTRACT_ADDR;
      if (contractAddress === undefined)
        throw new Error("contract address env variable missing");
      const contract = new web3.eth.Contract(ABI, contractAddress);
      return { web3, account: accounts[0], contract };
    } else {
      window.location.href = redirectToApp;
    }
  } catch (error) {
    console.error("web3 js error", error);
    return false;
  }
};
