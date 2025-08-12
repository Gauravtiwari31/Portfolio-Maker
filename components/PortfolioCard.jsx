const { useState } = React;

function PortfolioCard({ portfolio }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleCardClick = () => {
    if (portfolio.link) window.open(portfolio.link, '_blank');
  };
  return (
    <div
      className={`portfolio-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer ${isHovered ? 'scale-105' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={portfolio.image}
          alt={portfolio.title}
          className="w-full h-48 object-cover"
          loading="lazy"
          decoding="async"
        />
        {portfolio.isLive && (
          <div className="absolute top-2 right-2 flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="ml-1 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded-full">Live</span>
          </div>
        )}
        {portfolio.isFeatured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{portfolio.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">by {portfolio.author}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {portfolio.tags?.map((tag, index) => (
            <span key={index} className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded-full">{portfolio.category}</span>
          <div className="flex items-center space-x-2">
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              {Number(portfolio.views || 0).toLocaleString()}
            </span>
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              {Number(portfolio.likes || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.PortfolioCard = PortfolioCard;
