import { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import Hero from '@/components/Hero'
import { projects } from '@/data/projects'
import LogoLoop from '../components/LogoLoop'
import { SiPrometheus, SiKubernetes, SiGithub, SiDocker, SiTerraform } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'DevOps Portfolio',
  description: 'A showcase of DevOps projects and infrastructure solutions',
}

const techLogos = [
  { node: <SiPrometheus />, title: "React", href: "https://react.dev" },
  { node: <SiKubernetes />, title: "Next.js", href: "https://nextjs.org" },
  { node: <FaAws />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiGithub />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiDocker />    , title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiTerraform />    , title: "Tailwind CSS", href: "https://tailwindcss.com" },

];

// Alternative with image sources
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Hero />
      <div className="mx-auto h-[200px] w-[85vw] relative overflow-hidden">
      <LogoLoop
          logos={techLogos}
          speed={150}
          direction="left"
          logoHeight={60}
          gap={60}
          hoverSpeed={140}
          scaleOnHover
          fadeOut
          // fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
          </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-[1px] pb-10" id="devops-portfolio">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            DevOps Portfolio
          </h1>
          <p className="text-xl text-gray-300 mb-0">
            Exploring innovative infrastructure solutions and deployment strategies.
          </p>
        </div>

        {/* Projects Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}
