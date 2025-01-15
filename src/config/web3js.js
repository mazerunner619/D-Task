import { Web3 } from "web3";
import ABI from "../../ABI.json";

export const connectWallet = async () => {
  try {
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
      throw new Error("Wallet not installed");
    }
  } catch (error) {
    console.error("web3 js error", error);
    return false;
  }
};
