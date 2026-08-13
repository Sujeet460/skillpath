import { useState, useEffect } from "react";
import { addPropertyControls, ControlType } from "framer";
import type { Course } from "./types";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Courses } from "./components/Courses";
import { LoadingState, ErrorState, EmptyState } from "./components/States";

type SkillpathProps = {
  accentColor?: string;
  cardBorderRadius?: number;
};

export const Skillpath = ({ 
  accentColor = "#8a2be2", 
  cardBorderRadius = 12 
}: SkillpathProps) => {
  // Theme state (Dark Mode by default)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Courses state machine
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(true);
  const [coursesError, setCoursesError] = useState<string | null>(null);

  // Country state machine
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [countryLoading, setCountryLoading] = useState<boolean>(true);
  const [countryError, setCountryError] = useState<string | null>(null);

  // Derived country status
  const countryStatus = countryLoading 
    ? "loading" 
    : countryError 
      ? "error" 
      : "success";

  // Independent fetch function for courses
  const fetchCourses = async (signal?: AbortSignal) => {
    setCoursesLoading(true);
    setCoursesError(null);
    try {
      const res = await fetch("https://syncsphere-hiv6.onrender.com/assignment/course-data", { signal });
      if (!res.ok) {
        throw new Error(`Failed to load courses (HTTP ${res.status})`);
      }
      const data = await res.json();
      setCourses(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setCoursesError("Unable to load courses. Something went wrong while loading the courses.");
      }
    } finally {
      setCoursesLoading(false);
    }
  };

  // Independent fetch function for country
  const fetchCountry = async (signal?: AbortSignal) => {
    setCountryLoading(true);
    setCountryError(null);
    try {
      const res = await fetch("https://syncsphere-hiv6.onrender.com/assignment/country-code", { signal });
      if (!res.ok) {
        throw new Error(`Failed to resolve country (HTTP ${res.status})`);
      }
      const data = await res.json();
      if (data && data.country_code) {
        setCountryCode(data.country_code);
      } else {
        throw new Error("Invalid country response structure.");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setCountryError("Failed to load country details.");
      }
    } finally {
      setCountryLoading(false);
    }
  };

  // Trigger independent parallel API fetches on mount with Abort cleanup
  useEffect(() => {
    const controller = new AbortController();

    fetchCourses(controller.signal);
    fetchCountry(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  // Retry courses handler: retries courses only
  const handleRetryCourses = () => {
    fetchCourses();
  };

  // Retry country handler: retries country only, leaving successful courses undisturbed
  const handleRetryCountry = () => {
    fetchCountry();
  };

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-300 font-sans p-5 ${
        isDarkMode ? "bg-[#0d0d11] text-gray-100" : "bg-[#ecf2fa] text-gray-900"
      }`}
      style={{
        backgroundImage: isDarkMode 
          ? `radial-gradient(circle, ${accentColor}14 1.5px, transparent 1.5px)` 
          : `radial-gradient(circle, ${accentColor}24 1.5px, transparent 1.5px)`,
        backgroundSize: "24px 24px"
      }}
    >
      {/* Top Header Navigation Bar */}
      <nav 
        className={`max-w-[1200px] mx-auto py-4 px-5 flex justify-between items-center mb-6 border-b transition-colors duration-300 ${
          isDarkMode ? "border-white/5" : "border-black/5"
        }`}
      >
        <span 
          className={`text-lg font-black tracking-wider uppercase transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Skillpath
        </span>
        
        {/* Theme Switch Toggle Button */}
        <button 
          onClick={handleToggleTheme}
          className={`cursor-pointer border text-sm rounded-full p-2 transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isDarkMode 
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10 focus:ring-offset-[#0d0d11]" 
              : "bg-black/5 border-black/10 text-gray-900 hover:bg-black/10 focus:ring-offset-[#ecf2fa]"
          }`}
          style={{ focusRingColor: accentColor } as any}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? "☀ Light Mode" : "☾ Dark Mode"}
        </button>
      </nav>

      {/* Hero section with customizable title and accent color */}
      <Hero 
        title="Master Your Skills with Skillpath" 
        accentColor={accentColor} 
        isDarkMode={isDarkMode} 
      />

      {/* Main Content Area */}
      <main className="min-h-[300px] py-5">
        {coursesLoading ? (
          <LoadingState isDarkMode={isDarkMode} />
        ) : coursesError ? (
          <ErrorState 
            errorMessage={coursesError} 
            onRetry={handleRetryCourses} 
            accentColor={accentColor} 
            isDarkMode={isDarkMode}
          />
        ) : courses && courses.length === 0 ? (
          <EmptyState message="No courses available right now." isDarkMode={isDarkMode} />
        ) : courses ? (
          <Courses 
            courses={courses} 
            countryCode={countryCode} 
            countryStatus={countryStatus}
            onRetryCountry={handleRetryCountry}
            accentColor={accentColor} 
            cardBorderRadius={cardBorderRadius} 
            isDarkMode={isDarkMode}
          />
        ) : null}
      </main>

      {/* Footer section */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

// Framer property controls configuration (exactly 2 useful controls)
addPropertyControls(Skillpath, {
  accentColor: {
    type: ControlType.Color,
    title: "Accent Color",
    defaultValue: "#8a2be2",
    description: "Primary brand color for badges, buttons, and headings."
  },
  cardBorderRadius: {
    type: ControlType.Number,
    title: "Card Border Radius",
    defaultValue: 12,
    min: 0,
    max: 40,
    step: 1,
    display: "slider",
    description: "Corner rounding for the course layout cards."
  }
});
