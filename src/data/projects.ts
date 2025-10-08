export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  status: 'active' | 'maintenance' | 'archived';
  githubUrl?: string;
  liveUrl?: string;
  details: {
    architecture: string;
    deployment: string;
    challenges: string[];
    solutions: string[];
  };
}

export const projects: Project[] = [
  {
    id: 'kubernetes-cluster',
    title: 'Kubernetes Cluster Management',
    description: 'Automated Kubernetes cluster deployment and management system with monitoring and scaling capabilities.',
    image: '/images/kubernetes.png',
    technologies: [
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'Terraform', icon: 'terraform' },
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Grafana', icon: 'grafana' }
    ],
    status: 'active',
    githubUrl: 'https://github.com/yourusername/kubernetes-cluster',
    liveUrl: 'https://cluster-demo.example.com',
    details: {
      architecture: 'Multi-node Kubernetes cluster with high availability setup',
      deployment: 'Automated deployment using Terraform and Ansible',
      challenges: [
        'Managing cluster scaling and resource allocation',
        'Implementing secure service mesh',
        'Setting up automated monitoring and alerting'
      ],
      solutions: [
        'Implemented horizontal pod autoscaling',
        'Deployed Istio for service mesh',
        'Integrated Prometheus and Grafana for monitoring'
      ]
    }
  },
  {
    id: 'ci-cd-pipeline',
    title: 'CI/CD Pipeline Automation',
    description: 'End-to-end CI/CD pipeline implementation with automated testing, building, and deployment.',
    image: '/images/cicd.png',
    technologies: [
      { name: 'Jenkins', icon: 'jenkins' },
      { name: 'Docker', icon: 'docker' },
      { name: 'AWS', icon: 'aws' },
      { name: 'SonarQube', icon: 'sonarqube' }
    ],
    status: 'active',
    githubUrl: 'https://github.com/yourusername/ci-cd-pipeline',
    details: {
      architecture: 'Multi-stage pipeline with parallel execution',
      deployment: 'Infrastructure as Code using Terraform',
      challenges: [
        'Reducing build and deployment times',
        'Implementing comprehensive testing',
        'Managing environment configurations'
      ],
      solutions: [
        'Implemented parallel job execution',
        'Added automated unit and integration tests',
        'Created environment-specific configuration management'
      ]
    }
  },
  {
    id: 'monitoring-system',
    title: 'Distributed Monitoring System',
    description: 'Real-time monitoring and alerting system for distributed applications and infrastructure.',
    image: '/images/kubernetes.png',
    technologies: [
      { name: 'Prometheus', icon: 'prometheus' },
      { name: 'Grafana', icon: 'grafana' },
      { name: 'AlertManager', icon: 'alertmanager' },
      { name: 'Node Exporter', icon: 'node-exporter' }
    ],
    status: 'maintenance',
    githubUrl: 'https://github.com/yourusername/monitoring-system',
    liveUrl: 'https://monitoring-demo.example.com',
    details: {
      architecture: 'Distributed monitoring with high availability',
      deployment: 'Containerized deployment with Docker',
      challenges: [
        'Handling high volume of metrics',
        'Setting up reliable alerting',
        'Creating meaningful dashboards'
      ],
      solutions: [
        'Implemented metric aggregation',
        'Created multi-level alerting system',
        'Designed custom Grafana dashboards'
      ]
    }
  },
  {
    id: 'AI-Model-Generator',
    title: 'AI Model Generator',
    description: 'Automated Kubernetes cluster deployment and management system with monitoring and scaling capabilities.',
    image: '/images/model.png',
    technologies: [
      { name: 'Next.js', icon: 'Next.js' },
      { name: 'Python', icon: 'Python' },
      { name: 'Redis', icon: 'Redis' },
      { name: 'RabbitMQ', icon: 'RabbitMQ' },
      { name: 'Containerization', icon: 'Containerization' }
    ],
    status: 'active',
    githubUrl: 'https://github.com/chowzler/modelAI',
    liveUrl: 'https://model.mallama.site',
    details: {
      architecture: 'Microservices: decoupled Next.js frontend & Flask backend',
      deployment: 'Automated deployment using Terraform and Ansible',
      challenges: [
        'Managing cluster scaling and resource allocation',
        'Implementing secure service mesh',
        'Setting up automated monitoring and alerting'
      ],
      solutions: [
        'Implemented horizontal pod autoscaling',
        'Deployed Istio for service mesh',
        'Integrated Prometheus and Grafana for monitoring'
      ]
    }
  }
]; 