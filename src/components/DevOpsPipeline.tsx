'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PipelineStage {
  id: string;
  name: string;
  status: 'success' | 'running' | 'failed' | 'pending';
  duration?: number;
  logs?: string[];
}

interface Pipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  lastUpdated: Date;
  workflowId: string; // GitHub Actions workflow ID
  repo: string; // Repository name in format "owner/repo"
}

export default function DevOpsPipeline() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [runningPipelines, setRunningPipelines] = useState<Set<string>>(new Set());
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: '1',
      name: 'Personal Website',
      lastUpdated: new Date(),
      workflowId: 'deploy.yml',
      repo: 'your-username/webfolio',
      stages: [
        { id: 'build', name: 'Build', status: 'success', duration: 45 },
        { id: 'test', name: 'Test', status: 'success', duration: 30 },
        { id: 'deploy', name: 'Deploy', status: 'running', duration: 20 },
      ],
    },
    {
      id: '2',
      name: 'Portfolio API',
      lastUpdated: new Date(),
      workflowId: 'api-deploy.yml',
      repo: 'your-username/portfolio-api',
      stages: [
        { id: 'build', name: 'Build', status: 'success', duration: 35 },
        { id: 'test', name: 'Test', status: 'running', duration: 15 },
        { id: 'deploy', name: 'Deploy', status: 'pending' },
      ],
    },
  ]);

  const getStatusColor = (status: PipelineStage['status']) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'running':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const triggerPipeline = async (pipeline: Pipeline) => {
    try {
      setRunningPipelines(prev => new Set(prev).add(pipeline.id));
      
      const response = await fetch('/api/github/trigger-workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repo: pipeline.repo,
          workflowId: pipeline.workflowId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to trigger workflow');
      }

      // Update pipeline status to show it's running
      setPipelines(prev => prev.map(p => 
        p.id === pipeline.id 
          ? {
              ...p,
              stages: p.stages.map(s => ({ ...s, status: 'running' })),
              lastUpdated: new Date(),
            }
          : p
      ));

    } catch (error) {
      console.error('Error triggering pipeline:', error);
      alert('Failed to trigger pipeline. Please try again.');
    } finally {
      setRunningPipelines(prev => {
        const next = new Set(prev);
        next.delete(pipeline.id);
        return next;
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">DevOps Pipeline Visualizer</h2>
      
      <div className="space-y-8">
        {pipelines.map((pipeline) => (
          <div key={pipeline.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">{pipeline.name}</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Last updated: {pipeline.lastUpdated.toLocaleTimeString()}
                </span>
                <button
                  onClick={() => triggerPipeline(pipeline)}
                  disabled={runningPipelines.has(pipeline.id)}
                  className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                    runningPipelines.has(pipeline.id)
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {runningPipelines.has(pipeline.id) ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Running...
                    </span>
                  ) : (
                    'Run Pipeline'
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {pipeline.stages.map((stage) => (
                <motion.div
                  key={stage.id}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-1 p-4 rounded-lg cursor-pointer transition-all ${
                    selectedStage === stage.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedStage(stage.id)}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(stage.status)}`} />
                    <span className="font-medium text-gray-700">{stage.name}</span>
                  </div>
                  {stage.duration && (
                    <p className="text-sm text-gray-500 mt-2">
                      Duration: {stage.duration}s
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedStage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-6 rounded-t-lg"
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Stage Details</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm text-gray-700">
                {`[INFO] Running stage: ${selectedStage}
[INFO] Checking dependencies...
[INFO] Running tests...
[INFO] Stage completed successfully`}
              </pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 