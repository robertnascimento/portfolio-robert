/**
 * Dados dos projetos para exibição no portfólio.
 * Atualize este arquivo para adicionar, editar ou remover projetos.
 *
 * Estrutura de cada projeto:
 *   id              — identificador único
 *   title           — título exibido no card
 *   shortDescription — texto curto para o card (≈ 2 linhas)
 *   technologies    — array de tecnologias usadas
 *   client          — cliente ou instituição
 *   role            — função exercida no projeto
 *   githubUrl       — link para o repositório (use '#' se privado)
 *   demoUrl         — link para demonstração ao vivo (null se não houver)
 *   featured        — destaque visual no grid
 */

export const projects = [
  {
    id: 1,
    title: 'SISCO – Sistema de Gestão de Obras',
    shortDescription:
      'Sistema corporativo para gerenciamento de obras e contratos da Equatorial Energia, com controle de processos, medições, cronogramas e fluxos de aprovação completos.',
    technologies: ['Vue 3', 'C# .NET', 'PostgreSQL'],
    client: 'Equatorial Energia',
    role: 'Fullstack & Deploy',
    githubUrl: '#',
    demoUrl: null,
    featured: true
  },
  {
    id: 2,
    title: 'AGROSOFT – Estufas Inteligentes',
    shortDescription:
      'Plataforma para monitoramento e controle de estufas agrícolas, com CRUD completo de sensores, atuadores e gestão de usuários em tempo real. Publicada na SECITEX 2023.',
    technologies: ['Angular', 'JS', 'MongoDB'],
    client: 'IFRN – Projeto Acadêmico',
    role: 'Fullstack Developer',
    githubUrl: '#',
    demoUrl: null,
    featured: true
  },
  {
    id: 3,
    title: 'NIC – Núcleo de Inovação Tecnológica',
    shortDescription:
      'Sistema web para gerenciamento de solicitações de hospedagem e subdomínios no VPS do NIC/IFRN, substituindo o fluxo por e-mail e distribuindo a administração do servidor entre alunos capacitados.',
    technologies: ['Python', 'Django', 'MySQL'],
    client: 'IFRN – C. Canguaretama',
    role: 'Backend Developer',
    githubUrl: '#',
    demoUrl: null,
    featured: false
  }
]
