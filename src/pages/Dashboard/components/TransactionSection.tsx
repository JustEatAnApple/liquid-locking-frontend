import { IPlainTransactionObject, Transaction } from "@multiversx/sdk-core/out";
import { useEffect, useState } from "react";
import {
  useGetAccount,
  useGetPendingTransactions,
} from "@multiversx/sdk-dapp/hooks";
import { sendTransactions } from "@multiversx/sdk-dapp/services";
import axios from "axios";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import Modal from '../Modal'; // Import the Modal component

export const TransactionSection: React.FC = () => {
  const [tx, setTx] = useState<Transaction | null>(null);
  const [tokens, setTokens] = useState<{ token_identifier: string }[]>([]);
  const [unbondPeriod, setUnbondPeriod] = useState<number | null>(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showUnbondModal, setShowUnbondModal] = useState(false);
  const { pendingTransactionsArray } = useGetPendingTransactions();

  const { address } = useGetAccount();
  const { tokenLogin } = useGetLoginInfo();
  const bearerToken = tokenLogin?.nativeAuthToken;

  const createTransaction = async () => {
    try {
      console.log("before req: " + bearerToken);
      const response = await axios.get<IPlainTransactionObject>(
        `http://localhost:3000/unlockedTokens/${address}`,
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Origin': 'localhost:5173'
          }
        }
      );
      console.log("after req");
      console.log(response.data);
      setTx(Transaction.fromPlainObject(response.data));
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  const getWhitelistedTokens = async () => {
    try {
      const response = await axios.get<{ tokens: { token_identifier: string }[] }>(
        'http://localhost:3000/whitelistedTokens/',
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Origin': 'localhost:5173'
        }
      });
      console.log('API response data:', response.data);

      // Ensure we're accessing the tokens array correctly
      const tokensData = response.data.tokens || [];
      console.log('Tokens array:', tokensData);

      setTokens(tokensData);
      setShowTokenModal(true);
    } catch (error) {
      console.error("Error fetching whitelisted tokens:", error);
    }
  };

  const getUnbondPeriod = async () => {
    try {
      const response = await axios.get<{ unbondPeriod: number }>(
        'http://localhost:3000/unbondPeriod/',
        {
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Origin': 'localhost:5173'
          }
        }
      );
      console.log('Get unbondPeriod data: ', response.data);
      setUnbondPeriod(response.data.unbondPeriod);
      setShowUnbondModal(true);
    } catch (error) {
      console.error("Error fetching unbond period:", error);
    }
  };

  const sendTransaction = async () => {
    if (!address || !tx) {
      console.error("Address or transaction not found");
      return;
    }

    try {
      await sendTransactions({
        transactions: [tx],
        transactionsDisplayInfo: {
          processingMessage: "Processing transaction",
          errorMessage: "An error has occurred",
          successMessage: "Transaction successful",
        },
        signWithoutSending: false,
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
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
      <button
        onClick={getWhitelistedTokens}
        className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 my-2 rounded"
      >
        Get whitelisted Tokens
      </button>
      <button
        onClick={getUnbondPeriod}
        className="w-96 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 my-2 rounded"
      >
        Get unbond period
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
      
      <Modal show={showTokenModal} onClose={() => setShowTokenModal(false)} tokens={tokens} />
      {showUnbondModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Unbond Period</h2>
            <p className="text-lg">{unbondPeriod}</p>
            <button
              onClick={() => setShowUnbondModal(false)}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSection;
