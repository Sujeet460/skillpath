import { useState } from "react";
import type { Course } from "../types";
import { CourseCard } from "./CourseCard";

type CoursesProps = {
  courses: Course[];
  countryCode: string | null;
  countryStatus: "loading" | "error" | "success";
  onRetryCountry: () => void;
  accentColor: string;
  cardBorderRadius: number;
  isDarkMode: boolean;
};

export const Courses = ({
  courses,
  countryCode,
  countryStatus,
  onRetryCountry,
  accentColor,
  cardBorderRadius,
  isDarkMode
}: CoursesProps) => {
  // Search and Sort states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");

  // Reset price sorting to default if country API fails/loads
  const activeSortOption = countryStatus === "success" ? sortOption : "default";

  // Derive client-side filtered list based on search query
  const filteredCourses = courses.filter((course) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    return (
      course.courseName.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.mainCategory.toLowerCase().includes(query)
    );
  });

  // Derive client-side sorted list based on active price currency comparisons
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (activeSortOption === "default" || countryStatus !== "success" || !countryCode) {
      return 0; // Maintain API default order
    }

    const isIndia = countryCode.toUpperCase() === "IN";
    const priceA = isIndia ? a.pricePaise : a.priceUsdCents;
    const priceB = isIndia ? b.pricePaise : b.priceUsdCents;

    if (activeSortOption === "price-asc") {
      return priceA - priceB;
    } else if (activeSortOption === "price-desc") {
      return priceB - priceA;
    }

    return 0;
  });

  const handleClearSearch = () => {
    setSearchQuery("");
    setSortOption("default");
  };

  return (
    <section id="courses" className="max-w-[1200px] my-10 mx-auto px-5">
      <style>{`
        #course-search:focus, #course-sort:focus {
          border-color: ${accentColor};
          box-shadow: 0 0 0 2px ${accentColor}33;
        }
      `}</style>

      {/* Search & Sort Controls Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 w-full">
        {/* Search Input Container */}
        <div className="relative w-full md:max-w-md">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            id="course-search"
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full border rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none transition-all duration-300 ${isDarkMode
                ? "bg-[#16161a] border-white/5 text-white placeholder-gray-500"
                : "bg-white border-black/10 text-gray-900 placeholder-gray-400 shadow-sm"
              }`}
          />
        </div>

        {/* Sort Dropdown Container */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          <label
            htmlFor="course-sort"
            className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
          >
            Sort:
          </label>
          <select
            id="course-sort"
            value={activeSortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={`border rounded-lg py-2.5 px-4 text-sm focus:outline-none cursor-pointer transition-all duration-300 w-full md:w-[220px] ${isDarkMode
                ? "bg-[#16161a] border-white/5 text-white"
                : "bg-white border-black/10 text-gray-900 shadow-sm"
              }`}
            aria-label="Sort courses by price"
          >
            <option value="default">Select Order</option>
            <option value="price-asc" disabled={countryStatus !== "success"}>
              Price: Low to High {countryStatus !== "success" ? "(Unavailable)" : ""}
            </option>
            <option value="price-desc" disabled={countryStatus !== "success"}>
              Price: High to Low {countryStatus !== "success" ? "(Unavailable)" : ""}
            </option>
          </select>
        </div>
      </div>

      {/* Course List Grid rendering */}
      {sortedCourses.length === 0 ? (
        /* Filtered Empty State */
        <div className={`text-center py-16 px-6 border border-dashed rounded-2xl max-w-[500px] mx-auto my-8 transition-colors duration-300 ${isDarkMode ? "border-white/10 bg-white/[0.01]" : "border-black/10 bg-black/[0.01] shadow-sm"
          }`}>
          <h3 className={`m-0 mb-2 text-xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"
            }`}>
            No courses match your search
          </h3>
          <p className={`m-0 mb-6 text-sm leading-relaxed transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
            Try checking your spelling, using different keywords, or clearing the filter query.
          </p>
          <button
            onClick={handleClearSearch}
            className="text-white border-0 py-2 px-6 rounded-lg font-semibold cursor-pointer transition-colors"
            style={{ backgroundColor: accentColor }}
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course) => (
            <div key={course.courseCode}>
              <CourseCard
                course={course}
                countryCode={countryCode}
                countryStatus={countryStatus}
                onRetryCountry={onRetryCountry}
                accentColor={accentColor}
                cardBorderRadius={cardBorderRadius}
                isDarkMode={isDarkMode}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
