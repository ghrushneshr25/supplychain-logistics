import Web3 from "web3";
import SupplyChain from "./contractBuilds/SupplyChain.json";
import { OWNERADDRESS, CONTRACTADDRESS } from "./constants";
let selectedAccount;
let supplyChainContract;
export let typeOfUser;
let web3;
let ownedProducts;
let shippedProducts;

export const init = async () => {
  let provider = window.ethereum;
  if (typeof provider !== "undefined") {
    provider
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        selectedAccount = accounts[0];
        console.log("Selected account: " + selectedAccount);
        getEntityOfUser(selectedAccount);
        getOwnedProducts(selectedAccount);
        getShippedProducts(selectedAccount);
      })
      .catch((error) => {
        console.log(error);
      });

    window.ethereum.on("accountsChanged", function(accounts) {
      selectedAccount = accounts[0];
      console.log("Selected account: " + selectedAccount);
      getEntityOfUser(selectedAccount);
      getOwnedProducts(selectedAccount);
      getShippedProducts(selectedAccount);
      console.log(ownedProducts);
      console.log(shippedProducts);
    });
  }

  web3 = new Web3(provider);

  supplyChainContract = new web3.eth.Contract(SupplyChain.abi, CONTRACTADDRESS);
};

const getEntityOfUser = async (check) => {
  let r = await supplyChainContract.methods.getEntity().call({
    from: check,
    gas: 80000000,
  });
  if (r == 5 && check === OWNERADDRESS) {
    r = 0;
  }
  typeOfUser = r;
  // console.log(typeOfUser);
};

const fetchOwnedProducts = async () => {
  console.log(selectedAccount);
  ownedProducts = await supplyChainContract.methods
    .x(selectedAccount)
    .call({ from: selectedAccount, gas: 80000000 });
  console.log(ownedProducts);
};

const fetchShippedProducts = async () => {
  shippedProducts = await supplyChainContract.methods
    .x(selectedAccount)
    .call({ from: selectedAccount, gas: 80000000 });
};

export const addManufacturer = (manufacturer) => {
  return supplyChainContract.methods
    .addManufacturer(manufacturer)
    .send({ from: selectedAccount })
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
    .send({ from: selectedAccount })
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
    .send({ from: selectedAccount })
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
    .send({ from: selectedAccount })
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
    .send({ from: selectedAccount })
    .then((transaction) => {
      console.log(transaction.events.EProducedByManufacturer.returnValues[0]);
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
    .send({ from: selectedAccount })
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
    .send({ from: selectedAccount })
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
    .send({
      from: selectedAccount,
      value: web3.utils.toWei(productPrice.toString(), "ether"),
    })
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
    .send({ from: selectedAccount })
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
};

export const getOwnedProducts = async (address) => {
  ownedProducts = await supplyChainContract.methods
    .x(address)
    .call({ from: selectedAccount });
  console.log(ownedProducts);
};

export const getShippedProducts = async (address) => {
  shippedProducts = await supplyChainContract.methods
    .y(address)
    .call({ from: selectedAccount })
    .catch((error) => {
      console.log(error);
    });
  console.log(shippedProducts);
};
