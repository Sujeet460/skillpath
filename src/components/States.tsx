type ErrorStateProps = {
  errorMessage: string;
  onRetry: () => void;
  accentColor: string;
  isDarkMode: boolean;
};

type EmptyStateProps = {
  message: string;
  isDarkMode: boolean;
};

type LoadingStateProps = {
  isDarkMode: boolean;
};

// Renders exactly 6 animated skeleton course cards resembling the real card layout
export const LoadingState = ({ isDarkMode }: LoadingStateProps) => {
  return (
    <div className="max-w-[1200px] my-10 mx-auto px-5">
      <div 
        className={`w-48 h-8 rounded animate-pulse mb-6 ${
          isDarkMode ? "bg-white/5" : "bg-black/5"
        }`} 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div 
            key={idx}
            className={`border rounded-xl overflow-hidden flex flex-col h-[380px] animate-pulse transition-colors duration-300 ${
              isDarkMode ? "bg-[#18181f] border-white/5" : "bg-white border-black/5 shadow-sm"
            }`}
          >
            {/* Image banner area placeholder */}
            <div className={`h-[180px] relative ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}>
              <div 
                className={`absolute top-3 left-3 w-16 h-5 rounded ${
                  isDarkMode ? "bg-white/10" : "bg-black/10"
                }`} 
              />
            </div>

            {/* Content area placeholder */}
            <div className="p-5 flex flex-col flex-grow gap-4">
              {/* Title placeholder */}
              <div className={`w-3/4 h-6 rounded ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
              
              {/* Description placeholder */}
              <div className="flex flex-col gap-2 flex-grow">
                <div className={`w-full h-4 rounded ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />
                <div className={`w-5/6 h-4 rounded ${isDarkMode ? "bg-white/5" : "bg-black/5"}`} />
              </div>

              {/* Price / rating row placeholder */}
              <div className={`flex justify-between items-center border-t pt-4 mt-auto ${
                isDarkMode ? "border-white/5" : "border-black/5"
              }`}>
                <div className={`w-20 h-5 rounded ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
                <div className={`w-10 h-5 rounded ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ErrorState = ({ errorMessage, onRetry, accentColor, isDarkMode }: ErrorStateProps) => {
  return (
    <div 
      className={`text-center py-16 px-6 border rounded-2xl max-w-[520px] my-10 mx-auto shadow-xl transition-all duration-300 ${
        isDarkMode 
          ? "bg-red-500/5 border-red-500/10 text-red-400" 
          : "bg-red-50 border-red-100 text-red-600"
      }`}
    >
      {/* Warning Icon indicator */}
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border transition-colors duration-300 ${
          isDarkMode 
            ? "bg-red-500/10 border-red-500/20 text-red-400" 
            : "bg-red-100 border-red-200 text-red-600"
        }`}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>

      <h3 
        className={`m-0 mb-2 text-xl font-extrabold transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Unable to load courses
      </h3>
      <p 
        className={`m-0 mb-6 text-sm leading-relaxed transition-colors duration-300 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {errorMessage || "We couldn't load the courses right now."}
      </p>
      <button 
        onClick={onRetry}
        className="text-white border-0 py-2.5 px-8 rounded-lg font-bold cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d0d11]"
        style={{ 
          backgroundColor: accentColor
        }}
      >
        Try Again
      </button>
    </div>
  );
};

export const EmptyState = ({ message, isDarkMode }: EmptyStateProps) => {
  return (
    <div 
      className={`text-center py-20 px-6 border border-dashed rounded-2xl max-w-[520px] my-10 mx-auto transition-all duration-300 ${
        isDarkMode 
          ? "border-white/10 bg-white/[0.01] text-gray-500 shadow-inner" 
          : "border-black/10 bg-black/[0.01] text-gray-500 shadow-sm"
      }`}
    >
      {/* Empty Book / Box icon indicator */}
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border transition-colors duration-300 ${
          isDarkMode ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10"
        }`}
      >
        <svg 
          className="w-6 h-6 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
          />
        </svg>
      </div>

      <h3 
        className={`m-0 mb-2 text-xl font-bold transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        No courses available
      </h3>
      <p 
        className={`m-0 text-sm leading-relaxed max-w-sm mx-auto transition-colors duration-300 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {message || "We're preparing new courses for you. Please check back soon."}
      </p>
    </div>
  );
};
