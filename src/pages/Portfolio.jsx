import Navbar from "../components/portfolio/Navbar";
import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Skills from "../components/portfolio/Skills";
import Projects from "../components/portfolio/Projects";
import Activities from "../components/portfolio/Activities";
import Docs from "../components/portfolio/Docs";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import useScrollReveal from "../hooks/useScrollReveal";

export function Portfolio({ data, isDark, toggleTheme, goAdmin }) {
  useScrollReveal();

  // Dynamically calculate statistics from the active arrays
  const projectsCount = data.projects ? data.projects.length : 0;
  const organizationsCount = data.organizations ? data.organizations.length : 0;
  const committeesCount = data.committees ? data.committees.length : 0;
  const awardsCount = data.competitions
    ? data.competitions.filter((c) => c.type === "award").length
    : 0;

  return (
    <div className="min-h-screen font-sans transition-colors duration-300 bg-customBg-light text-customText-light dark:bg-customBg-dark dark:text-customText-dark">
      
      {/* Dynamic Nav bar */}
      <Navbar
        name={data.hero.name}
        isDark={isDark}
        toggleTheme={toggleTheme}
        goAdmin={goAdmin}
      />

      {/* Hero Display */}
      <Hero hero={data.hero} about={data.about} isDark={isDark} />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* About Profile with dynamic stats */}
      <About
        about={data.about}
        projectsCount={projectsCount}
        organizationsCount={organizationsCount}
        committeesCount={committeesCount}
        awardsCount={awardsCount}
        isDark={isDark}
      />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* Skills Grouping Grid */}
      <Skills skills={data.skills} isDark={isDark} />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* Project Card Listing */}
      <Projects projects={data.projects} isDark={isDark} />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* Organizations & Committees & Awards columns */}
      <Activities
        organizations={data.organizations}
        committees={data.committees}
        competitions={data.competitions}
        isDark={isDark}
      />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* Gallery Slideshow / Grid */}
      <Docs docs={data.docs} isDark={isDark} />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* Interactive Contact Form Links */}
      <Contact
        contact={data.contact}
        location={data.about.location}
        isDark={isDark}
      />

      <div className="w-full h-px bg-black/5 dark:bg-white/5" />

      {/* Page Footer */}
      <Footer name={data.hero.name} />
      
    </div>
  );
}

export default Portfolio;
