import { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import Hero from '@/components/Hero'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'DevOps Portfolio',
  description: 'A showcase of DevOps projects and infrastructure solutions',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Hero />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            DevOps Portfolio
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Exploring innovative infrastructure solutions and deployment strategies.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
