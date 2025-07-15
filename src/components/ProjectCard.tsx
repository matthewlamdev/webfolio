'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Technology {
  name: string;
  icon: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  status: 'active' | 'maintenance' | 'archived';
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  technologies,
  status,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: 'bg-green-500',
    maintenance: 'bg-yellow-500',
    archived: 'bg-gray-500',
  };

  return (
    <div
      className="relative group bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        </div>
        
        <p className="text-gray-300 mb-4">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1 text-sm bg-gray-700 rounded-full text-gray-300"
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              GitHub →
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Link
            href={`/projects/${id}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
} 