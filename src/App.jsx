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
  Briefcase,
  Building2,
  CalendarDays,
  MapPin,
  ServerCog,
  Workflow,
  Cpu,
  LineChart,
  GraduationCap,
  Award,
  BookOpenCheck,
  BadgeCheck,
  Rocket,
  Layers3,
  Search,
  ChartNoAxesCombined,
  ShoppingCart,
  Network,
  Activity,
  FileCode2,
  Mail,
  Send,
  MessageSquare,
  Globe2,
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
    name: "AI",
    radius: 175,
    mobileRadius: 108,
    duration: 22,
    reverse: false,
    items: [
      {
        label: "LLMs",
        shortLabel: "LLMs",
        angle: 20,
        className:
          "border-violet-400/40 bg-violet-500/20 text-violet-100 shadow-violet-950/40",
      },
      {
        label: "NLP",
        shortLabel: "NLP",
        angle: 145,
        className:
          "border-violet-400/40 bg-violet-500/20 text-violet-100 shadow-violet-950/40",
      },
      {
        label: "AI Safety",
        shortLabel: "Safety",
        angle: 265,
        className:
          "border-violet-400/40 bg-violet-500/20 text-violet-100 shadow-violet-950/40",
      },
    ],
  },
  {
    name: "Engineering",
    radius: 130,
    mobileRadius: 78,
    duration: 18,
    reverse: true,
    items: [
      {
        label: ".NET Core",
        shortLabel: ".NET",
        angle: 0,
        className:
          "border-cyan-400/40 bg-cyan-500/15 text-cyan-100 shadow-cyan-950/40",
      },
      {
        label: "React",
        shortLabel: "React",
        angle: 120,
        className:
          "border-cyan-400/40 bg-cyan-500/15 text-cyan-100 shadow-cyan-950/40",
      },
      {
        label: "REST APIs",
        shortLabel: "APIs",
        angle: 240,
        className:
          "border-cyan-400/40 bg-cyan-500/15 text-cyan-100 shadow-cyan-950/40",
      },
    ],
  },
  {
    name: "Data",
    radius: 92,
    mobileRadius: 55,
    duration: 15,
    reverse: false,
    items: [
      {
        label: "SQL Server",
        shortLabel: "SQL",
        angle: 40,
        className:
          "border-blue-400/40 bg-blue-500/15 text-blue-100 shadow-blue-950/40",
      },
      {
        label: "ETL",
        shortLabel: "ETL",
        angle: 180,
        className:
          "border-blue-400/40 bg-blue-500/15 text-blue-100 shadow-blue-950/40",
      },
      {
        label: "SSRS",
        shortLabel: "SSRS",
        angle: 300,
        className:
          "border-blue-400/40 bg-blue-500/15 text-blue-100 shadow-blue-950/40",
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
        fetchWeather(
          data.latitude,
          data.longitude,
          data.city || "Auto detected",
        );
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

            <span
              className={`mt-1 truncate text-[0.68rem] font-semibold sm:text-xs ${weatherTone}`}
            >
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
    <div className="relative mx-auto my-8 flex h-[290px] w-full max-w-[290px] items-center justify-center sm:h-[430px] sm:max-w-[430px] lg:h-[480px] lg:max-w-[480px]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-violet-500/10 blur-3xl" />

      {/* Outer AI ring */}
      <div className="absolute inset-[10px] rounded-full border border-dashed border-violet-400/25 sm:inset-[20px]" />

      {/* Middle Engineering ring */}
      <div className="absolute inset-[48px] rounded-full border border-dashed border-cyan-400/25 sm:inset-[68px]" />

      {/* Inner Data ring */}
      <div className="absolute inset-[82px] rounded-full border border-dashed border-blue-400/25 sm:inset-[108px]" />

      <div className="absolute h-[130px] w-[130px] rounded-full bg-cyan-400/10 blur-2xl sm:h-[190px] sm:w-[190px]" />

      <div className="relative z-30 flex flex-col items-center">
        <div className="rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 p-1.5 shadow-2xl shadow-cyan-500/20">
          <div className="h-[72px] w-[72px] overflow-hidden rounded-full border-2 border-white/10 bg-slate-900 sm:h-28 sm:w-28">
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

        {/* <p className="max-w-[190px] text-center text-[0.68rem] text-slate-400 sm:max-w-none sm:text-sm">
          Software Engineer · Data Science · AI
        </p> */}
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
              Software Engineer · Data Science · AI
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
const aboutCards = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Production-grade full-stack development across .NET, React, APIs, scalable application architecture, and modern frontend systems.",
    accent: "from-cyan-400/20 to-sky-500/20",
    iconStyle: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
  },
  {
    icon: Database,
    title: "Data Systems",
    description:
      "Strong experience with SQL Server, SSIS, SSRS, ETL pipelines, reporting automation, and data-centric performance optimisation.",
    accent: "from-blue-400/20 to-indigo-500/20",
    iconStyle: "text-blue-300 border-blue-400/20 bg-blue-400/10",
  },
  {
    icon: Brain,
    title: "AI Research Direction",
    description:
      "Focused on AI safety, trustworthy AI, LLMs, NLP, and real-world intelligent systems grounded in engineering discipline.",
    accent: "from-violet-400/20 to-fuchsia-500/20",
    iconStyle: "text-violet-300 border-violet-400/20 bg-violet-400/10",
  },
]

const aboutStats = [
  {
    value: "4+",
    label: "Years Experience",
    note: "Commercial software delivery",
  },
  {
    value: "70%",
    label: "Reporting Automation",
    note: "Operational efficiency gains",
  },
  {
    value: "50%",
    label: "DB Performance Gain",
    note: "Query and indexing optimisation",
  },
  {
    value: "AI",
    label: "Research Track",
    note: "Safety • NLP • LLMs",
  },
]

const capabilityTags = [
  "C#",
  ".NET Core",
  "ASP.NET Core",
  "React",
  "Angular",
  "SQL Server",
  "SSIS",
  "SSRS",
  "Azure",
  "Docker",
  "GitHub Actions",
  "CI/CD",
  "NLP",
  "LLMs",
  "AI Safety",
  "Trustworthy AI",
]
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
                  Full-Stack Software Engineer · MSc Data Science · AI Research
                  Direction
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
                a Full-Stack Software Engineer with 4+ years of experience
                building production-ready web applications, REST APIs, ETL
                pipelines, reporting automation, and cloud-supported systems. I
                also hold an MSc in Data Science and I am preparing for PhD
                research in AI, NLP, LLMs, AI Safety, and Trustworthy AI.
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
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
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
                    <p className="text-2xl font-black text-cyan-300">
                      {stat.value}
                    </p>
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

        <section
  id="about"
  className="relative overflow-hidden border-t border-white/10 px-6 py-24 sm:px-8 lg:px-10"
>
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute left-0 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
    <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.06),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_28%)]" />
  </div>

  <div className="relative mx-auto max-w-7xl">
    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
          <Sparkles size={14} className="text-cyan-300" />
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            About Me
          </span>
        </div>

        <h2 className="max-w-5xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Engineering
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
            {" "}
            scalable systems
          </span>
          , building
          <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            data intelligence
          </span>
          , and exploring
          <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
            {" "}
            trustworthy AI
          </span>
          .
        </h2>
      </div>

      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
            <BadgeCheck size={18} className="text-emerald-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Current Profile</p>
            <p className="text-xs text-slate-400">
              Full-Stack Engineer • Data Systems • AI Research Direction
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 text-slate-300">
          I design and build production-ready platforms across software
          engineering, data workflows, and automation systems, while extending
          my direction into AI, NLP, LLMs, AI safety, and trustworthy AI.
        </p>
      </div>
    </div>

    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-8">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <ShieldCheck size={20} className="text-cyan-300" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                System Profile
              </p>
              <p className="text-xs text-slate-400">
                Senior-level engineering mindset with strong technical depth
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <p className="text-lg leading-9 text-slate-300">
              I am a Full-Stack Software Engineer with over four years of
              commercial experience designing, developing, and maintaining
              scalable web applications, REST APIs, ETL pipelines, reporting
              automation, and cloud-supported systems.
            </p>

            <p className="text-lg leading-9 text-slate-300">
              Alongside my software engineering background, I hold an MSc in
              Data Science and a BEng (Hons) in Software Engineering. My
              research direction focuses on AI, NLP, Large Language Models, AI
              Safety, AI Security, and scalable trustworthy AI systems.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {capabilityTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aboutStats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-[26px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
            >
              <div className="mb-4 h-[2px] w-14 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400" />
              <div className="text-4xl font-black tracking-tight text-cyan-300">
                {stat.value}
              </div>
              <p className="mt-2 text-base font-semibold text-white">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        {aboutCards.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-40`}
              />
              <div className="relative">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${item.iconStyle}`}
                >
                  <Icon size={20} />
                </div>

                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  Core capability lane
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
</section>

        <section
          id="skills"
          className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-40" />

          <div className="absolute left-[-12rem] top-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-[-12rem] -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  Engineering Capability Matrix
                </p>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Senior-level stack for{" "}
                  <span className="text-gradient">secure scalable systems</span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:ml-auto">
                A production-focused technical profile across backend
                engineering, frontend systems, databases, cloud delivery, data
                automation, and AI research workflows — structured like an
                engineering control layer.
              </p>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-4">
              {[
                {
                  label: "Backend",
                  value: ".NET / APIs",
                  tone: "text-cyan-300",
                },
                {
                  label: "Data Layer",
                  value: "SQL / ETL",
                  tone: "text-blue-300",
                },
                {
                  label: "AI Track",
                  value: "NLP / LLMs",
                  tone: "text-violet-300",
                },
                {
                  label: "Delivery",
                  value: "Azure / CI/CD",
                  tone: "text-emerald-300",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                    {item.label}
                  </p>
                  <p className={`mt-2 text-lg font-black ${item.tone}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {[
                {
                  code: "SYS-01",
                  title: "Backend Systems Engineering",
                  level: "Production Core",
                  accent: "from-cyan-400/30 via-blue-500/10 to-transparent",
                  border: "hover:border-cyan-400/40",
                  metrics: [
                    "REST APIs",
                    "Service Design",
                    "Clean Architecture",
                  ],
                  skills: [
                    "C#",
                    ".NET Core",
                    "ASP.NET Core",
                    "ASP.NET MVC",
                    "Entity Framework Core",
                    "LINQ",
                    "Microservices",
                    "SOLID Principles",
                    "Unit Testing",
                  ],
                },
                {
                  code: "SEC-02",
                  title: "Secure API & Integration Layer",
                  level: "System Boundary",
                  accent: "from-emerald-400/25 via-cyan-500/10 to-transparent",
                  border: "hover:border-emerald-400/40",
                  metrics: ["JWT", "Auth Flows", "Third-party APIs"],
                  skills: [
                    "REST API Design",
                    "JWT Authentication",
                    "Secure Integrations",
                    "Error Handling",
                    "Validation",
                    "Production Debugging",
                    "Refactoring",
                  ],
                },
                {
                  code: "DATA-03",
                  title: "Database Performance & Data Systems",
                  level: "Data Control Plane",
                  accent: "from-blue-400/30 via-cyan-500/10 to-transparent",
                  border: "hover:border-blue-400/40",
                  metrics: ["50% DB Gain", "Indexing", "T-SQL"],
                  skills: [
                    "SQL Server",
                    "PostgreSQL",
                    "MySQL",
                    "MongoDB",
                    "SQLite",
                    "Stored Procedures",
                    "Index Optimisation",
                    "Schema Design",
                    "Query Tuning",
                  ],
                },
                {
                  code: "PIPE-04",
                  title: "ETL, Reporting & Automation",
                  level: "Operational Intelligence",
                  accent: "from-sky-400/30 via-blue-500/10 to-transparent",
                  border: "hover:border-sky-400/40",
                  metrics: ["70% Reporting Automation", "SSIS", "SSRS"],
                  skills: [
                    "SSIS",
                    "SSRS",
                    "ETL Pipelines",
                    "SQL Server Agent",
                    "JSON Processing",
                    "XML Processing",
                    "CSV Processing",
                    "XSLT / XPath",
                    "Reporting Automation",
                  ],
                },
                {
                  code: "UI-05",
                  title: "Frontend Engineering",
                  level: "Client Experience Layer",
                  accent: "from-cyan-400/20 via-violet-500/10 to-transparent",
                  border: "hover:border-cyan-400/40",
                  metrics: ["Responsive UI", "React", "Performance"],
                  skills: [
                    "React",
                    "Angular",
                    "Next.js",
                    "Blazor",
                    "JavaScript",
                    "TypeScript",
                    "Tailwind CSS",
                    "Bootstrap",
                    "UI Performance",
                  ],
                },
                {
                  code: "CLOUD-06",
                  title: "Cloud, DevOps & Deployment",
                  level: "Release Pipeline",
                  accent: "from-violet-400/30 via-blue-500/10 to-transparent",
                  border: "hover:border-violet-400/40",
                  metrics: ["Azure", "CI/CD", "IIS"],
                  skills: [
                    "Microsoft Azure",
                    "Azure Functions",
                    "Azure SQL",
                    "Docker",
                    "Git",
                    "GitHub Actions",
                    "CI/CD Pipelines",
                    "IIS Deployment",
                    "Remote Desktop",
                  ],
                },
                {
                  code: "AI-07",
                  title: "AI, NLP & Research Engineering",
                  level: "Research Systems",
                  accent:
                    "from-fuchsia-400/30 via-violet-500/10 to-transparent",
                  border: "hover:border-fuchsia-400/40",
                  metrics: ["NLP", "BERT", "LLMs"],
                  skills: [
                    "Python",
                    "Machine Learning",
                    "NLP",
                    "BERT",
                    "scikit-learn",
                    "NLTK",
                    "Pandas",
                    "NumPy",
                    "Sentiment Analysis",
                    "Time-Series Forecasting",
                  ],
                },
                {
                  code: "TRUST-08",
                  title: "Trustworthy AI & Security Direction",
                  level: "PhD Research Track",
                  accent: "from-red-400/20 via-violet-500/10 to-transparent",
                  border: "hover:border-violet-400/40",
                  metrics: ["AI Safety", "Robustness", "Security"],
                  skills: [
                    "Large Language Models",
                    "Trustworthy AI",
                    "AI Safety",
                    "AI Security",
                    "Adversarial Robustness",
                    "Prompt Attacks",
                    "Responsible AI",
                    "Agentic AI Systems",
                  ],
                },
              ].map((category) => (
                <motion.article
                  key={category.code}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40 transition ${category.border}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-80 transition duration-500 group-hover:opacity-100`}
                  />

                  <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-black tracking-[0.22em] text-cyan-200">
                            {category.code}
                          </span>

                          <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[0.7rem] font-semibold text-slate-400">
                            {category.level}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black tracking-tight text-white">
                          {category.title}
                        </h3>
                      </div>

                      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-inner shadow-cyan-950/40">
                        <div className="absolute inset-2 rounded-xl border border-cyan-400/10" />
                        <Code2 size={24} />
                      </div>
                    </div>

                    <div className="mb-6 grid gap-2 sm:grid-cols-3">
                      {category.metrics.map((metric) => (
                        <div
                          key={metric}
                          className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2"
                        >
                          <p className="text-[0.7rem] font-semibold text-slate-400">
                            {metric}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200 sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center gap-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 via-blue-400/20 to-transparent" />
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-500">
                        Active Capability
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="relative overflow-hidden px-4 py-24 sm:px-6"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-35" />
          <div className="absolute left-[-10rem] top-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-[-10rem] -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  Career Execution Layer
                </p>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Production experience in{" "}
                  <span className="text-gradient">engineering delivery</span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:ml-auto">
                Real-world delivery across backend systems, frontend
                engineering, database optimisation, ETL workflows, reporting
                automation, and cloud-supported software platforms.
              </p>
            </div>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Years",
                  value: "4+",
                  sub: "Commercial engineering",
                  icon: Briefcase,
                  tone: "text-cyan-300",
                  bg: "bg-cyan-400/10",
                  border: "border-cyan-400/20",
                },
                {
                  label: "Platforms",
                  value: ".NET / React",
                  sub: "Primary delivery stack",
                  icon: ServerCog,
                  tone: "text-blue-300",
                  bg: "bg-blue-400/10",
                  border: "border-blue-400/20",
                },
                {
                  label: "Data Ops",
                  value: "SQL / SSIS / SSRS",
                  sub: "ETL + reporting systems",
                  icon: Database,
                  tone: "text-violet-300",
                  bg: "bg-violet-400/10",
                  border: "border-violet-400/20",
                },
                {
                  label: "Impact",
                  value: "50% / 70%",
                  sub: "DB + automation gains",
                  icon: LineChart,
                  tone: "text-emerald-300",
                  bg: "bg-emerald-400/10",
                  border: "border-emerald-400/20",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`rounded-3xl border ${item.border} bg-white/[0.035] p-5 backdrop-blur`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {item.label}
                        </p>

                        <p className={`mt-2 text-xl font-black ${item.tone}`}>
                          {item.value}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {item.sub}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${item.border} ${item.bg} ${item.tone}`}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-8">
              {[
                {
                  id: "EXP-03",
                  role: "Full-Stack Developer",
                  company: "Spicehaart",
                  location: "Colchester, United Kingdom",
                  period: "Sept 2024 – Present",
                  status: "Current Role",
                  accent: "from-cyan-400/30 via-blue-500/10 to-transparent",
                  border: "hover:border-cyan-400/40",
                  iconWrap: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
                  icon: ServerCog,
                  metrics: [
                    "50% DB Performance Gain",
                    "70% Reporting Automation",
                    "Production APIs",
                  ],
                  stack: [
                    ".NET Core",
                    "React",
                    "Angular",
                    "Next.js",
                    "SQL Server",
                    "SSIS",
                    "SSRS",
                    "T-SQL",
                    "Microservices",
                    "Windows Services",
                  ],
                  modules: [
                    {
                      label: "SYSTEM MODULE",
                      icon: ServerCog,
                      title: "API & Service Architecture",
                      text: "Built scalable .NET Core REST APIs, Windows Services, and microservices for business-critical platforms and third-party integrations.",
                      tone: "text-cyan-300",
                      bg: "bg-cyan-400/10",
                      border: "border-cyan-400/20",
                    },
                    {
                      label: "APPLICATION LAYER",
                      icon: Workflow,
                      title: "Commercial Web Platforms",
                      text: "Developed commercial web applications using React, Angular, and Next.js, improving responsiveness and user experience.",
                      tone: "text-blue-300",
                      bg: "bg-blue-400/10",
                      border: "border-blue-400/20",
                    },
                    {
                      label: "DATA OPTIMISATION",
                      icon: Database,
                      title: "SQL Performance Engineering",
                      text: "Optimised T-SQL queries, stored procedures, functions, and indexes, improving database performance by up to 50%.",
                      tone: "text-violet-300",
                      bg: "bg-violet-400/10",
                      border: "border-violet-400/20",
                    },
                    {
                      label: "AUTOMATION PIPELINE",
                      icon: Cpu,
                      title: "ETL Data Processing",
                      text: "Built SSIS ETL pipelines to process large-scale JSON, XML, and CSV data into centralised systems.",
                      tone: "text-emerald-300",
                      bg: "bg-emerald-400/10",
                      border: "border-emerald-400/20",
                    },
                    {
                      label: "REPORTING CONTROL",
                      icon: LineChart,
                      title: "SSRS Reporting Automation",
                      text: "Created and automated SSRS reports for financial, marketing, operational, and commission-based reporting using SQL Server Agent.",
                      tone: "text-sky-300",
                      bg: "bg-sky-400/10",
                      border: "border-sky-400/20",
                    },
                  ],
                },
                {
                  id: "EXP-02",
                  role: "Full-Stack Developer",
                  company: "Self-Employed",
                  location: "Bristol, United Kingdom · Remote",
                  period: "Apr 2024 – Sept 2024",
                  status: "Contract / Freelance",
                  accent: "from-violet-400/30 via-cyan-500/10 to-transparent",
                  border: "hover:border-violet-400/40",
                  iconWrap:
                    "border-violet-400/20 bg-violet-400/10 text-violet-300",
                  icon: Workflow,
                  metrics: [
                    "JWT Security",
                    "25% DB Improvement",
                    "Codebase Ownership",
                  ],
                  stack: [
                    ".NET Core",
                    "React",
                    "Blazor",
                    "ASP.NET Core",
                    "JWT",
                    "MySQL",
                    "Clean Architecture",
                    "Debugging",
                    "Refactoring",
                  ],
                  modules: [
                    {
                      label: "SECURE API LAYER",
                      icon: ShieldCheck,
                      title: "JWT Integration",
                      text: "Developed RESTful APIs and secured web integrations using JWT authentication.",
                      tone: "text-emerald-300",
                      bg: "bg-emerald-400/10",
                      border: "border-emerald-400/20",
                    },
                    {
                      label: "UI DELIVERY",
                      icon: Code2,
                      title: "Frontend Feature Builds",
                      text: "Built frontend features using React, Blazor, and ASP.NET Core to support business requirements.",
                      tone: "text-cyan-300",
                      bg: "bg-cyan-400/10",
                      border: "border-cyan-400/20",
                    },
                    {
                      label: "SYSTEM RECOVERY",
                      icon: ServerCog,
                      title: "Codebase Ownership",
                      text: "Took ownership of existing full-stack codebases, debugging .NET Core and frontend issues.",
                      tone: "text-blue-300",
                      bg: "bg-blue-400/10",
                      border: "border-blue-400/20",
                    },
                    {
                      label: "ARCHITECTURE CLEANUP",
                      icon: Workflow,
                      title: "Maintainability Refactor",
                      text: "Refactored code flows and improved maintainability using clean architecture principles.",
                      tone: "text-violet-300",
                      bg: "bg-violet-400/10",
                      border: "border-violet-400/20",
                    },
                    {
                      label: "DATA TUNING",
                      icon: Database,
                      title: "MySQL Performance",
                      text: "Built and optimised MySQL queries and indexes, improving database performance by 25%.",
                      tone: "text-sky-300",
                      bg: "bg-sky-400/10",
                      border: "border-sky-400/20",
                    },
                  ],
                },
                {
                  id: "EXP-01",
                  role: "Software Developer",
                  company: "24K Tech Solutions",
                  location: "Sri Lanka",
                  period: "Jul 2021 – Nov 2022",
                  status: "Core Engineering",
                  accent: "from-blue-400/30 via-cyan-500/10 to-transparent",
                  border: "hover:border-blue-400/40",
                  iconWrap: "border-blue-400/20 bg-blue-400/10 text-blue-300",
                  icon: Cpu,
                  metrics: [
                    "Enterprise Apps",
                    "E-Commerce Delivery",
                    "IIS Deployment",
                  ],
                  stack: [
                    "C#",
                    "ASP.NET Core",
                    "ASP.NET MVC",
                    "Angular",
                    "SQL Server",
                    "MySQL",
                    "SQLite",
                    "XSLT",
                    "XPath",
                    "Bootstrap",
                  ],
                  modules: [
                    {
                      label: "APPLICATION CORE",
                      icon: Cpu,
                      title: ".NET Application Development",
                      text: "Developed and maintained applications using C#, ASP.NET Core, ASP.NET MVC, Web Forms, Razor Pages, WinForms, .NET Framework, and .NET Core.",
                      tone: "text-cyan-300",
                      bg: "bg-cyan-400/10",
                      border: "border-cyan-400/20",
                    },
                    {
                      label: "CLIENT LAYER",
                      icon: Code2,
                      title: "Responsive Frontend Delivery",
                      text: "Built responsive frontend features using Angular, JavaScript, Bootstrap, Tailwind CSS, HTML, and CSS.",
                      tone: "text-blue-300",
                      bg: "bg-blue-400/10",
                      border: "border-blue-400/20",
                    },
                    {
                      label: "DATABASE LAYER",
                      icon: Database,
                      title: "Schema & Query Design",
                      text: "Designed database schemas, queries, stored procedures, and indexes across SQL Server, MySQL, and SQLite.",
                      tone: "text-violet-300",
                      bg: "bg-violet-400/10",
                      border: "border-violet-400/20",
                    },
                    {
                      label: "DATA TRANSFORM",
                      icon: Workflow,
                      title: "XML Processing",
                      text: "Processed, transformed, and integrated XML data using XSLT and XPath within enterprise applications.",
                      tone: "text-emerald-300",
                      bg: "bg-emerald-400/10",
                      border: "border-emerald-400/20",
                    },
                    {
                      label: "DEPLOYMENT OPS",
                      icon: ServerCog,
                      title: "Production Delivery",
                      text: "Maintained e-commerce platforms, delivering new features, bug fixes, production-ready pages, and IIS deployments.",
                      tone: "text-sky-300",
                      bg: "bg-sky-400/10",
                      border: "border-sky-400/20",
                    },
                  ],
                },
              ].map((job, index) => {
                const Icon = job.icon;

                return (
                  <motion.article
                    key={`${job.company}-${job.period}`}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40 transition ${job.border}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${job.accent} opacity-80 transition duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                      <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-4">
                          <div
                            className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-inner shadow-slate-950/40 ${job.iconWrap}`}
                          >
                            <div className="absolute inset-2 rounded-xl border border-white/5" />
                            <Icon size={24} />
                          </div>

                          <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-black tracking-[0.22em] text-cyan-200">
                                {job.id}
                              </span>

                              <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[0.72rem] font-semibold text-slate-400">
                                {job.status}
                              </span>
                            </div>

                            <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                              {job.role}
                            </h3>

                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                              <span className="inline-flex items-center gap-2 font-semibold text-cyan-300">
                                <Building2 size={16} />
                                {job.company}
                              </span>

                              <span className="inline-flex items-center gap-2 text-slate-400">
                                <MapPin size={15} />
                                {job.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                          <CalendarDays size={16} />
                          {job.period}
                        </div>
                      </div>

                      <div className="mb-6 grid gap-3 md:grid-cols-3">
                        {job.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Metric
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              {metric}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-7 flex flex-wrap gap-2">
                        {job.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {job.modules.map((module) => {
                          const ModuleIcon = module.icon;

                          return (
                            <div
                              key={`${job.id}-${module.title}`}
                              className={`group/module relative overflow-hidden rounded-2xl border ${module.border} bg-white/[0.025] p-[1px] transition hover:-translate-y-1 hover:bg-white/[0.045]`}
                            >
                              <div className="relative h-full rounded-2xl bg-slate-950/80 p-4 backdrop-blur-xl">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                  <span
                                    className={`rounded-full border ${module.border} ${module.bg} px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.2em] ${module.tone}`}
                                  >
                                    {module.label}
                                  </span>

                                  <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${module.border} ${module.bg} ${module.tone}`}
                                  >
                                    <ModuleIcon size={18} />
                                  </div>
                                </div>

                                <h4 className="text-lg font-black text-white">
                                  {module.title}
                                </h4>

                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                  {module.text}
                                </p>

                                <div className="mt-4 h-px w-full bg-gradient-to-r from-cyan-400/40 via-blue-400/20 to-transparent" />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-7 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 via-blue-400/20 to-transparent" />
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-500">
                          Verified Delivery Record
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-35" />
          <div className="absolute left-[-12rem] top-24 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-[-12rem] -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  Project Engineering Lab
                </p>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Selected builds across{" "}
                  <span className="text-gradient">
                    software, data & AI systems
                  </span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:ml-auto">
                A curated set of technical projects showing full-stack
                engineering, search systems, e-commerce architecture, enterprise
                reporting automation, and AI/NLP research workflows.
              </p>
            </div>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "AI Research",
                  value: "NLP · BERT · ML",
                  icon: Brain,
                  tone: "text-violet-300",
                  bg: "bg-violet-400/10",
                  border: "border-violet-400/20",
                },
                {
                  label: "Search Systems",
                  value: "Elastic · APIs",
                  icon: Search,
                  tone: "text-cyan-300",
                  bg: "bg-cyan-400/10",
                  border: "border-cyan-400/20",
                },
                {
                  label: "Commerce",
                  value: "ASP.NET · Angular",
                  icon: ShoppingCart,
                  tone: "text-blue-300",
                  bg: "bg-blue-400/10",
                  border: "border-blue-400/20",
                },
                {
                  label: "Automation",
                  value: "SSIS · SSRS · SQL",
                  icon: Workflow,
                  tone: "text-emerald-300",
                  bg: "bg-emerald-400/10",
                  border: "border-emerald-400/20",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`rounded-3xl border ${item.border} bg-white/[0.035] p-5 backdrop-blur`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {item.label}
                        </p>

                        <p className={`mt-2 text-lg font-black ${item.tone}`}>
                          {item.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${item.border} ${item.bg} ${item.tone}`}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  id: "LAB-01",
                  title: "Global Bitcoin Sentiment & Volatility Modelling",
                  type: "MSc Dissertation · AI / NLP / Machine Learning",
                  icon: ChartNoAxesCombined,
                  accent:
                    "from-violet-400/30 via-fuchsia-500/10 to-transparent",
                  iconWrap:
                    "border-violet-400/20 bg-violet-400/10 text-violet-300",
                  status: "Research System",
                  description:
                    "Large-scale NLP and machine learning research analysing global Bitcoin-related text data to study sentiment dynamics and volatility behaviour.",
                  metrics: [
                    "500K–750K Records",
                    "NLP Pipeline",
                    "ML Comparison",
                  ],
                  modules: [
                    {
                      label: "DATA INGESTION",
                      value: "GDELT + authorised Bitcoin-related datasets",
                      icon: Database,
                    },
                    {
                      label: "NLP ENGINE",
                      value:
                        "Lexicon, vector-based, ML and transformer methods",
                      icon: Brain,
                    },
                    {
                      label: "MODEL LAYER",
                      value: "SVM, Random Forest, Gradient Boosting, BERT",
                      icon: Activity,
                    },
                  ],
                  tech: [
                    "Python",
                    "scikit-learn",
                    "NLTK",
                    "BERT",
                    "Pandas",
                    "NumPy",
                    "NLP",
                    "Time-Series",
                  ],
                },
                {
                  id: "LAB-02",
                  title: "Product Search & Catalog Platform",
                  type: "Full-Stack Search System",
                  icon: Search,
                  accent: "from-cyan-400/30 via-blue-500/10 to-transparent",
                  iconWrap: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
                  status: "Search Architecture",
                  description:
                    "A full-stack product catalog system designed to ingest, clean, structure and synchronise external product data with Elasticsearch-powered search.",
                  metrics: [
                    "Bulk Data Ingestion",
                    "Search Filtering",
                    "Real-Time Sync",
                  ],
                  modules: [
                    {
                      label: "API LAYER",
                      value: ".NET REST APIs for product search workflows",
                      icon: ServerCog,
                    },
                    {
                      label: "SEARCH ENGINE",
                      value:
                        "Elasticsearch-powered filtering and query handling",
                      icon: Search,
                    },
                    {
                      label: "DATA MODEL",
                      value: "PostgreSQL relational catalog structure",
                      icon: Database,
                    },
                  ],
                  tech: [
                    ".NET",
                    "React",
                    "PostgreSQL",
                    "Elasticsearch",
                    "REST APIs",
                    "Data Cleaning",
                  ],
                },
                {
                  id: "LAB-03",
                  title: "LesiBuy E-Commerce Platform",
                  type: "Full-Stack E-Commerce Application",
                  icon: ShoppingCart,
                  accent: "from-blue-400/30 via-cyan-500/10 to-transparent",
                  iconWrap: "border-blue-400/20 bg-blue-400/10 text-blue-300",
                  status: "Commerce Platform",
                  description:
                    "A full-stack e-commerce platform with product management, filtering, authentication, secure API flows and optimised data handling.",
                  metrics: [
                    "Product Management",
                    "Secure APIs",
                    "User Experience",
                  ],
                  modules: [
                    {
                      label: "BACKEND CORE",
                      value: "ASP.NET Core APIs with Entity Framework Core",
                      icon: Code2,
                    },
                    {
                      label: "CLIENT APP",
                      value: "Angular frontend with responsive product flows",
                      icon: Layers3,
                    },
                    {
                      label: "DATABASE",
                      value: "SQL Server-backed product and user data",
                      icon: Database,
                    },
                  ],
                  tech: [
                    "ASP.NET Core",
                    "EF Core",
                    "Angular",
                    "SQL Server",
                    "Authentication",
                    "REST APIs",
                  ],
                },
                {
                  id: "LAB-04",
                  title: "Enterprise Reporting & ETL Automation",
                  type: "Commercial Data Automation",
                  icon: Workflow,
                  accent: "from-emerald-400/25 via-cyan-500/10 to-transparent",
                  iconWrap:
                    "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
                  status: "Automation Platform",
                  description:
                    "Enterprise reporting and ETL automation workflows designed around SSRS, SSIS, SQL Server Agent and query optimisation techniques.",
                  metrics: [
                    "70% Manual Workload Reduction",
                    "Scheduled Reports",
                    "ETL Pipelines",
                  ],
                  modules: [
                    {
                      label: "ETL PIPELINE",
                      value: "SSIS workflows for JSON, XML and CSV processing",
                      icon: Workflow,
                    },
                    {
                      label: "REPORTING ENGINE",
                      value:
                        "SSRS reports for financial and operational insights",
                      icon: LineChart,
                    },
                    {
                      label: "SQL CONTROL",
                      value:
                        "SQL Server Agent scheduling and T-SQL optimisation",
                      icon: Database,
                    },
                  ],
                  tech: [
                    "SSRS",
                    "SSIS",
                    "SQL Server",
                    "SQL Server Agent",
                    "T-SQL",
                    "ETL",
                  ],
                },
              ].map((project, index) => {
                const Icon = project.icon;

                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: index * 0.07 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40 transition hover:border-cyan-400/30"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-75 transition duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-5 backdrop-blur-xl sm:p-6">
                      <div className="mb-6 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-inner shadow-slate-950/40 ${project.iconWrap}`}
                          >
                            <div className="absolute inset-2 rounded-xl border border-white/5" />
                            <Icon size={24} />
                          </div>

                          <div>
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-black tracking-[0.22em] text-cyan-200">
                                {project.id}
                              </span>

                              <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 text-[0.72rem] font-semibold text-slate-400">
                                {project.status}
                              </span>
                            </div>

                            <h3 className="text-2xl font-black tracking-tight text-white">
                              {project.title}
                            </h3>

                            <p className="mt-2 text-sm font-semibold text-cyan-300">
                              {project.type}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="mb-6 text-sm leading-7 text-slate-300 sm:text-base">
                        {project.description}
                      </p>

                      <div className="mb-6 grid gap-3 sm:grid-cols-3">
                        {project.metrics.map((metric) => (
                          <div
                            key={metric}
                            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Metric
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              {metric}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-6 grid gap-3">
                        {project.modules.map((module) => {
                          const ModuleIcon = module.icon;

                          return (
                            <div
                              key={`${project.id}-${module.label}`}
                              className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                            >
                              <div className="flex gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                                  <ModuleIcon size={18} />
                                </div>

                                <div>
                                  <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-cyan-300">
                                    {module.label}
                                  </p>

                                  <p className="mt-1 text-sm leading-6 text-slate-300">
                                    {module.value}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/50 via-blue-400/20 to-transparent" />
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-slate-500">
                          Technical Case Study
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="research"
          className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-35" />
          <div className="absolute left-[-12rem] top-24 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-[-12rem] -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-violet-400/25 bg-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-violet-300">
                  AI Research Direction
                </p>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Building toward{" "}
                  <span className="text-gradient">
                    trustworthy, secure & scalable AI systems
                  </span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:ml-auto">
                My research direction connects software engineering, data
                science, NLP, Large Language Models, AI safety, AI security, and
                scalable AI infrastructure. I am preparing for PhD research
                focused on reliable, explainable, and secure AI systems that can
                be deployed responsibly in real-world environments.
              </p>
            </div>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Core Research",
                  value: "LLMs · NLP",
                  icon: Brain,
                  tone: "text-violet-300",
                  bg: "bg-violet-400/10",
                  border: "border-violet-400/20",
                },
                {
                  label: "Trust Layer",
                  value: "Safety · Reliability",
                  icon: ShieldCheck,
                  tone: "text-cyan-300",
                  bg: "bg-cyan-400/10",
                  border: "border-cyan-400/20",
                },
                {
                  label: "Security Focus",
                  value: "Robustness · Attacks",
                  icon: Network,
                  tone: "text-red-300",
                  bg: "bg-red-400/10",
                  border: "border-red-400/20",
                },
                {
                  label: "Engineering Edge",
                  value: "Scalable AI Systems",
                  icon: Cpu,
                  tone: "text-emerald-300",
                  bg: "bg-emerald-400/10",
                  border: "border-emerald-400/20",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`rounded-3xl border ${item.border} bg-white/[0.035] p-5 backdrop-blur`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {item.label}
                        </p>

                        <p className={`mt-2 text-lg font-black ${item.tone}`}>
                          {item.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${item.border} ${item.bg} ${item.tone}`}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40 transition hover:border-violet-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/30 via-cyan-500/10 to-transparent opacity-75 transition duration-500 group-hover:opacity-100" />

                <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                  <div className="mb-7 flex items-start gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300 shadow-inner shadow-slate-950/40">
                      <div className="absolute inset-2 rounded-xl border border-white/5" />
                      <Brain size={24} />
                    </div>

                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-black tracking-[0.22em] text-violet-200">
                          RESEARCH-01
                        </span>

                        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-[0.72rem] font-semibold text-violet-200">
                          PhD Direction
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                        Large Language Models, NLP & Trustworthy AI
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                        I am interested in how LLM-based systems behave, fail,
                        respond to adversarial inputs, and can be engineered to
                        become safer, more reliable, explainable, and
                        trustworthy. My background in software engineering helps
                        me approach AI research not only as model
                        experimentation, but also as system design, testing,
                        monitoring, governance, and deployment.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      {
                        title: "LLM Behaviour Analysis",
                        text: "Studying how language models respond across normal, ambiguous, and adversarial prompts.",
                        icon: Activity,
                      },
                      {
                        title: "NLP System Evaluation",
                        text: "Evaluating sentiment, language patterns, textual signals, and model output quality.",
                        icon: Search,
                      },
                      {
                        title: "AI Safety Layers",
                        text: "Exploring guardrails, safety filters, monitoring, and responsible deployment mechanisms.",
                        icon: ShieldCheck,
                      },
                      {
                        title: "Scalable AI Software",
                        text: "Designing AI applications that are maintainable, testable, secure, and production-ready.",
                        icon: Layers3,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                              <Icon size={18} />
                            </div>

                            <h4 className="font-black text-white">
                              {item.title}
                            </h4>
                          </div>

                          <p className="text-sm leading-6 text-slate-400">
                            {item.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40 transition hover:border-cyan-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/25 via-blue-500/10 to-transparent opacity-75 transition duration-500 group-hover:opacity-100" />

                <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                  <div className="mb-7 flex items-start gap-4">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-inner shadow-slate-950/40">
                      <div className="absolute inset-2 rounded-xl border border-white/5" />
                      <Workflow size={24} />
                    </div>

                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-black tracking-[0.22em] text-cyan-200">
                          RESEARCH-02
                        </span>

                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.72rem] font-semibold text-cyan-200">
                          Capability Map
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                        Where I can contribute
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                        My capability sits at the intersection of model
                        experimentation, software engineering, data pipelines,
                        evaluation workflows, and practical AI system
                        implementation.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: "AI / NLP Research",
                        value:
                          "LLMs, NLP, sentiment analysis, text classification, BERT, model comparison, evaluation.",
                        icon: Brain,
                        tone: "text-violet-300",
                        bg: "bg-violet-400/10",
                        border: "border-violet-400/20",
                      },
                      {
                        label: "Trustworthy AI",
                        value:
                          "AI safety, responsible AI, explainability, reliability, guardrails, risk-aware deployment.",
                        icon: ShieldCheck,
                        tone: "text-cyan-300",
                        bg: "bg-cyan-400/10",
                        border: "border-cyan-400/20",
                      },
                      {
                        label: "AI Security",
                        value:
                          "Prompt attacks, jailbreaking, adversarial robustness, abuse resistance, secure AI workflows.",
                        icon: Network,
                        tone: "text-red-300",
                        bg: "bg-red-400/10",
                        border: "border-red-400/20",
                      },
                      {
                        label: "AI Software Systems",
                        value:
                          "REST APIs, data pipelines, cloud deployment, testing, monitoring, CI/CD, scalable architecture.",
                        icon: Code2,
                        tone: "text-emerald-300",
                        bg: "bg-emerald-400/10",
                        border: "border-emerald-400/20",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className={`rounded-2xl border ${item.border} bg-white/[0.025] p-4`}
                        >
                          <div className="flex gap-3">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.border} ${item.bg} ${item.tone}`}
                            >
                              <Icon size={18} />
                            </div>

                            <div>
                              <h4 className="font-black text-white">
                                {item.label}
                              </h4>

                              <p className="mt-1 text-sm leading-6 text-slate-400">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/25 via-cyan-500/10 to-transparent" />

                <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                      <Database size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-300">
                        Research Foundation
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-white">
                        MSc Dissertation Experience
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-300 sm:text-base">
                    My MSc dissertation,{" "}
                    <span className="font-semibold text-white">
                      “Global Bitcoin Sentiment and Volatility Modelling using
                      NLP and Machine Learning,”
                    </span>{" "}
                    gave me practical research experience in large-scale text
                    data processing, NLP methods, sentiment classification,
                    machine learning comparison, BERT-based modelling, and
                    time-series analysis.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "500K–750K Records",
                      "NLP",
                      "BERT",
                      "SVM",
                      "Random Forest",
                      "Gradient Boosting",
                      "Sentiment Analysis",
                      "Time-Series",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-500/10 to-transparent" />

                <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                      <Sparkles size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-300">
                        Future Research Goal
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-white">
                        PhD-ready AI systems direction
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-300 sm:text-base">
                    My long-term goal is to contribute to research that makes AI
                    systems more dependable in real-world settings — especially
                    LLM-based applications used in education, healthcare,
                    finance, cybersecurity, business automation, and
                    decision-support systems.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Prompt-based attacks",
                      "Jailbreaking resistance",
                      "Safety-layer architectures",
                      "AI system monitoring",
                      "Trustworthy NLP",
                      "Secure AI deployment",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
                      >
                        <p className="text-sm font-semibold text-slate-200">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        <section
          id="education"
          className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6"
        >
          <div className="absolute inset-0 -z-20 bg-slate-950" />
          <div className="absolute inset-0 -z-10 grid-bg opacity-35" />
          <div className="absolute left-[-12rem] top-24 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-[-12rem] -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="mx-auto max-w-7xl">
            <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
                  Academic Credentials
                </p>

                <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                  Education built around{" "}
                  <span className="text-gradient">
                    software, data & AI research
                  </span>
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:ml-auto">
                A strong academic foundation combining Software Engineering and
                Data Science, supported by cloud certification and a research
                direction focused on AI, NLP, LLMs, trustworthy systems, and
                scalable software platforms.
              </p>
            </div>

            <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Highest Degree",
                  value: "MSc Data Science",
                  icon: GraduationCap,
                  tone: "text-cyan-300",
                  bg: "bg-cyan-400/10",
                  border: "border-cyan-400/20",
                },
                {
                  label: "Engineering Base",
                  value: "BEng Software",
                  icon: Code2,
                  tone: "text-blue-300",
                  bg: "bg-blue-400/10",
                  border: "border-blue-400/20",
                },
                {
                  label: "Research Direction",
                  value: "AI · NLP · LLMs",
                  icon: Brain,
                  tone: "text-violet-300",
                  bg: "bg-violet-400/10",
                  border: "border-violet-400/20",
                },
                {
                  label: "Cloud Credential",
                  value: "Azure AZ-900",
                  icon: Cloud,
                  tone: "text-emerald-300",
                  bg: "bg-emerald-400/10",
                  border: "border-emerald-400/20",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`rounded-3xl border ${item.border} bg-white/[0.035] p-5 backdrop-blur`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          {item.label}
                        </p>

                        <p className={`mt-2 text-lg font-black ${item.tone}`}>
                          {item.value}
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${item.border} ${item.bg} ${item.tone}`}
                      >
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  code: "EDU-02",
                  degree: "MSc Data Science",
                  result: "Merit",
                  university: "University of the West of England",
                  location: "Bristol, United Kingdom",
                  period: "Jan 2023 – Mar 2024",
                  icon: Brain,
                  accent: "from-cyan-400/30 via-blue-500/10 to-transparent",
                  iconWrap: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
                  modules: [
                    "Machine Learning",
                    "Natural Language Processing",
                    "Data Modelling",
                    "Research Methods",
                  ],
                  focus:
                    "Strengthened research thinking, technical literature evaluation, large-scale data processing, machine learning experimentation, and academic writing.",
                  project:
                    "Dissertation: Global Bitcoin Sentiment & Volatility Modelling using NLP and Machine Learning.",
                },
                {
                  code: "EDU-01",
                  degree: "BEng (Hons) Software Engineering",
                  result: "Upper Second Class Honours",
                  university: "London Metropolitan University",
                  location: "London, United Kingdom",
                  period: "Sept 2018 – Nov 2021",
                  icon: Code2,
                  accent: "from-violet-400/30 via-cyan-500/10 to-transparent",
                  iconWrap:
                    "border-violet-400/20 bg-violet-400/10 text-violet-300",
                  modules: [
                    "Software Development",
                    "System Design",
                    "Databases",
                    "Application Engineering",
                  ],
                  focus:
                    "Built the technical foundation for programming, databases, software architecture, algorithms, system design, and full-stack application development.",
                  project:
                    "Foundation for professional software engineering across .NET, frontend systems, databases, and production application delivery.",
                },
              ].map((edu, index) => {
                const Icon = edu.icon;

                return (
                  <motion.article
                    key={edu.degree}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40 transition hover:border-cyan-400/30"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${edu.accent} opacity-75 transition duration-500 group-hover:opacity-100`}
                    />

                    <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                      <div className="mb-6 flex items-start gap-4">
                        <div
                          className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-inner shadow-slate-950/40 ${edu.iconWrap}`}
                        >
                          <div className="absolute inset-2 rounded-xl border border-white/5" />
                          <Icon size={24} />
                        </div>

                        <div>
                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-black tracking-[0.22em] text-cyan-200">
                              {edu.code}
                            </span>

                            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[0.72rem] font-semibold text-cyan-200">
                              {edu.result}
                            </span>
                          </div>

                          <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                            {edu.degree}
                          </h3>

                          <p className="mt-2 text-lg font-semibold text-cyan-300">
                            {edu.university}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
                            <span>{edu.location}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>{edu.period}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 grid gap-3 sm:grid-cols-2">
                        {edu.modules.map((module) => (
                          <div
                            key={module}
                            className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              Module
                            </p>
                            <p className="mt-1 text-sm font-semibold text-slate-200">
                              {module}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4">
                          <div className="mb-2 flex items-center gap-2 text-cyan-300">
                            <BookOpenCheck size={16} />
                            <p className="text-xs font-black uppercase tracking-[0.22em]">
                              Academic Focus
                            </p>
                          </div>

                          <p className="text-sm leading-7 text-slate-300">
                            {edu.focus}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4">
                          <div className="mb-2 flex items-center gap-2 text-violet-300">
                            <BadgeCheck size={16} />
                            <p className="text-xs font-black uppercase tracking-[0.22em]">
                              Key Outcome
                            </p>
                          </div>

                          <p className="text-sm leading-7 text-slate-300">
                            {edu.project}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-500/10 to-transparent" />

                <div className="relative rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                      <Award size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">
                        Certifications
                      </p>
                      <h3 className="mt-1 text-2xl font-black text-white">
                        Professional Credentials
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        title: "Microsoft Certified: Azure Fundamentals",
                        code: "AZ-900",
                        text: "Cloud concepts, Azure services, security, compliance, pricing, and governance foundations.",
                      },
                      {
                        title: "Version Control & CI/CD Best Practices",
                        code: "DEVOPS",
                        text: "Git-based workflow, code delivery practices, branching strategy, and pipeline awareness.",
                      },
                    ].map((cert) => (
                      <div
                        key={cert.title}
                        className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-black tracking-[0.22em] text-emerald-200">
                            {cert.code}
                          </span>

                          <BadgeCheck size={18} className="text-emerald-300" />
                        </div>

                        <h4 className="font-bold text-white">{cert.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {cert.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-400/25 via-cyan-500/10 to-transparent" />

                <div className="relative h-full rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl md:p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                    <Brain size={24} />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-violet-300">
                    Next Direction
                  </p>

                  <h3 className="mt-3 text-2xl font-black text-white">
                    PhD Research Preparation
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Preparing for doctoral research in AI, Large Language
                    Models, NLP, trustworthy AI, AI safety, AI security,
                    adversarial robustness, and scalable AI software systems.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "LLMs",
                      "NLP",
                      "AI Safety",
                      "Trustworthy AI",
                      "AI Security",
                      "Agentic AI",
                      "Robustness",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
  id="contact"
  className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:px-6"
>
  <div className="absolute inset-0 -z-20 bg-slate-950" />
  <div className="absolute inset-0 -z-10 grid-bg opacity-35" />
  <div className="absolute left-[-12rem] top-20 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
  <div className="absolute bottom-10 right-[-12rem] -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

  <div className="mx-auto max-w-7xl">
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-[1px] shadow-2xl shadow-slate-950/40">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-violet-500/20" />

      <div className="relative rounded-[1.95rem] bg-slate-950/90 p-6 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
              Contact Gateway
            </p>

            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
              Let’s connect around{" "}
              <span className="text-gradient">
                software, data & AI systems
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              I am open to software engineering opportunities, AI research
              collaborations, PhD discussions, technical projects, and
              professional networking.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:mraznyrazeek@gmail.com"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 sm:w-auto"
              >
                <Send size={18} />
                Email Me
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="https://linkedin.com/in/raznyrazeek"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300 sm:w-auto"
              >
                <ExternalLink size={18} />
                LinkedIn
              </a>

              <a
                href="/documents/Razny-Razeek-CV.pdf"
                download
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-bold text-white backdrop-blur transition hover:border-cyan-400 hover:text-cyan-300 sm:w-auto"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                label: "Email Channel",
                value: "mraznyrazeek@gmail.com",
                href: "mailto:mraznyrazeek@gmail.com",
                icon: Mail,
                tone: "text-cyan-300",
                bg: "bg-cyan-400/10",
                border: "border-cyan-400/20",
              },
              {
                label: "Professional Network",
                value: "linkedin.com/in/raznyrazeek",
                href: "https://linkedin.com/in/raznyrazeek",
                icon: ExternalLink,
                tone: "text-blue-300",
                bg: "bg-blue-400/10",
                border: "border-blue-400/20",
              },
              {
                label: "Current Base",
                value: "Colchester, Essex, United Kingdom",
                href: null,
                icon: MapPin,
                tone: "text-violet-300",
                bg: "bg-violet-400/10",
                border: "border-violet-400/20",
              },
            ].map((item) => {
              const Icon = item.icon

              const cardContent = (
                <div
                  className={`group relative overflow-hidden rounded-3xl border ${item.border} bg-white/[0.035] p-[1px] transition hover:-translate-y-1`}
                >
                  <div className="relative rounded-3xl bg-slate-950/80 p-5 backdrop-blur-xl">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${item.border} ${item.bg} ${item.tone}`}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                          {item.label}
                        </p>

                        <p className="mt-2 break-words text-base font-bold text-white">
                          {item.value}
                        </p>
                      </div>

                      {item.href && (
                        <ExternalLink
                          size={18}
                          className="shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                        />
                      )}
                    </div>
                  </div>
                </div>
              )

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {cardContent}
                </a>
              ) : (
                <div key={item.label}>{cardContent}</div>
              )
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Software Engineering",
              text: "Full-stack development, APIs, production systems, clean architecture, and cloud-supported applications.",
              icon: Code2,
            },
            {
              title: "AI Research Direction",
              text: "LLMs, NLP, trustworthy AI, AI safety, AI security, and scalable AI software systems.",
              icon: Brain,
            },
            {
              title: "Collaboration Ready",
              text: "Available for professional networking, technical discussions, PhD guidance, and research conversations.",
              icon: MessageSquare,
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Icon size={20} />
                </div>

                <h3 className="font-black text-white">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.text}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
              <Rocket size={20} />
            </div>

            <div>
              <p className="font-bold text-white">
                Open to meaningful technical opportunities
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Software engineering · AI research · PhD conversations · technical collaboration
              </p>
            </div>
          </div>

          <a
            href="mailto:mraznyrazeek@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-200 transition hover:bg-emerald-400 hover:text-slate-950"
          >
            Start Conversation
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Razny Razeek. Built with React and
          Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}

export default App;
