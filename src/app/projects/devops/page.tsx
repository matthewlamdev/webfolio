import DevOpsPipeline from '@/components/DevOpsPipeline';

export default function DevOpsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          DevOps Pipeline Visualizer
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          An interactive visualization of CI/CD pipelines showcasing real-time deployment status,
          build processes, and infrastructure monitoring. Click on any stage to view detailed logs
          and metrics.
        </p>
        <DevOpsPipeline />
      </div>
    </main>
  );
} 