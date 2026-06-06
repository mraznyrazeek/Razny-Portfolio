import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navbar */}
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-xl font-bold tracking-tight text-white">
            Razny<span className="text-cyan-400">.</span>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            <a href="#about" className="text-sm text-slate-300 transition hover:text-cyan-400">About</a>
            <a href="#skills" className="text-sm text-slate-300 transition hover:text-cyan-400">Skills</a>
            <a href="#experience" className="text-sm text-slate-300 transition hover:text-cyan-400">Experience</a>
            <a href="#projects" className="text-sm text-slate-300 transition hover:text-cyan-400">Projects</a>
            <a href="#research" className="text-sm text-slate-300 transition hover:text-cyan-400">Research</a>
            <a href="#contact" className="text-sm text-slate-300 transition hover:text-cyan-400">Contact</a>
          </div>

          <a
            href="mailto:mraznyrazeek@gmail.com"
            className="rounded-full border border-cyan-400/50 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            Contact
          </a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.18),_transparent_35%)]" />

          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
                Full-Stack Software Engineer
              </p>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Hi, I’m Razny Razeek.
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  I build scalable software and data-driven systems.
                </span>
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
                Full-Stack Software Engineer with 4+ years of experience building
                production-ready web applications, REST APIs, ETL pipelines,
                reporting systems, and cloud-supported software solutions. I hold
                an MSc in Data Science and I am preparing for PhD research in AI,
                NLP, LLMs, AI Safety, and Trustworthy AI.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  View Projects
                </a>

                <a
                  href="https://linkedin.com/in/raznyrazeek"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
                >
                  LinkedIn
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {['.NET Core', 'React', 'SQL Server', 'Azure', 'SSIS', 'SSRS', 'Python', 'NLP', 'LLMs'].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur">
              <div className="rounded-2xl bg-slate-900 p-6">
                <p className="mb-4 text-sm text-slate-400">Current Focus</p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-4">
                    <h3 className="font-semibold text-cyan-300">Software Engineering</h3>
                    <p className="mt-2 text-sm text-slate-300">
                      .NET Core, React, SQL Server, REST APIs, Azure, CI/CD
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-400/20 bg-blue-400/10 p-4">
                    <h3 className="font-semibold text-blue-300">Data & AI Research</h3>
                    <p className="mt-2 text-sm text-slate-300">
                      NLP, Machine Learning, BERT, LLMs, AI Safety, Trustworthy AI
                    </p>
                  </div>

                  <div className="rounded-xl border border-violet-400/20 bg-violet-400/10 p-4">
                    <h3 className="font-semibold text-violet-300">PhD Direction</h3>
                    <p className="mt-2 text-sm text-slate-300">
                      Reliable, secure, explainable, and scalable AI systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                I am a Full-Stack Software Engineer with over four years of
                commercial experience designing, developing, and maintaining scalable
                web and data-driven applications. My technical background includes
                C#, .NET Core, ASP.NET Core, React, Angular, SQL Server, SSIS, SSRS,
                Azure, Docker, GitHub Actions, IIS deployments, and CI/CD pipelines.
              </p>

              <p className="text-lg leading-8 text-slate-300">
                Alongside my software engineering experience, I hold an MSc in Data
                Science and a BEng Honours degree in Software Engineering. My academic
                and research interests focus on Artificial Intelligence, Natural
                Language Processing, Large Language Models, Trustworthy AI, AI Safety,
                AI Security, and scalable AI software systems.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-cyan-400">4+</h3>
                <p className="mt-2 text-slate-300">Years commercial experience</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-cyan-400">70%</h3>
                <p className="mt-2 text-slate-300">Manual reporting workload reduced</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-3xl font-bold text-cyan-400">50%</h3>
                <p className="mt-2 text-slate-300">Database performance improvement</p>
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
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
        >
          <h3 className="mb-4 text-xl font-bold text-white">
            {category.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* Contact */}
        <section id="contact" className="px-6 py-24">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Contact
            </p>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Let’s Connect
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              I am open to software engineering opportunities, AI research
              collaborations, PhD discussions, and technical projects.
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