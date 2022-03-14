import Web3 from "web3";
import SupplyChain from "./SupplyChain.json";
import { OWNERADDRESS, CONTRACTADDRESS } from "./constants";
let selectedAccounts;
let supplyChainContract;
let typeOfUser;
let web3;
let ownedProducts;
let shippedProducts;

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

    window.ethereum.on("accountsChanged", function(accounts) {
      selectedAccounts = accounts[0];
      console.log("Selected account: " + selectedAccounts);
    });
  }

  web3 = new Web3(provider);

  supplyChainContract = new web3.eth.Contract(SupplyChain.abi, CONTRACTADDRESS);

  getEntity();
  if (typeOfUser > 0 && typeOfUser < 5) {
    fetchOwnedProducts();
    fetchShippedProducts();
  }
};

const getEntity = async () => {
  let r = await supplyChainContract.methods
    .getEntity()
    .call({ from: selectedAccounts, gas: 10000000 });
  if (r == 5 && selectedAccounts == OWNERADDRESS) {
    r = 0;
  }
  typeOfUser = r;
  console.log(typeOfUser);
};

const fetchOwnedProducts = async () => {
  ownedProducts = await supplyChainContract.methods
    .x(selectedAccounts)
    .call({ from: selectedAccounts, gas: 10000000 });
};

const fetchShippedProducts = async () => {
  shippedProducts = await supplyChainContract.methods
    .x(selectedAccounts)
    .call({ from: selectedAccounts, gas: 10000000 });
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

export const produceByManufacturer = (
  productName,
  productDesc,
  productType,
  collectible,
  weight
) => {
  return supplyChainContract.methods
    .producebymanufacturer(
      productName,
      productDesc,
      productType,
      collectible,
      weight
    )
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const saleByManufacturer = (productId, price) => {
  return supplyChainContract.methods
    .forsalebymanufacturer(
      productId,
      web3.utils.toWei(price.toString(), "ether")
    )
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const shippedByManufacturer = (productId, shippedToAddress) => {
  return supplyChainContract.methods
    .shippedbymanufacturer(productId, shippedToAddress)
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const receiveProductByDistributor = (productId, productPrice) => {
  return supplyChainContract.methods
    .receivedbydistributor(productId)
    .send({ from: selectedAccounts, value: productPrice })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProductDetails = async (productId) => {
  const details = await supplyChainContract.methods
    .productDetail(productId)
    .send({ from: selectedAccounts })
    .then((transaction) => {
      console.log(transaction);
    })
    .catch((error) => {
      console.log(error);
    });

  const events = await supplyChainContract
    .getPastEvents("allEvents", {
      filter: { uin: productId },
      fromBlock: 0,
      toBlock: "latest",
    })
    .then((events) => {
      console.log(events);
    });

  return { productDetails: details, productEvents: events };
};
