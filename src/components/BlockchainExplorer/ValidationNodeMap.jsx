import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Globe, Activity } from 'lucide-react';

export default function ValidationNodeMap({ nodes = [] }) {
    // Mock nodes if none provided
    const displayNodes = useMemo(() => {
        if (nodes.length > 0) return nodes;
        return [
            { id: 'N1', location: 'Mumbai', status: 'active', latency: '12ms', type: 'Validator' },
            { id: 'N2', location: 'Delhi', status: 'active', latency: '15ms', type: 'Validator' },
            { id: 'N3', location: 'Bangalore', status: 'active', latency: '18ms', type: 'Storage' },
            { id: 'N4', location: 'Chennai', status: 'syncing', latency: '45ms', type: 'Observer' },
            { id: 'N5', location: 'Hyderabad', status: 'active', latency: '22ms', type: 'Validator' },
        ];
    }, [nodes]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">Validator Network</h3>
                </div>
                <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Active
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        Syncing
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayNodes.map((node, index) => (
                    <motion.div
                        key={node.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 transition-all ${node.status === 'active'
                                ? 'border-green-100 bg-green-50/50 dark:border-green-900/30 dark:bg-green-900/10'
                                : 'border-yellow-100 bg-yellow-50/50 dark:border-yellow-900/30 dark:bg-yellow-900/10'
                            }`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${node.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                    <Server className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 dark:text-white">{node.location}</h4>
                                    <p className="text-xs text-gray-500">{node.id}</p>
                                </div>
                            </div>
                            <ShieldCheck className={`w-4 h-4 ${node.status === 'active' ? 'text-green-500' : 'text-yellow-500'
                                }`} />
                        </div>

                        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex justify-between">
                                <span>Type</span>
                                <span className="font-semibold">{node.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Latency</span>
                                <span className={`font-mono ${parseInt(node.latency) < 20 ? 'text-green-600' : 'text-yellow-600'
                                    }`}>
                                    {node.latency}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mt-2">
                                <motion.div
                                    className={`h-full ${node.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: node.status === 'active' ? '100%' : '60%' }}
                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
