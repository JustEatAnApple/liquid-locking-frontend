import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  tokens: { token_identifier: string }[];
}

const Modal: React.FC<ModalProps> = ({ show, onClose, tokens }) => {
  if (!show) {
    return null;
  }

  console.log("Modal tokens:", tokens); // Debugging line

  // Group tokens into pairs for display
  const groupedTokens = [];
  for (let i = 0; i < tokens.length; i += 2) {
    groupedTokens.push(tokens.slice(i, i + 2).map(t => t.token_identifier).join(', '));
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-128 max-h-128 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Whitelisted Tokens</h2>
        <ul>
          {groupedTokens.length > 0 ? groupedTokens.map((row, index) => (
            <li key={index} className="mb-2">
              {row}
            </li>
          )) : <li>No tokens available</li>}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
