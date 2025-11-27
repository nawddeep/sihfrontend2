import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ArrowRight, Shield } from 'lucide-react';

export default function TransactionTimeline({ transactions = [] }) {
    if (!transactions.length) {
        return (
            <div className="p-4 text-center text-gray-500">
                No transactions found for this document.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">Transaction History</h3>
            </div>

            <div className="relative border-l-2 border-blue-200 dark:border-blue-800 ml-3 space-y-8 pb-4">
                {transactions.map((tx, index) => (
                    <motion.div
                        key={tx.hash || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900" />

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${tx.status === 'confirmed'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                        {tx.status}
                                    </span>
                                    <span className="text-xs text-gray-500 font-mono">
                                        {new Date(tx.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-500 font-mono">
                                    <Shield className="w-3 h-3" />
                                    Hash: {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-8)}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 mb-3">
                                <div className="flex-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-100 dark:border-gray-600">
                                    <span className="text-xs text-gray-500 block">From</span>
                                    <span className="font-mono text-xs truncate block">{tx.from}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <div className="flex-1 p-2 bg-gray-50 dark:bg-gray-700/50 rounded border border-gray-100 dark:border-gray-600">
                                    <span className="text-xs text-gray-500 block">To</span>
                                    <span className="font-mono text-xs truncate block">{tx.to}</span>
                                </div>
                            </div>

                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                <p>Action: <span className="font-semibold">{tx.action || 'Document Verification'}</span></p>
                                {tx.gasUsed && <p>Gas Used: {tx.gasUsed}</p>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
