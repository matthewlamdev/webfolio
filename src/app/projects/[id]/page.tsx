import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - DevOps Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
        >
          ← Back to Projects
        </Link>

        {/* Project Header */}
        <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-300">{project.description}</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Technologies */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="px-4 py-2 bg-gray-700 rounded-full text-gray-300"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Architecture</h2>
            <p className="text-gray-300">{project.details.architecture}</p>
          </div>

          {/* Challenges */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Challenges</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {project.details.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Solutions</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {project.details.solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Links */}
        <div className="mt-8 flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </main>
  );
} 