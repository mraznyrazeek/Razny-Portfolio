import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Code2,
  Database,
  Download,
  ExternalLink,
  Menu,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'

const navLinks = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Research', '#research'],
  ['Education', '#education'],
  ['Contact', '#contact'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const heroStats = [
  { value: '4+', label: 'Years Experience' },
  { value: '70%', label: 'Reporting Automation' },
  { value: '50%', label: 'DB Performance Gain' },
]

const orbitSkills = [
  '.NET',
  'React',
  'SQL',
  'Azure',
  'NLP',
  'LLMs',
  'SSIS',
  'Python',
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-xl font-bold tracking-tight text-white">
            Razny<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-slate-300 transition hover:text-cyan-400"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:mraznyrazeek@gmail.com"
              className="hidden rounded-full border border-cyan-400/50 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 sm:inline-flex"
            >
              Contact
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-slate-950 px-6 py-4 lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-4">
              {navLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-slate-300 transition hover:bg-white/5 hover:text-cyan-400"
                >
                  {label}
                </a>
              ))}

              <a
                href="mailto:mraznyrazeek@gmail.com"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl bg-cyan-400 px-4 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Email Me
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg" />

          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute right-[-120px] top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <motion.div
            animate={{
              x: [0, -35, 0],
              y: [0, 35, 0],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-12 left-[-140px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
          />

          <div className="noise-bg" />

          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
              >
                <Sparkles size={16} />
                Full-Stack Software Engineer · MSc Data Science · AI Research Direction
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
              >
                Building scalable software,
                <span className="block text-gradient">
                  data systems & trustworthy AI solutions.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-2xl text-lg leading-8 text-slate-300"
              >
                Hi, I’m <span className="font-semibold text-white">Razny Razeek</span> —
                a Full-Stack Software Engineer with 4+ years of experience building
                production-ready web applications, REST APIs, ETL pipelines, reporting
                automation, and cloud-supported systems. I also hold an MSc in Data
                Science and I am preparing for PhD research in AI, NLP, LLMs, AI Safety,
                and Trustworthy AI.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
                >
                  View Projects
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>

                <a
                  href="/documents/Razny-Razeek-CV.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  <Download size={18} />
                  Download CV
                </a>

                <a
                  href="https://linkedin.com/in/raznyrazeek"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  <ExternalLink size={18} />
LinkedIn
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid max-w-2xl grid-cols-3 gap-3"
              >
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
                  >
                    <p className="text-2xl font-black text-cyan-300">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Professional Identity</p>
                    <h2 className="mt-1 text-2xl font-bold text-white">
                      Software + Data + AI
                    </h2>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
                    <Brain size={28} />
                  </div>
                </div>

                <div className="relative mx-auto my-8 flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-slate-950/70">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-6 rounded-full border border-dashed border-cyan-400/25"
                  />

                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-12 rounded-full border border-dashed border-violet-400/25"
                  />

                  <div className="z-10 rounded-3xl border border-white/10 bg-white/[0.07] p-6 text-center backdrop-blur">
                    <p className="text-4xl font-black text-gradient">RR</p>
                    <p className="mt-2 text-sm text-slate-300">Razny Razeek</p>
                  </div>

                  {orbitSkills.map((skill, index) => {
                    const angle = (index / orbitSkills.length) * Math.PI * 2
                    const radius = 132
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.08 }}
                        className="absolute rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs font-semibold text-cyan-200 shadow-lg shadow-cyan-950/40"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                      >
                        {skill}
                      </motion.div>
                    )
                  })}
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      icon: Code2,
                      title: 'Engineering',
                      text: '.NET Core, React, REST APIs, Clean Architecture',
                    },
                    {
                      icon: Database,
                      title: 'Data Systems',
                      text: 'SQL Server, SSIS, SSRS, ETL, Reporting Automation',
                    },
                    {
                      icon: ShieldCheck,
                      title: 'AI Research',
                      text: 'LLMs, NLP, AI Safety, Trustworthy AI, AI Security',
                    },
                  ].map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                      >
                        <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                          <Icon size={20} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-400">{item.text}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              About Me
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Software Engineering, Data Science, and AI Research Direction
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-lg leading-8 text-slate-300">
                I am a Full-Stack Software Engineer with over four years of commercial
                experience designing, developing, and maintaining scalable web and
                data-driven applications. My technical background includes C#, .NET Core,
                ASP.NET Core, React, Angular, SQL Server, SSIS, SSRS, Azure, Docker,
                GitHub Actions, IIS deployments, and CI/CD pipelines.
              </p>

              <p className="text-lg leading-8 text-slate-300">
                Alongside my software engineering experience, I hold an MSc in Data
                Science and a BEng Honours degree in Software Engineering. My academic
                and research interests focus on Artificial Intelligence, Natural Language
                Processing, Large Language Models, Trustworthy AI, AI Safety, AI Security,
                and scalable AI software systems.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-cyan-400">4+</h3>
                <p className="mt-2 text-slate-300">Years commercial experience</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-cyan-400">70%</h3>
                <p className="mt-2 text-slate-300">
                  Manual reporting workload reduced
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-cyan-400">50%</h3>
                <p className="mt-2 text-slate-300">
                  Database performance improvement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="bg-slate-900/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Skills
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Technical Skills
            </h2>

            <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-300">
              A practical full-stack skill set covering backend development, frontend
              engineering, databases, data integration, reporting automation, cloud
              deployment, DevOps, and AI/data science workflows.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Backend Development',
                  skills: [
                    'C#',
                    '.NET Core',
                    'ASP.NET Core',
                    'ASP.NET MVC',
                    'RESTful APIs',
                    'Entity Framework Core',
                    'LINQ',
                    'Microservices',
                  ],
                },
                {
                  title: 'Frontend Development',
                  skills: [
                    'React',
                    'Angular',
                    'Next.js',
                    'Blazor',
                    'JavaScript',
                    'TypeScript',
                    'Tailwind CSS',
                    'Bootstrap',
                  ],
                },
                {
                  title: 'Databases',
                  skills: [
                    'SQL Server',
                    'PostgreSQL',
                    'MySQL',
                    'MongoDB',
                    'SQLite',
                    'T-SQL',
                    'Stored Procedures',
                    'Index Optimisation',
                  ],
                },
                {
                  title: 'Data & Reporting',
                  skills: [
                    'SSIS',
                    'SSRS',
                    'ETL Pipelines',
                    'SQL Server Agent',
                    'JSON Processing',
                    'XML Processing',
                    'CSV Processing',
                    'XSLT / XPath',
                  ],
                },
                {
                  title: 'Cloud & DevOps',
                  skills: [
                    'Microsoft Azure',
                    'Azure Functions',
                    'Azure SQL',
                    'Docker',
                    'Git',
                    'GitHub Actions',
                    'CI/CD Pipelines',
                    'IIS Deployment',
                  ],
                },
                {
                  title: 'AI & Data Science',
                  skills: [
                    'Python',
                    'Machine Learning',
                    'NLP',
                    'BERT',
                    'scikit-learn',
                    'NLTK',
                    'Pandas',
                    'NumPy',
                  ],
                },
                {
                  title: 'Architecture & Practices',
                  skills: [
                    'Clean Architecture',
                    'SOLID Principles',
                    'REST API Design',
                    'Unit Testing',
                    'Integration Testing',
                    'Agile/Scrum',
                    'Code Refactoring',
                    'Production Support',
                  ],
                },
                {
                  title: 'Research Interests',
                  skills: [
                    'Large Language Models',
                    'Trustworthy AI',
                    'AI Safety',
                    'AI Security',
                    'Adversarial Robustness',
                    'Agentic AI Systems',
                    'Scalable AI Systems',
                    'Responsible AI',
                  ],
                },
                {
                  title: 'Core Strengths',
                  skills: [
                    'Problem Solving',
                    'System Design',
                    'Database Optimisation',
                    'Automation',
                    'Technical Documentation',
                    'Team Collaboration',
                    'Debugging',
                    'Continuous Learning',
                  ],
                },
              ].map((category) => (
                <div
                  key={category.title}
                  className="glow-card rounded-2xl border border-white/10 bg-white/[0.03] p-[1px] transition hover:-translate-y-1"
                >
                  <div className="h-full rounded-2xl bg-slate-950/90 p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">
                      {category.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-sm text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Experience
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Professional Experience
            </h2>

            <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-300">
              Commercial software engineering experience across full-stack development,
              REST API design, database optimisation, ETL pipelines, reporting automation,
              cloud deployment, and production support.
            </p>

            <div className="space-y-6">
              {[
                {
                  role: 'Full-Stack Developer',
                  company: 'Spicehaart',
                  location: 'Colchester, United Kingdom',
                  period: 'Sept 2024 – Present',
                  highlights: [
                    'Built scalable .NET Core REST APIs, Windows Services, and microservices for business-critical platforms and third-party integrations.',
                    'Developed commercial web applications using React, Angular, and Next.js, improving responsiveness and user experience.',
                    'Optimised T-SQL queries, stored procedures, functions, and indexes, improving database performance by up to 50%.',
                    'Built SSIS ETL pipelines to process large-scale JSON, XML, and CSV data into centralised systems.',
                    'Created and automated SSRS reports for financial, marketing, operational, and commission-based reporting using SQL Server Agent.',
                    'Implemented GitHub Actions CI/CD pipelines, supported Azure deployments, and managed IIS production deployments.',
                  ],
                },
                {
                  role: 'Full-Stack Developer',
                  company: 'Self-Employed',
                  location: 'Bristol, United Kingdom · Remote',
                  period: 'Apr 2024 – Sept 2024',
                  highlights: [
                    'Developed RESTful APIs and secured web integrations using JWT authentication.',
                    'Built frontend features using React, Blazor, and ASP.NET Core to support business requirements.',
                    'Took ownership of existing full-stack codebases, debugging .NET Core and frontend issues.',
                    'Refactored code flows and improved maintainability using clean architecture principles.',
                    'Built and optimised MySQL queries and indexes, improving database performance by 25%.',
                    'Wrote unit and integration tests to improve system reliability.',
                  ],
                },
                {
                  role: 'Software Developer',
                  company: '24K Tech Solutions',
                  location: 'Sri Lanka',
                  period: 'Jul 2021 – Nov 2022',
                  highlights: [
                    'Developed and maintained applications using C#, ASP.NET Core, ASP.NET MVC, Web Forms, Razor Pages, WinForms, .NET Framework, and .NET Core.',
                    'Built responsive frontend features using Angular, JavaScript, Bootstrap, Tailwind CSS, HTML, and CSS.',
                    'Designed database schemas, queries, stored procedures, and indexes across SQL Server, MySQL, and SQLite.',
                    'Processed, transformed, and integrated XML data using XSLT and XPath within enterprise applications.',
                    'Built reusable backend modules and application components following SOLID principles.',
                    'Maintained e-commerce platforms, delivering new features, bug fixes, production-ready pages, and IIS deployments.',
                  ],
                },
              ].map((job) => (
                <div
                  key={`${job.company}-${job.period}`}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/40 hover:bg-white/[0.06] md:p-8"
                >
                  <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                      <p className="mt-1 text-lg text-cyan-300">{job.company}</p>
                      <p className="mt-1 text-sm text-slate-400">{job.location}</p>
                    </div>

                    <span className="w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
                      {job.period}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {job.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span className="leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="bg-slate-900/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Projects
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Selected Projects
            </h2>

            <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-300">
              A selection of software engineering, data engineering, and AI/data science
              projects demonstrating full-stack development, scalable search, reporting
              automation, NLP, machine learning, and production-focused problem solving.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: 'Global Bitcoin Sentiment & Volatility Modelling',
                  type: 'MSc Dissertation · AI / NLP / Machine Learning',
                  description:
                    'Conducted large-scale NLP and machine learning analysis on 500K–750K Bitcoin-related records to investigate sentiment trends and their relationship with cryptocurrency volatility. Compared lexicon-based, vector-based, traditional machine learning, and transformer-based methods including BERT.',
                  tech: [
                    'Python',
                    'scikit-learn',
                    'NLTK',
                    'BERT',
                    'Pandas',
                    'NumPy',
                    'NLP',
                    'Time-Series',
                  ],
                  highlights: [
                    'Processed large-scale textual datasets from authorised sources and GDELT.',
                    'Compared SVM, Random Forest, Gradient Boosting, and BERT models.',
                    'Explored sentiment impact on Bitcoin price and volatility before and after the pandemic.',
                  ],
                },
                {
                  title: 'Product Search & Catalog Platform',
                  type: 'Full-Stack Search System',
                  description:
                    'Built a scalable product search and catalog platform to ingest, clean, structure, and synchronise bulk external product datasets into a relational model with Elasticsearch-powered filtering and real-time search.',
                  tech: [
                    '.NET',
                    'React',
                    'PostgreSQL',
                    'Elasticsearch',
                    'REST APIs',
                    'Data Processing',
                  ],
                  highlights: [
                    'Designed APIs for high-volume product search operations.',
                    'Implemented data cleaning and relational product modelling workflows.',
                    'Integrated Elasticsearch for fast filtering and product discovery.',
                  ],
                },
                {
                  title: 'LesiBuy E-Commerce Platform',
                  type: 'Full-Stack E-Commerce Application',
                  description:
                    'Developed a full-stack e-commerce platform with product management, filtering, authentication, secure REST APIs, and optimised data handling to improve scalability, performance, and user experience.',
                  tech: [
                    'ASP.NET Core',
                    'Entity Framework Core',
                    'Angular',
                    'SQL Server',
                    'REST APIs',
                    'Authentication',
                  ],
                  highlights: [
                    'Built product management and filtering features.',
                    'Implemented secure REST APIs and authentication.',
                    'Optimised data access and application performance.',
                  ],
                },
                {
                  title: 'Enterprise Reporting & ETL Automation',
                  type: 'Commercial Data Automation',
                  description:
                    'Designed reporting and ETL automation workflows using SSRS, SSIS, SQL Server Agent, and SQL Server optimisation techniques to reduce manual reporting workload and improve data processing efficiency.',
                  tech: [
                    'SSRS',
                    'SSIS',
                    'SQL Server',
                    'SQL Server Agent',
                    'T-SQL',
                    'ETL',
                  ],
                  highlights: [
                    'Reduced manual reporting workload by 70%.',
                    'Improved database performance by up to 50%.',
                    'Reduced data latency by 60% through automated ETL pipelines.',
                  ],
                },
              ].map((project) => (
                <article
                  key={project.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06] md:p-8"
                >
                  <div className="mb-4">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {project.type}
                    </span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-cyan-300">
                    {project.title}
                  </h3>

                  <p className="mb-6 leading-7 text-slate-300">
                    {project.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-3">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span className="leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Research */}
        <section id="research" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Research
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Research Direction
            </h2>

            <p className="mb-12 max-w-4xl text-lg leading-8 text-slate-300">
              My research interests focus on the safety, reliability, and scalability of
              modern AI systems, particularly Large Language Models and NLP-based
              applications. I am preparing for PhD opportunities where I can contribute
              to research on trustworthy, secure, explainable, and responsible AI systems.
            </p>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'Large Language Models & NLP',
                  description:
                    'Exploring how language models understand, generate, evaluate, and reason over natural language, with a focus on reliable NLP applications and model behaviour.',
                  topics: [
                    'Large Language Models',
                    'Natural Language Processing',
                    'BERT',
                    'Sentiment Analysis',
                    'Transformer Models',
                    'Text Classification',
                  ],
                },
                {
                  title: 'Trustworthy AI & AI Safety',
                  description:
                    'Investigating how AI systems can be made safer, more reliable, explainable, and dependable when deployed in real-world environments.',
                  topics: [
                    'Trustworthy AI',
                    'AI Safety',
                    'Explainability',
                    'Responsible AI',
                    'Model Reliability',
                    'Human-Centred AI',
                  ],
                },
                {
                  title: 'AI Security & Robustness',
                  description:
                    'Studying risks around adversarial attacks, prompt-based vulnerabilities, jailbreaking, and security challenges in LLM-powered systems.',
                  topics: [
                    'AI Security',
                    'Adversarial Robustness',
                    'Prompt Attacks',
                    'Jailbreaking',
                    'Safety Layers',
                    'Secure AI Systems',
                  ],
                },
              ].map((area) => (
                <div
                  key={area.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
                >
                  <h3 className="mb-4 text-xl font-bold text-white">{area.title}</h3>

                  <p className="mb-6 leading-7 text-slate-300">
                    {area.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {area.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-300"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 md:p-8">
              <h3 className="mb-4 text-2xl font-bold text-white">
                PhD Research Goal
              </h3>

              <p className="max-w-4xl text-lg leading-8 text-slate-300">
                My long-term goal is to contribute to research that makes AI systems more
                reliable, secure, explainable, and trustworthy, especially in the context
                of Large Language Models and intelligent software systems. I am particularly
                interested in how software engineering principles can improve the design,
                testing, monitoring, governance, and responsible deployment of AI systems.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="bg-slate-900/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Education
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Education & Certifications
            </h2>

            <p className="mb-12 max-w-3xl text-lg leading-8 text-slate-300">
              Academic background in software engineering and data science, supported by
              cloud and software development certifications.
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  degree: 'MSc Data Science',
                  result: 'Merit',
                  university: 'University of the West of England',
                  location: 'Bristol, United Kingdom',
                  period: 'Jan 2023 – Mar 2024',
                  details: [
                    'Focused on data science, machine learning, NLP, statistical analysis, and applied research.',
                    'Completed dissertation on Global Bitcoin Sentiment and Volatility Modelling using NLP and Machine Learning.',
                    'Worked with large-scale text data, traditional ML models, transformer-based methods, and time-series analysis.',
                  ],
                },
                {
                  degree: 'BEng (Hons) Software Engineering',
                  result: 'Upper Second Class Honours',
                  university: 'London Metropolitan University',
                  location: 'London, United Kingdom',
                  period: 'Sept 2018 – Nov 2021',
                  details: [
                    'Built a strong foundation in programming, system design, databases, algorithms, and software development principles.',
                    'Developed practical software engineering skills across web development, backend systems, and database design.',
                    'Strengthened understanding of scalable software design and professional development practices.',
                  ],
                },
              ].map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/40 hover:bg-white/[0.06] md:p-8"
                >
                  <div className="mb-4">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {edu.result}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="mt-2 text-lg text-cyan-300">{edu.university}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {edu.location} · {edu.period}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {edu.details.map((item) => (
                      <li key={item} className="flex gap-3 text-slate-300">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span className="leading-7">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">Certifications</h3>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Microsoft Certified: Azure Fundamentals (AZ-900)',
                  'Version Control & CI/CD Best Practices',
                ].map((certification) => (
                  <div
                    key={certification}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
                  >
                    <p className="font-medium text-slate-200">{certification}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Contact
              </p>

              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Let’s Build Something Meaningful
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                I am open to software engineering opportunities, AI research
                collaborations, PhD discussions, technical projects, and professional
                networking.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:mraznyrazeek@gmail.com"
                  className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Email Me
                </a>

                <a
                  href="https://linkedin.com/in/raznyrazeek"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  LinkedIn
                </a>

                <a
                  href="/documents/Razny-Razeek-CV.pdf"
                  download
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  Download CV
                </a>
              </div>

              <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Email</p>
                  <a
                    href="mailto:mraznyrazeek@gmail.com"
                    className="mt-2 block break-words font-medium text-slate-200 hover:text-cyan-300"
                  >
                    mraznyrazeek@gmail.com
                  </a>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="mt-2 font-medium text-slate-200">
                    Colchester, Essex, United Kingdom
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">LinkedIn</p>
                  <a
                    href="https://linkedin.com/in/raznyrazeek"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block break-words font-medium text-slate-200 hover:text-cyan-300"
                  >
                    linkedin.com/in/raznyrazeek
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Razny Razeek. Built with React and Tailwind CSS.
        </div>
      </footer>
    </div>
  )
}

export default App