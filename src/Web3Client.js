import Web3 from "web3";
import SupplyChain from "./SupplyChain.json";
let selectedAccounts;
let supplyChainContract;
let typeOfUser;

export const init = async () => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccounts = accounts[0];
        console.log("Selected account: " + selectedAccounts);
      })
      .catch((error) => {
        console.log(error);
      });

    window.ethereum.on("accountsChanged", function (accounts) {
      selectedAccounts = accounts[0];
      console.log("Selected account: " + selectedAccounts);
    });
  }

  const web3 = new Web3(provider);

  const networkID = await web3.eth.net.getId();

  supplyChainContract = new web3.eth.Contract(
    SupplyChain.abi,
    "0x41989FE49643e456bBA696b5aA9df256474B4b3e"
  );
};

export const addManufacturer = (manufacturer) => {
  return supplyChainContract.methods
    .addManufacturer(manufacturer)
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addDistributor = (distributor) => {
  return supplyChainContract.methods
    .addDistributor(distributor)
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addRetailer = (retailer) => {
  return supplyChainContract.methods
    .addRetailer(retailer)
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addConsumer = (consumer) => {
  return supplyChainContract.methods
    .addConsumer(consumer)
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

// const fetchEntityType = (address) => {
//   if (address == "0x1c9ab960cb703928813aa86BEF737B8Daa6B9306") {
//     return "Owner";
//   }
// };

const 