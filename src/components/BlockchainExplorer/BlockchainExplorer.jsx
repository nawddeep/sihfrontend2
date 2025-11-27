import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChainIcon, Copy, ExternalLink, Filter, Search, Activity, Globe, FileCode, Clock } from 'lucide-react';
import TransactionTimeline from './TransactionTimeline';
import ValidationNodeMap from './ValidationNodeMap';
import SmartContractViewer from './SmartContractViewer';

const ChainIcon2 = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

export default function BlockchainExplorer({ documentId = 'DOC-2024-001' }) {
  const [activeTab, setActiveTab] = useState('explorer');
  const [selectedBlock, setSelectedBlock] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock blockchain data
    const mockBlocks = Array.from({ length: 5 }).map((_, i) => ({
      height: 150000 - i,
      hash: `0x${Math.random().toString(16).slice(2, 66)}`,
      previousHash: i === 0 ? '0x0000...' : `0x${Math.random().toString(16).slice(2, 66)}`,
      timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
      transactionCount: Math.floor(Math.random() * 3) + 1,
      miner: `Validator-Node-${String(i + 1).padStart(3, '0')}`,
      reward: (Math.random() * 2 + 1).toFixed(2),
      gasUsed: Math.floor(Math.random() * 800000) + 100000,
      gasLimit: 1000000,
      transactions: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, j) => ({
        hash: `0x${Math.random().toString(16).slice(2, 66)}`,
        from: `0x${Math.random().toString(16).slice(2, 42)}`,
        to: `0x${Math.random().toString(16).slice(2, 42)}`,
        value: (Math.random() * 10).toFixed(2),
        status: 'success',
        timestamp: new Date(Date.now() - i * 60 * 60 * 1000 - j * 1000).toISOString(),
        action: j === 0 ? 'Document Verification' : 'Status Update',
        gasUsed: Math.floor(Math.random() * 50000) + 21000,
      })),
    }));
    setBlocks(mockBlocks);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 border-4 border-saffron border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const filteredBlocks = blocks.filter(block => {
    const matchesSearch =
      block.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.previousHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      block.miner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const displayBlock = filteredBlocks[selectedBlock] || blocks[0];

  // Collect all transactions for timeline
  const allTransactions = blocks.flatMap(b => b.transactions);

  const tabs = [
    { id: 'explorer', label: 'Block Explorer', icon: ChainIcon2 },
    { id: 'timeline', label: 'Transaction Timeline', icon: Clock },
    { id: 'network', label: 'Validator Network', icon: Globe },
    { id: 'contract', label: 'Smart Contract', icon: FileCode },
  ];

  return (
    <div className="space-y-4">
      {/* Header & Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-4 rounded-lg border border-gray-700"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h4 className="text-lg font-bold text-saffron flex items-center gap-2">
            <ChainIcon2 size={20} />
            Blockchain Verification
          </h4>

          {/* Search (only visible in explorer tab) */}
          {activeTab === 'explorer' && (
            <div className="relative w-full md:w-64">
              <Search size={18} className="absolute left-3 top-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search blockchain..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-saffron"
              />
            </div>
          )}
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-saffron text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'explorer' && (
          <motion.div
            key="explorer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {/* Blocks Chain */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h5 className="text-sm font-bold text-saffron mb-4">Recent Blocks</h5>
              <div className="space-y-2">
                {filteredBlocks.map((block, idx) => (
                  <motion.button
                    key={block.height}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedBlock(idx)}
                    className={`w-full p-3 rounded-lg border transition text-left ${displayBlock.height === block.height
                        ? 'border-saffron bg-saffron/10'
                        : 'border-gray-600 bg-gray-700/50 hover:border-saffron'
                      }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-gray-300">Block #{block.height}</p>
                        <p className="text-xs text-gray-500">{new Date(block.timestamp).toLocaleString()}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-600/30 text-green-400 text-xs font-bold rounded">
                        ✓ Confirmed
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{block.hash}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Block Details */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h5 className="text-sm font-bold text-saffron mb-4">Block Details</h5>
              <div className="space-y-3">
                {[
                  { label: 'Block Height', value: displayBlock.height },
                  { label: 'Miner', value: displayBlock.miner },
                  { label: 'Timestamp', value: new Date(displayBlock.timestamp).toLocaleString() },
                  { label: 'Block Reward', value: `${displayBlock.reward} ETH` },
                  { label: 'Gas Used', value: `${displayBlock.gasUsed.toLocaleString()} / ${displayBlock.gasLimit.toLocaleString()}` },
                  { label: 'Transactions', value: displayBlock.transactionCount },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-2 bg-gray-700/50 rounded border border-gray-600/50"
                  >
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm font-semibold text-saffron">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Hashes */}
              <div className="mt-4 space-y-2 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
                {[
                  { label: 'Block Hash', value: displayBlock.hash },
                  { label: 'Previous Hash', value: displayBlock.previousHash },
                ].map((item, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <div className="flex gap-2 items-center">
                      <code className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded font-mono flex-1 truncate">
                        {item.value}
                      </code>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigator.clipboard.writeText(item.value)}
                        className="p-1 hover:bg-white/10 rounded transition"
                      >
                        <Copy size={14} className="text-gray-400 hover:text-gray-300" />
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <TransactionTimeline transactions={allTransactions} />
          </motion.div>
        )}

        {activeTab === 'network' && (
          <motion.div
            key="network"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ValidationNodeMap />
          </motion.div>
        )}

        {activeTab === 'contract' && (
          <motion.div
            key="contract"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <SmartContractViewer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
