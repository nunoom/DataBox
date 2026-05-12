import Navigation from '@/components/Navigation';
import { Code, Database, Users, Zap, Globe, Heart } from 'lucide-react';
import { type Locale } from '@/lib/i18n';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const isPortuguese = locale === 'pt';

  const features = [
    {
      icon: Code,
      title: isPortuguese ? 'Visualizações Interativas' : 'Interactive Visualizations',
      description: isPortuguese 
        ? 'Veja algoritmos em ação com animações em tempo real e controles interativos.'
        : 'See algorithms in action with real-time animations and interactive controls.',
    },
    {
      icon: Database,
      title: isPortuguese ? 'Estruturas de Dados' : 'Data Structures',
      description: isPortuguese
        ? 'Explore estruturas fundamentais com exemplos práticos e análise de complexidade.'
        : 'Explore fundamental structures with practical examples and complexity analysis.',
    },
    {
      icon: Users,
      title: isPortuguese ? 'Para Estudantes e Profissionais' : 'For Students & Professionals',
      description: isPortuguese
        ? 'Conteúdo adequado tanto para iniciantes quanto para profissionais experientes.'
        : 'Content suitable for both beginners and experienced professionals.',
    },
    {
      icon: Zap,
      title: isPortuguese ? 'Performance em Tempo Real' : 'Real-time Performance',
      description: isPortuguese
        ? 'Analise a performance dos algoritmos com métricas de tempo e espaço.'
        : 'Analyze algorithm performance with time and space complexity metrics.',
    },
    {
      icon: Globe,
      title: isPortuguese ? 'Multilíngue' : 'Multilingual',
      description: isPortuguese
        ? 'Disponível em português e inglês para alcançar mais estudantes.'
        : 'Available in Portuguese and English to reach more students.',
    },
    {
      icon: Heart,
      title: isPortuguese ? 'Código Aberto' : 'Open Source',
      description: isPortuguese
        ? 'Projeto de código aberto construído com tecnologias modernas.'
        : 'Open source project built with modern technologies.',
    },
  ];

  const technologies = [
    { name: 'Next.js', description: isPortuguese ? 'Framework React para produção' : 'React framework for production' },
    { name: 'TypeScript', description: isPortuguese ? 'JavaScript tipado para maior segurança' : 'Typed JavaScript for better safety' },
    { name: 'Tailwind CSS', description: isPortuguese ? 'Framework CSS utilitário' : 'Utility-first CSS framework' },
    { name: 'Framer Motion', description: isPortuguese ? 'Biblioteca de animações' : 'Animation library' },
    { name: 'Lucide React', description: isPortuguese ? 'Ícones modernos' : 'Modern icons' },
    { name: 'next-intl', description: isPortuguese ? 'Internacionalização' : 'Internationalization' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Navigation locale={locale as Locale} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {isPortuguese ? 'Sobre o DataAlgo' : 'About DataAlgo'}
          </h1>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {isPortuguese
              ? 'Uma plataforma educacional moderna e interativa para aprender algoritmos e estruturas de dados essenciais para engenharia de dados. Criada para estudantes e profissionais que desejam visualizar e compreender conceitos fundamentais da ciência da computação.'
              : 'A modern and interactive educational platform for learning algorithms and data structures essential for data engineering. Created for students and professionals who want to visualize and understand fundamental computer science concepts.'
            }
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-primary-900/20 to-blue-900/20 rounded-xl p-8 mb-16 border border-primary-800/30">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {isPortuguese ? 'Nossa Missão' : 'Our Mission'}
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
            {isPortuguese
              ? 'Democratizar o acesso ao conhecimento de algoritmos e estruturas de dados através de visualizações interativas e explicações claras. Acreditamos que a aprendizagem visual e prática é fundamental para compreender conceitos complexos da ciência da computação.'
              : 'Democratize access to algorithms and data structures knowledge through interactive visualizations and clear explanations. We believe that visual and practical learning is fundamental to understanding complex computer science concepts.'
            }
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {isPortuguese ? 'Características' : 'Features'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-dark-600 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technologies Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {isPortuguese ? 'Tecnologias Utilizadas' : 'Technologies Used'}
          </h2>
          <div className="bg-dark-800 rounded-lg p-8 border border-dark-700">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-dark-700 rounded-lg">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-semibold">{tech.name}</h4>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {isPortuguese ? 'Para Quem é Esta Plataforma' : 'Who This Platform Is For'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                {isPortuguese ? 'Estudantes' : 'Students'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Estudantes de Ciência da Computação' : 'Computer Science students'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Estudantes de Engenharia de Dados' : 'Data Engineering students'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Autodidatas em programação' : 'Self-taught programmers'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Preparação para entrevistas técnicas' : 'Technical interview preparation'}</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h3 className="text-xl font-semibold text-white mb-4">
                {isPortuguese ? 'Profissionais' : 'Professionals'}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Engenheiros de Dados' : 'Data Engineers'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Desenvolvedores de Software' : 'Software Developers'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Arquitetos de Sistemas' : 'System Architects'}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>{isPortuguese ? 'Professores e Educadores' : 'Teachers and Educators'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-purple-800/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isPortuguese ? 'Comece Sua Jornada de Aprendizado' : 'Start Your Learning Journey'}
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            {isPortuguese
              ? 'Explore algoritmos e estruturas de dados de forma interativa e visual. Comece com conceitos básicos e avance para tópicos mais complexos.'
              : 'Explore algorithms and data structures in an interactive and visual way. Start with basic concepts and advance to more complex topics.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/algorithms`}
              className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {isPortuguese ? 'Explorar Algoritmos' : 'Explore Algorithms'}
            </a>
            <a
              href={`/${locale}/data-structures`}
              className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {isPortuguese ? 'Ver Estruturas de Dados' : 'View Data Structures'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}