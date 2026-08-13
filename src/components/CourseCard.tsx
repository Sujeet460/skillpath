import type { Course } from "../types";
import { formatCoursePrice } from "../utils/price";

type CourseCardProps = {
  course: Course;
  countryCode: string | null;
  countryStatus: "loading" | "error" | "success";
  onRetryCountry: () => void;
  accentColor: string;
  cardBorderRadius: number;
  isDarkMode: boolean;
};

export const CourseCard = ({ 
  course, 
  countryCode, 
  countryStatus, 
  onRetryCountry, 
  accentColor, 
  cardBorderRadius,
  isDarkMode
}: CourseCardProps) => {
  const formattedPrice = formatCoursePrice(course, countryCode, countryStatus);

  return (
    <div 
      className={`border overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1.5 cursor-pointer relative ${
        isDarkMode 
          ? "bg-[#16161a] border-white/5 text-white hover:shadow-2xl hover:shadow-violet-500/5" 
          : "bg-white border-black/5 text-gray-900 shadow-md hover:shadow-xl"
      }`}
      style={{ borderRadius: `${cardBorderRadius}px` }}
    >
      {/* Banner / Card Header area */}
      <div 
        className="h-[180px] w-full relative bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={course.imageUrl ? { backgroundImage: `url(${course.imageUrl})` } : {
          background: isDarkMode 
            ? "linear-gradient(135deg, #1f1f27 0%, #17171d 100%)" 
            : "linear-gradient(135deg, #f0f0f5 0%, #e4e4eb 100%)"
        }}
      >
        {/* Decorative subtle pattern when there is no image */}
        {!course.imageUrl && (
          <div 
            className={`absolute inset-0 pointer-events-none ${
              isDarkMode ? "opacity-[0.03]" : "opacity-[0.05]"
            }`}
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${accentColor} 1px, transparent 0)`,
              backgroundSize: "16px 16px"
            }}
          />
        )}
        
        {/* Category tag */}
        <span 
          className="absolute top-3 left-3 text-white text-[10px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm"
          style={{ backgroundColor: accentColor }}
        >
          {course.mainCategory}
        </span>

        {/* Refundable tag */}
        {course.refundable && (
          <span className="absolute top-3 right-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
            Refundable
          </span>
        )}

        {/* Big logo letters as visual decoration if no image */}
        {!course.imageUrl && (
          <span 
            className="text-6xl font-black select-none tracking-widest opacity-5"
            style={{ color: accentColor }}
          >
            {course.courseCode?.slice(0, 3).toUpperCase() || "SKL"}
          </span>
        )}
      </div>

      {/* Course Info */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div className="flex flex-col gap-2">
          <h3 
            className={`text-lg font-bold leading-snug line-clamp-2 transition-colors duration-300 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-gray-900 hover:text-gray-700"
            }`}
          >
            {course.courseName}
          </h3>
          
          <p 
            className={`text-sm leading-relaxed line-clamp-2 transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {course.description}
          </p>
        </div>

        {/* Pricing Row */}
        <div 
          className={`flex justify-between items-center border-t pt-4 mt-6 transition-colors duration-300 ${
            isDarkMode ? "border-white/5" : "border-black/5"
          }`}
        >
          <div className="flex items-center">
            <span 
              className={`text-lg font-extrabold tracking-tight transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              aria-label={countryStatus === "success" ? `Price: ${formattedPrice}` : formattedPrice}
            >
              {formattedPrice}
            </span>
            
            {/* Country API Retry Button */}
            {countryStatus === "error" && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onRetryCountry();
                }}
                className="ml-2 text-xs font-bold hover:underline cursor-pointer focus:outline-none focus:ring-1 rounded px-1"
                style={{ 
                  color: accentColor
                }}
                aria-label="Retry loading pricing information"
              >
                (Retry)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
