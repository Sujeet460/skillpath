type HeroProps = {
  title: string;
  accentColor: string;
  isDarkMode: boolean;
};

export const Hero = ({ title, accentColor, isDarkMode }: HeroProps) => {
  return (
    <header 
      className={`text-center py-20 px-5 rounded-2xl my-5 mx-auto max-w-[1200px] relative overflow-hidden transition-all duration-300 border ${
        isDarkMode 
          ? "bg-gradient-to-br from-[#121214] to-[#1a1a24] text-white border-white/5 shadow-2xl" 
          : "bg-gradient-to-br from-white to-gray-50 text-gray-900 border-black/5 shadow-md"
      }`}
    >
      {/* Decorative background glow */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-300"
        style={{ backgroundColor: accentColor }}
      />
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none transition-all duration-300"
        style={{ backgroundColor: accentColor }}
      />

      <span 
        className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 border transition-colors duration-300 ${
          isDarkMode 
            ? "border-white/10 text-white bg-white/[0.02]" 
            : "border-black/10 text-gray-700 bg-black/[0.02]"
        }`}
        style={{ 
          borderColor: isDarkMode ? `${accentColor}33` : `${accentColor}55`, 
          color: accentColor
        }}
      >
        Welcome to Skillpath
      </span>

      <h1 
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 bg-clip-text text-transparent tracking-tight leading-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${accentColor}, #60a5fa)`
        }}
      >
        {title}
      </h1>
      
      <p 
        className={`text-base md:text-lg max-w-[620px] mx-auto leading-relaxed mb-8 transition-colors duration-300 ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Explore industry-standard course materials tailored to fast-track your learning and career growth.
      </p>

      {/* Required primary CTA button linking to courses section */}
      <div>
        <a 
          href="#courses"
          className={`inline-block text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
            isDarkMode ? "focus:ring-offset-[#0d0d11]" : "focus:ring-offset-[#ecf2fa]"
          }`}
          style={{ 
            backgroundColor: accentColor
          }}
        >
          Explore Courses
        </a>
      </div>
    </header>
  );
};
