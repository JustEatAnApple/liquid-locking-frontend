import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { useEffect, useState } from "react";
import {
  useGetAccount,
  useGetPendingTransactions,
} from "@multiversx/sdk-dapp/hooks";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import axios from "axios";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";


export const TransactionSection = () => {
  const [tx, setTx] = useState<Transaction>();
  const { pendingTransactionsArray } = useGetPendingTransactions();

  const { address } = useGetAccount();
  const { tokenLogin } = useGetLoginInfo();
  const bearerToken = tokenLogin?.nativeAuthToken

  const [bodyInput, setBodyInput] = useState<string>('');
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyInput(event.target.value);
  };

  const clearBody = () => {
    setBodyInput('')
  }

  const viewWhitelistedTokens = async () => {

    const tx = await axios.get<IPlainTransactionObject>(
      'http://localhost:3000/whitelistedTokens/', 
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173'
        }
      }
    );

    console.log(tx.data);
    setBodyInput(JSON.stringify(tx.data, null, 2));
    setTx(Transaction.fromPlainObject(tx.data));
  
  }

  const viewUnbondPeriod = async () => {

    const tx = await axios.get<IPlainTransactionObject>(
      'http://localhost:3000/unbondPeriod/', 
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173'
        }
      }
    );

    console.log(tx.data);
    setBodyInput(JSON.stringify(tx.data, null, 2));
    setTx(Transaction.fromPlainObject(tx.data));

  }

  const viewLockedTokens = async () => {

    const tx = await axios.get<IPlainTransactionObject>(
      'http://localhost:3000/lockedTokens/', 
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173'
        }
      }
    );

    console.log(tx.data);
    setBodyInput(JSON.stringify(tx.data, null, 2));
    setTx(Transaction.fromPlainObject(tx.data));
  
  }

  const viewLockedTokenAmounts = async () => {

    const tx = await axios.get<IPlainTransactionObject>(
      'http://localhost:3000/lockedTokenAmounts/amounts/', 
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173'
        }
      }
    );
    
    console.log(tx.data);
    setBodyInput(JSON.stringify(tx.data, null, 2));
    setTx(Transaction.fromPlainObject(tx.data));

  }

  const viewUnlockedTokens = async () => {

    const tx = await axios.get<IPlainTransactionObject>(
      'http://localhost:3000/unlockedTokens/', 
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173'
        }
      }
    );

    console.log(tx.data);
    setBodyInput(JSON.stringify(tx.data, null, 2));
    setTx(Transaction.fromPlainObject(tx.data));
  
  }

  const viewUnlockedTokenAmounts = async () => {

    const tx = await axios.get<IPlainTransactionObject>(
      'http://localhost:3000/unlockedTokens/amounts/', 
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173'
        }
      }
    );
    
    console.log(tx.data);
    setBodyInput(JSON.stringify(tx.data, null, 2));
    setTx(Transaction.fromPlainObject(tx.data));

  }

  const lockTokens = async () => {
    setBodyInput('')
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }

    const tx = await axios.post<IPlainTransactionObject>(
      'http://localhost:3000/lock',
      bodyInput,
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
   
    console.log("I GENERATED LOCK TRANSACTION")
    setTx(Transaction.fromPlainObject(tx.data));
    setBodyInput('TRANSACTION IS GENERATED!');
  
  }

  const setUnbondPeriod = async () => {
    setBodyInput('')
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }

    const tx = await axios.post<IPlainTransactionObject>(
      'http://localhost:3000/setUnboundPeriod',
      bodyInput,
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
   
    console.log("I GENERATED SET_UNBOND_PERIOD TRANSACTION")
    setTx(Transaction.fromPlainObject(tx.data));
    setBodyInput('TRANSACTION IS GENERATED!');

  }
  
  const whitelistToken = async () => {
    setBodyInput('')
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }

    const tx = await axios.post<IPlainTransactionObject>(
      'http://localhost:3000/whiteListToken',
      bodyInput,
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
   
    console.log("I GENERATED WHITELIST_TOKEN TRANSACTION")
    setTx(Transaction.fromPlainObject(tx.data));
    setBodyInput('TRANSACTION IS GENERATED!');

  }

  const blacklistToken = async () => {
    setBodyInput('')
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }

    const tx = await axios.post<IPlainTransactionObject>(
      'http://localhost:3000/blackListToken',
      bodyInput,
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
   
    console.log("I GENERATED BLACKLIST_TOKEN TRANSACTION")
    setTx(Transaction.fromPlainObject(tx.data));
    setBodyInput('TRANSACTION IS GENERATED!');

  }

  const unlockTokens = async () => {
    setBodyInput('')
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }

    const tx = await axios.post<IPlainTransactionObject>(
      'http://localhost:3000/unlock',
      bodyInput,
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
   
    console.log("I GENERATED UNLOCK TRANSACTION")
    setTx(Transaction.fromPlainObject(tx.data));
    setBodyInput('TRANSACTION IS GENERATED!');
  
  }

  const unbondTokens = async () => {
    setBodyInput('')
    if(bodyInput){
      console.log("THIS IS BODY INPUT: ", bodyInput)
    }

    const tx = await axios.post<IPlainTransactionObject>(
      'http://localhost:3000/unbond',
      bodyInput,
      {
        headers: {
          'Authorization': 'Bearer ' + bearerToken,
          'Origin': 'localhost:5173',
          'Content-Type': 'application/json'
        }
      }
    );
   
    console.log("I GENERATED UNBOND TRANSACTION")
    setTx(Transaction.fromPlainObject(tx.data));
    setBodyInput('TRANSACTION IS GENERATED!');
  
  }

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
    console.log("TRANSACTION SENT SUCCESSFULLY !")
    setBodyInput("TRANSACTION SENT SUCCESSFULLY !")
  };

  useEffect(() => {
    console.log("tx", tx);
  }, [tx]);

  return (
    <div className="w-1/2 flex flex-col p-6 rounded-xl bg-white">
      <h2 className="flex font-medium group text-sm">
        Create and send transaction
      </h2>

      <div className="w-full flex justify-between my-4">

          <div className="flex flex-col">
              <button
                onClick={whitelistToken}
                className="bg-mvx-blue hover:scale-105  text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Whitelist a Token
              </button>

              <button
                onClick={blacklistToken}
                className="bg-mvx-blue hover:scale-105  text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Blacklist a Token
              </button>

              <button
                onClick={viewWhitelistedTokens}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Whitelisted Tokens
              </button>
          </div>

          <div className="flex flex-col">
              <button
                onClick={viewLockedTokens}
                className="bg-mvx-blue hover:scale-105  text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Locked Tokens
              </button>

              <button
                onClick={viewLockedTokenAmounts}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Locked Amounts
              </button>

              <button
                onClick={lockTokens}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Lock Tokens
              </button>
          </div>

          <div className="flex flex-col">
              <button
                onClick={viewUnlockedTokens}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
                >
                View Unlocked Tokens
              </button>
              
              <button
                onClick={viewUnlockedTokenAmounts}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Unlocked Amounts
              </button>

              <button
                onClick={unlockTokens}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Unlock Tokens
              </button>

          </div>

          <div className="flex flex-col">
              <button
                onClick={setUnbondPeriod}
                className="bg-mvx-blue hover:scale-105  text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Set Unbond Period
              </button>
              <button
                onClick={viewUnbondPeriod}
                className="bg-mvx-blue hover:scale-105  text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                View Unbond Period
              </button>
              <button
                onClick={unbondTokens}
                className="bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-base"
              >
                Unbond Tokens
              </button>
          </div>

      
      </div>

      <div className="flex justify-between w-full">
        <label htmlFor="bodyInput" className="text-base border border-gray-300 rounded bg-gray-50 w-24 text-black p-1 font-semi-bold">Body</label>
        <button onClick={clearBody} className="font-medium text-base border border-gray-300 hover:bg-gray-700 rounded-xl bg-black text-white w-24 p-1">Clear Body</button>
      </div>
      <textarea id="bodyInput" value={bodyInput} onChange={handleInputChange} placeholder="Enter Body here" rows={7} className="w-full p-2 border border-gray-300 rounded text-sm"/>
      {/* <pre className="text-sm text-left">
        <code>{JSON.stringify(tx?.toPlainObject(), null, 2)}</code>
      </pre> */}
      <button
        onClick={sendTransaction}
        className="w-full bg-mvx-blue hover:scale-105 text-black font-medium py-1 px-2 my-2 rounded-lg text-2xl"
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
