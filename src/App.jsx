import { useEffect, useState } from "react";
import profileImage from "./assets/profile.jpg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Cloud,
  CloudRain,
  CloudSun,
  Code2,
  Database,
  Download,
  ExternalLink,
  Menu,
  Moon,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import "./App.css";

const navLinks = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Research", "#research"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const heroStats = [
  { value: "4+", label: "Years Experience" },
  { value: "70%", label: "Reporting Automation" },
  { value: "50%", label: "DB Performance Gain" },
];

const orbitGroups = [
  {
    name: "Engineering",
    radius: 158,
    mobileRadius: 106,
    duration: 24,
    reverse: false,
    items: [
      {
        label: ".NET Core",
        shortLabel: ".NET",
        angle: 20,
        className:
          "border-cyan-400/30 bg-cyan-500/15 text-cyan-100 shadow-cyan-950/40",
      },
      {
        label: "React",
        shortLabel: "React",
        angle: 145,
        className:
          "border-cyan-400/30 bg-cyan-500/15 text-cyan-100 shadow-cyan-950/40",
      },
      {
        label: "REST APIs",
        shortLabel: "APIs",
        angle: 265,
        className:
          "border-cyan-400/30 bg-cyan-500/15 text-cyan-100 shadow-cyan-950/40",
      },
    ],
  },
  {
    name: "Data",
    radius: 118,
    mobileRadius: 76,
    duration: 19,
    reverse: true,
    items: [
      {
        label: "SQL Server",
        shortLabel: "SQL",
        angle: 0,
        className:
          "border-blue-400/30 bg-blue-500/15 text-blue-100 shadow-blue-950/40",
      },
      {
        label: "ETL",
        shortLabel: "ETL",
        angle: 120,
        className:
          "border-blue-400/30 bg-blue-500/15 text-blue-100 shadow-blue-950/40",
      },
      {
        label: "SSRS",
        shortLabel: "SSRS",
        angle: 240,
        className:
          "border-blue-400/30 bg-blue-500/15 text-blue-100 shadow-blue-950/40",
      },
    ],
  },
  {
    name: "AI",
    radius: 78,
    mobileRadius: 48,
    duration: 14,
    reverse: false,
    items: [
      {
        label: "NLP",
        shortLabel: "NLP",
        angle: 35,
        className:
          "border-violet-400/30 bg-violet-500/20 text-violet-100 shadow-violet-950/40",
      },
      {
        label: "LLMs",
        shortLabel: "LLMs",
        angle: 175,
        className:
          "border-violet-400/30 bg-violet-500/20 text-violet-100 shadow-violet-950/40",
      },
      {
        label: "AI Safety",
        shortLabel: "Safety",
        angle: 300,
        className:
          "border-violet-400/30 bg-violet-500/20 text-violet-100 shadow-violet-950/40",
      },
    ],
  },
];

function useIsCompact() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsCompact(window.innerWidth < 640);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isCompact;
}

function WeatherGreeting() {
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("Detecting");

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
        ? "Good Afternoon"
        : hour < 21
          ? "Good Evening"
          : "Good Night";

  const fetchWeather = async (latitude, longitude, place = "Auto detected") => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,is_day`,
      );

      const data = await response.json();

      setWeather({
        place,
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        isDay: data.current.is_day === 1,
      });
    } catch {
      setStatus("Weather unavailable");
    }
  };

  const fetchApproxLocationWeather = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data.latitude && data.longitude) {
        fetchWeather(data.latitude, data.longitude, data.city || "Auto detected");
      } else {
        setStatus("Weather unavailable");
      }
    } catch {
      setStatus("Weather unavailable");
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      fetchApproxLocationWeather();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude, "Auto detected");
      },
      () => {
        fetchApproxLocationWeather();
      },
      {
        enableHighAccuracy: false,
        timeout: 7000,
        maximumAge: 1000 * 60 * 15,
      },
    );
  }, []);

  const getWeatherLabel = (code) => {
    if ([0, 1].includes(code)) return "Clear Sky";
    if ([2].includes(code)) return "Partly Cloudy";
    if ([3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55].includes(code)) return "Drizzle";
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "Rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
    if ([95, 96, 99].includes(code)) return "Stormy";
    return "Live Weather";
  };

  const getWeatherIcon = () => {
    if (!weather) {
      return hour >= 6 && hour < 18 ? <Sun size={18} /> : <Moon size={18} />;
    }

    const code = weather.weatherCode;

    if ([0, 1].includes(code)) {
      return weather.isDay ? <Sun size={18} /> : <Moon size={18} />;
    }

    if ([2].includes(code)) return <CloudSun size={18} />;
    if ([3, 45, 48].includes(code)) return <Cloud size={18} />;

    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
      return <CloudRain size={18} />;
    }

    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return <Snowflake size={18} />;
    }

    return <CloudSun size={18} />;
  };

  const weatherText = weather
    ? `${weather.temperature}°C · ${getWeatherLabel(weather.weatherCode)}`
    : status;

  const iconTone =
    weather && [0, 1].includes(weather.weatherCode)
      ? "border-amber-300/25 bg-amber-400/10 text-amber-300"
      : weather &&
          [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weather.weatherCode)
        ? "border-blue-300/25 bg-blue-400/10 text-blue-300"
        : weather && [71, 73, 75, 77, 85, 86].includes(weather.weatherCode)
          ? "border-sky-200/25 bg-sky-300/10 text-sky-200"
          : "border-cyan-300/25 bg-cyan-400/10 text-cyan-300";

  const weatherTone =
    weather && [0, 1].includes(weather.weatherCode)
      ? "text-amber-200"
      : weather &&
          [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weather.weatherCode)
        ? "text-blue-200"
        : weather && [71, 73, 75, 77, 85, 86].includes(weather.weatherCode)
          ? "text-sky-200"
          : "text-cyan-200";

  return (
    <div className="relative inline-flex max-w-[190px] sm:max-w-none">
      <div className="relative overflow-hidden rounded-full border border-white/10 bg-slate-950/80 p-[1px] shadow-[0_10px_30px_rgba(6,182,212,0.12)] backdrop-blur-xl">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/25 via-blue-500/15 to-violet-500/20" />

        <div className="relative flex items-center gap-2 rounded-full bg-slate-950/95 px-3 py-2 sm:gap-3 sm:px-5 sm:py-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border shadow-inner shadow-slate-950/40 sm:h-12 sm:w-12 ${iconTone}`}
          >
            {getWeatherIcon()}
          </div>

          <div className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-xs font-bold tracking-tight text-white sm:text-[0.95rem]">
              {greeting}
            </span>

            <span className={`mt-1 truncate text-[0.68rem] font-semibold sm:text-xs ${weatherTone}`}>
              {weatherText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrbitVisual() {
  const isCompact = useIsCompact();

  return (
    <div className="relative mx-auto my-8 flex h-[280px] w-full max-w-[280px] items-center justify-center sm:h-[420px] sm:max-w-[420px] lg:h-[460px] lg:max-w-[460px]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-violet-500/10 blur-3xl" />

      <div className="absolute inset-[10px] rounded-full border border-dashed border-cyan-400/20 sm:inset-[22px]" />
      <div className="absolute inset-[42px] rounded-full border border-dashed border-blue-400/20 sm:inset-[72px]" />
      <div className="absolute inset-[72px] rounded-full border border-dashed border-violet-400/20 sm:inset-[120px]" />

      <div className="absolute h-[130px] w-[130px] rounded-full bg-cyan-400/10 blur-2xl sm:h-[190px] sm:w-[190px]" />

      <div className="relative z-30 flex flex-col items-center">
        <div className="rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 p-1.5 shadow-2xl shadow-cyan-500/20">
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white/10 bg-slate-900 sm:h-32 sm:w-32">
            <img
              src={profileImage}
              alt="Razny Razeek"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <p className="mt-3 text-base font-bold text-white sm:mt-4 sm:text-xl">
          Razny Razeek
        </p>

        <p className="max-w-[190px] text-center text-[0.68rem] text-slate-400 sm:max-w-none sm:text-sm">
          Software Engineer · Data Science · AI
        </p>
      </div>

      {orbitGroups.map((group) => (
        <motion.div
          key={group.name}
          animate={{ rotate: group.reverse ? -360 : 360 }}
          transition={{
            duration: group.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 z-20"
        >
          {group.items.map((item) => {
            const radians = (item.angle * Math.PI) / 180;
            const radius = isCompact ? group.mobileRadius : group.radius;
            const x = Math.cos(radians) * radius;
            const y = Math.sin(radians) * radius;
            const label = isCompact ? item.shortLabel : item.label;

            return (
              <div
                key={item.label}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                <motion.div
                  animate={{ rotate: group.reverse ? 360 : -360 }}
                  transition={{
                    duration: group.duration,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`whitespace-nowrap rounded-full border px-2 py-1 text-[0.58rem] font-semibold shadow-lg backdrop-blur sm:px-4 sm:py-2 sm:text-xs ${item.className}`}
                >
                  {label}
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

function IdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="relative w-full"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/25 via-blue-500/15 to-violet-500/25 blur-2xl" />

      <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl sm:max-w-[560px] sm:p-6 lg:max-w-none lg:overflow-visible">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 sm:text-sm">
              Professional Identity
            </p>

            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Software + Data + AI
            </h2>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-cyan-300">
            <Brain size={24} />
          </div>
        </div>

        <OrbitVisual />

        <div className="grid gap-3">
          {[
            {
              icon: Code2,
              title: "Engineering",
              text: ".NET Core, React, REST APIs, Clean Architecture",
            },
            {
              icon: Database,
              title: "Data Systems",
              text: "SQL Server, SSIS, SSRS, ETL, Reporting Automation",
            },
            {
              icon: ShieldCheck,
              title: "AI Research",
              text: "LLMs, NLP, AI Safety, Trustworthy AI, AI Security",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-3 sm:gap-4 sm:p-4"
              >
                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                  <Icon size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="#home" aria-label="Go to home" className="shrink-0">
            <WeatherGreeting />
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

          <div className="flex shrink-0 items-center gap-3">
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
        <section
          id="home"
          className="relative overflow-x-hidden px-4 pb-20 pt-32 sm:px-6 lg:flex lg:min-h-screen lg:items-center lg:pb-0 lg:pt-28"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg" />

          <motion.div
            animate={{ x: [0, 35, 0], y: [0, -25, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[-120px] top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"
          />

          <motion.div
            animate={{ x: [0, -35, 0], y: [0, 35, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-[-140px] h-96 w-96 rounded-full bg-violet-500/20 blur-3xl"
          />

          <div className="noise-bg" />

          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="min-w-0"
            >
              <motion.div
                variants={fadeUp}
                className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-200 sm:text-sm"
              >
                <Sparkles size={16} className="shrink-0" />
                <span className="truncate">
                  Full-Stack Software Engineer · MSc Data Science · AI Research Direction
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="max-w-full text-[2.25rem] font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Building scalable software,
                <span className="block text-gradient">
                  data systems & trustworthy AI solutions.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-full text-base leading-8 text-slate-300 sm:max-w-2xl sm:text-lg"
              >
                Hi, I’m{" "}
                <span className="font-semibold text-white">Razny Razeek</span> —
                a Full-Stack Software Engineer with 4+ years of experience building
                production-ready web applications, REST APIs, ETL pipelines, reporting
                automation, and cloud-supported systems. I also hold an MSc in Data
                Science and I am preparing for PhD research in AI, NLP, LLMs, AI Safety,
                and Trustworthy AI.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap"
              >
                <a
                  href="#projects"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 sm:w-auto"
                >
                  View Projects
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </a>

                <a
                  href="/documents/Razny-Razeek-CV.pdf"
                  download
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300 sm:w-auto"
                >
                  <Download size={18} />
                  Download CV
                </a>

                <a
                  href="https://linkedin.com/in/raznyrazeek"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300 sm:w-auto"
                >
                  <ExternalLink size={18} />
                  LinkedIn
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-10 grid max-w-full grid-cols-1 gap-3 sm:max-w-2xl sm:grid-cols-3"
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

            <IdentityCard />
          </div>
        </section>

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
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-3xl font-bold text-cyan-400">{stat.value}</h3>
                  <p className="mt-2 text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                  title: "Backend Development",
                  skills: [
                    "C#",
                    ".NET Core",
                    "ASP.NET Core",
                    "ASP.NET MVC",
                    "RESTful APIs",
                    "Entity Framework Core",
                    "LINQ",
                    "Microservices",
                  ],
                },
                {
                  title: "Frontend Development",
                  skills: [
                    "React",
                    "Angular",
                    "Next.js",
                    "Blazor",
                    "JavaScript",
                    "TypeScript",
                    "Tailwind CSS",
                    "Bootstrap",
                  ],
                },
                {
                  title: "Databases",
                  skills: [
                    "SQL Server",
                    "PostgreSQL",
                    "MySQL",
                    "MongoDB",
                    "SQLite",
                    "T-SQL",
                    "Stored Procedures",
                    "Index Optimisation",
                  ],
                },
                {
                  title: "Data & Reporting",
                  skills: [
                    "SSIS",
                    "SSRS",
                    "ETL Pipelines",
                    "SQL Server Agent",
                    "JSON Processing",
                    "XML Processing",
                    "CSV Processing",
                    "XSLT / XPath",
                  ],
                },
                {
                  title: "Cloud & DevOps",
                  skills: [
                    "Microsoft Azure",
                    "Azure Functions",
                    "Azure SQL",
                    "Docker",
                    "Git",
                    "GitHub Actions",
                    "CI/CD Pipelines",
                    "IIS Deployment",
                  ],
                },
                {
                  title: "AI & Data Science",
                  skills: [
                    "Python",
                    "Machine Learning",
                    "NLP",
                    "BERT",
                    "scikit-learn",
                    "NLTK",
                    "Pandas",
                    "NumPy",
                  ],
                },
                {
                  title: "Architecture & Practices",
                  skills: [
                    "Clean Architecture",
                    "SOLID Principles",
                    "REST API Design",
                    "Unit Testing",
                    "Integration Testing",
                    "Agile/Scrum",
                    "Code Refactoring",
                    "Production Support",
                  ],
                },
                {
                  title: "Research Interests",
                  skills: [
                    "Large Language Models",
                    "Trustworthy AI",
                    "AI Safety",
                    "AI Security",
                    "Adversarial Robustness",
                    "Agentic AI Systems",
                    "Scalable AI Systems",
                    "Responsible AI",
                  ],
                },
                {
                  title: "Core Strengths",
                  skills: [
                    "Problem Solving",
                    "System Design",
                    "Database Optimisation",
                    "Automation",
                    "Technical Documentation",
                    "Team Collaboration",
                    "Debugging",
                    "Continuous Learning",
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

        <section id="experience" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Experience
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Professional Experience
            </h2>

            <div className="space-y-6">
              {[
                {
                  role: "Full-Stack Developer",
                  company: "Spicehaart",
                  location: "Colchester, United Kingdom",
                  period: "Sept 2024 – Present",
                  highlights: [
                    "Built scalable .NET Core REST APIs, Windows Services, and microservices for business-critical platforms and third-party integrations.",
                    "Developed commercial web applications using React, Angular, and Next.js, improving responsiveness and user experience.",
                    "Optimised T-SQL queries, stored procedures, functions, and indexes, improving database performance by up to 50%.",
                    "Built SSIS ETL pipelines to process large-scale JSON, XML, and CSV data into centralised systems.",
                    "Created and automated SSRS reports for financial, marketing, operational, and commission-based reporting using SQL Server Agent.",
                  ],
                },
                {
                  role: "Full-Stack Developer",
                  company: "Self-Employed",
                  location: "Bristol, United Kingdom · Remote",
                  period: "Apr 2024 – Sept 2024",
                  highlights: [
                    "Developed RESTful APIs and secured web integrations using JWT authentication.",
                    "Built frontend features using React, Blazor, and ASP.NET Core to support business requirements.",
                    "Took ownership of existing full-stack codebases, debugging .NET Core and frontend issues.",
                    "Refactored code flows and improved maintainability using clean architecture principles.",
                    "Built and optimised MySQL queries and indexes, improving database performance by 25%.",
                  ],
                },
                {
                  role: "Software Developer",
                  company: "24K Tech Solutions",
                  location: "Sri Lanka",
                  period: "Jul 2021 – Nov 2022",
                  highlights: [
                    "Developed and maintained applications using C#, ASP.NET Core, ASP.NET MVC, Web Forms, Razor Pages, WinForms, .NET Framework, and .NET Core.",
                    "Built responsive frontend features using Angular, JavaScript, Bootstrap, Tailwind CSS, HTML, and CSS.",
                    "Designed database schemas, queries, stored procedures, and indexes across SQL Server, MySQL, and SQLite.",
                    "Processed, transformed, and integrated XML data using XSLT and XPath within enterprise applications.",
                    "Maintained e-commerce platforms, delivering new features, bug fixes, production-ready pages, and IIS deployments.",
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

        <section id="projects" className="bg-slate-900/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Projects
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Selected Projects
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Global Bitcoin Sentiment & Volatility Modelling",
                  type: "MSc Dissertation · AI / NLP / Machine Learning",
                  description:
                    "Conducted large-scale NLP and machine learning analysis on 500K–750K Bitcoin-related records to investigate sentiment trends and their relationship with cryptocurrency volatility.",
                  tech: ["Python", "scikit-learn", "NLTK", "BERT", "Pandas", "NumPy", "NLP"],
                },
                {
                  title: "Product Search & Catalog Platform",
                  type: "Full-Stack Search System",
                  description:
                    "Built a scalable product search and catalog platform to ingest, clean, structure, and synchronise bulk external product datasets with Elasticsearch-powered filtering.",
                  tech: [".NET", "React", "PostgreSQL", "Elasticsearch", "REST APIs"],
                },
                {
                  title: "LesiBuy E-Commerce Platform",
                  type: "Full-Stack E-Commerce Application",
                  description:
                    "Developed a full-stack e-commerce platform with product management, filtering, authentication, secure REST APIs, and optimised data handling.",
                  tech: ["ASP.NET Core", "EF Core", "Angular", "SQL Server", "Authentication"],
                },
                {
                  title: "Enterprise Reporting & ETL Automation",
                  type: "Commercial Data Automation",
                  description:
                    "Designed reporting and ETL automation workflows using SSRS, SSIS, SQL Server Agent, and SQL Server optimisation techniques.",
                  tech: ["SSRS", "SSIS", "SQL Server", "SQL Server Agent", "T-SQL", "ETL"],
                },
              ].map((project) => (
                <article
                  key={project.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06] md:p-8"
                >
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    {project.type}
                  </span>

                  <h3 className="mb-4 mt-5 text-2xl font-bold text-white group-hover:text-cyan-300">
                    {project.title}
                  </h3>

                  <p className="mb-6 leading-7 text-slate-300">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
              applications.
            </p>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                "Large Language Models & NLP",
                "Trustworthy AI & AI Safety",
                "AI Security & Robustness",
              ].map((title) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
                >
                  <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
                  <p className="leading-7 text-slate-300">
                    Exploring reliable, secure, explainable, and responsible AI systems
                    with a focus on real-world deployment and software engineering
                    practices.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="bg-slate-900/50 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Education
            </p>

            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Education & Certifications
            </h2>

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  degree: "MSc Data Science",
                  result: "Merit",
                  university: "University of the West of England",
                  period: "Jan 2023 – Mar 2024",
                },
                {
                  degree: "BEng (Hons) Software Engineering",
                  result: "Upper Second Class Honours",
                  university: "London Metropolitan University",
                  period: "Sept 2018 – Nov 2021",
                },
              ].map((edu) => (
                <div
                  key={edu.degree}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/40 hover:bg-white/[0.06] md:p-8"
                >
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    {edu.result}
                  </span>

                  <h3 className="mt-5 text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="mt-2 text-lg text-cyan-300">{edu.university}</p>
                  <p className="mt-1 text-sm text-slate-400">{edu.period}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">Certifications</h3>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Microsoft Certified: Azure Fundamentals (AZ-900)",
                  "Version Control & CI/CD Best Practices",
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
  );
}

export default App;