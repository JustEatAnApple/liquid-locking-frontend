import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { useEffect, useState } from "react";
import {
  useGetAccount,
  useGetPendingTransactions,
} from "@multiversx/sdk-dapp/hooks";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import axios from "axios";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";

let ct = 0;

export const TransactionSection = () => {
  const [tx, setTx] = useState<Transaction>();
  const { pendingTransactionsArray } = useGetPendingTransactions();

  const { address } = useGetAccount();
  const { tokenLogin } = useGetLoginInfo();
  const bearerToken = tokenLogin?.nativeAuthToken

  const createTransaction = async () => {
    // const txToSign = new Transaction({
    //   sender: address,
    //   receiver: address,
    //   value: "0",
    //   gasLimit: 100000n,
    //   chainID: "D",
    //   version: 0,
    //   data: Buffer.from(`Transaction ${ct++}`),
    // });
    
    console.log("before req: " + bearerToken)
    const tx = await axios.get<IPlainTransactionObject>('http://localhost:3000/unlockedTokens/erd1tjkfemhpxmch4vx306y85x2lv2n9d6hvn8qpe6atc7m82wef75pqmnws0t', {
                                        headers: {
                                          'Authorization': 'Bearer ' + bearerToken,
                                          'Origin': 'localhost:5173'
                                      }
                                    }
    );
    console.log("after req")
    console.log(tx.data)
    setTx(Transaction.fromPlainObject(tx.data));
  };

  const sendTransaction = async () => {
    if (!address || !tx) {
      console.error("Address or transaction not found");
      return;
    }

    await sendTransactions({
      transactions: [tx],
      transactionsDisplayInfo: {
        processingMessage: "Processing transaction",
        errorMessage: "An error has occured",
        successMessage: "Transaction successful",
      },
      signWithoutSending: false,
    });
  };

  useEffect(() => {
    console.log("tx", tx);
  }, [tx]);

  return (
    <div className="w-1/2 flex flex-col p-6 rounded-xl bg-white">
      <h2 className="flex font-medium group text-sm">
        Create and send transaction
      </h2>
      <button
        onClick={createTransaction}
        className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 my-2 rounded"
      >
        Create transaction
      </button>
      <pre className="text-sm text-left">
        <code>{JSON.stringify(tx?.toPlainObject(), null, 2)}</code>
      </pre>
      <button
        onClick={sendTransaction}
        className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 my-2 rounded"
        disabled={pendingTransactionsArray.length > 0}
      >
        {pendingTransactionsArray.length > 0 ? (
          <span>Sending...</span>
        ) : (
          <span>Send transaction</span>
        )}
      </button>
    </div>
  );
};
