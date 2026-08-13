type FooterProps = {
  isDarkMode: boolean;
};

export const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <footer 
      className={`max-w-[1200px] mx-auto py-12 px-5 mt-20 border-t flex flex-col md:flex-row justify-between items-center gap-6 transition-colors duration-300 ${
        isDarkMode ? "border-white/5 text-gray-500" : "border-black/5 text-gray-500"
      }`}
    >
      {/* Three accessible links */}
      <div className="flex gap-6 text-sm font-semibold">
        <a 
          href="#courses" 
          className={`transition-colors duration-200 focus:outline-none focus:underline ${
            isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Courses
        </a>
        <a 
          href="#about" 
          className={`transition-colors duration-200 focus:outline-none focus:underline ${
            isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          About
        </a>
        <a 
          href="#contact" 
          className={`transition-colors duration-200 focus:outline-none focus:underline ${
            isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Contact
        </a>
      </div>

      {/* Copyright info */}
      <div className="text-right">
        <p 
          className={`m-0 text-xs transition-colors duration-300 ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}
        >
          © 2026 Skillpath. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
