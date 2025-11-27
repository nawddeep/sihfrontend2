import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Code, Copy, Check, Terminal } from 'lucide-react';

export default function SmartContractViewer({ contractAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' }) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('code');

    const handleCopy = () => {
        navigator.clipboard.writeText(contractAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const mockCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        string hash;
        address issuer;
        uint256 timestamp;
        bool isValid;
    }

    mapping(string => Document) public documents;
    event DocumentVerified(string indexed hash, address indexed issuer);

    function verifyDocument(string memory _hash) public {
        require(bytes(_hash).length > 0, "Invalid hash");
        documents[_hash] = Document({
            hash: _hash,
            issuer: msg.sender,
            timestamp: block.timestamp,
            isValid: true
        });
        emit DocumentVerified(_hash, msg.sender);
    }

    function isDocumentValid(string memory _hash) public view returns (bool) {
        return documents[_hash].isValid;
    }
}`;

    const mockABI = `[
  {
    "inputs": [{"internalType": "string", "name": "_hash", "type": "string"}],
    "name": "verifyDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_hash", "type": "string"}],
    "name": "isDocumentValid",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
]`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-purple-600" />
                    <h3 className="font-bold text-gray-800 dark:text-white">Smart Contract</h3>
                </div>
                <div className="flex items-center gap-2 text-xs bg-white dark:bg-gray-800 px-3 py-1.5 rounded border border-gray-200 dark:border-gray-700">
                    <span className="text-gray-500">Address:</span>
                    <span className="font-mono text-purple-600 dark:text-purple-400">
                        {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
                    </span>
                    <button onClick={handleCopy} className="ml-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                </div>
            </div>

            <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setActiveTab('code')}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'code'
                            ? 'bg-white dark:bg-gray-800 text-purple-600 border-b-2 border-purple-600'
                            : 'bg-gray-50 dark:bg-gray-900 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Code className="w-4 h-4" />
                        Source Code
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('abi')}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'abi'
                            ? 'bg-white dark:bg-gray-800 text-purple-600 border-b-2 border-purple-600'
                            : 'bg-gray-50 dark:bg-gray-900 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Terminal className="w-4 h-4" />
                        ABI
                    </div>
                </button>
            </div>

            <div className="p-0 bg-gray-900 overflow-x-auto">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="p-4"
                >
                    <pre className="text-xs md:text-sm font-mono text-gray-300 leading-relaxed">
                        <code>{activeTab === 'code' ? mockCode : mockABI}</code>
                    </pre>
                </motion.div>
            </div>
        </div>
    );
}
