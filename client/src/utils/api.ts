import { getL2Network, L1TransactionReceipt } from "@arbitrum/sdk";
import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { retryables } from "./retryables";
import { deposits } from "./deposits";
import { classicRetryables } from "./classicRetryables";

export function fakePromise<T>(delay: number, data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

export async function fetchDeposits() {
  const txnHash =
    "0x4d990d176f9d88047e6ddbadd446facfde700993be2b9b5fb407c7f88a860f17";
  const l1Provider = new StaticJsonRpcProvider("https://eth.llamarpc.com");
  const rec = await l1Provider.getTransactionReceipt(txnHash);
  const l1TxnReceipt = new L1TransactionReceipt(rec);
  const l2Network = await getL2Network(42161);
  const l2RpcURL = "https://arb1.arbitrum.io/rpc";
  const l2Provider = new StaticJsonRpcProvider(l2RpcURL);
  const messages = (await l1TxnReceipt.getL1ToL2Messages(l2Provider)).map(
    (l1ToL2Message) => {
      return Object.assign(l1ToL2Message, { l2Network });
    }
  );
  const depositMessagesWithNetwork = (
    await l1TxnReceipt.getEthDeposits(l2Provider)
  ).map((depositMessage) => {
    return Object.assign(depositMessage, { l2Network });
  });

  return fakePromise(1_000, {
    deposits,
    numberMessages: messages.length,
    numberDeposits: depositMessagesWithNetwork.length,
  });
}

export function fetchRetryables() {
  return fakePromise(500, retryables);
}

export function fetchClassicRetryables() {
  return fakePromise(3_000, classicRetryables);
}
