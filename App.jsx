const { useState, useEffect } = React;

function App(){
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const portfolios = window.PORTFOLIO_DATA || [];

  // Dark mode persistence
  useEffect(()=>{
    const m = localStorage.getItem('pxf:dark');
    if(m==='1'){ setDarkMode(true); document.body.classList.add('dark'); }
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(d => {
      const next = !d;
      document.body.classList.toggle('dark', next);
      localStorage.setItem('pxf:dark', next ? '1' : '0');
      return next;
    });
  };

  // Simulate loading
  useEffect(()=>{ const id = setTimeout(()=>setIsLoading(false), 800); return ()=>clearTimeout(id); }, []);

  // Cursor trailer effect with cleanup
  useEffect(()=>{
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReduce || !finePointer) return;
    const cursor = document.getElementById('cursor'); if(!cursor) return;
    const trailCount = 20; const trailElements = [];
    for (let i=0;i<trailCount;i++){ const t=document.createElement('div'); t.className='trail'; t.style.opacity=(i/trailCount)*0.7; t.style.width=`${6-(i*0.25)}px`; t.style.height=`${6-(i*0.25)}px`; document.body.appendChild(t); trailElements.push(t); }
    let mouseX=0, mouseY=0, posX=0, posY=0; const trailPositions = Array(trailCount).fill({x:0,y:0});
    const handleMouseMove = e=>{ mouseX=e.clientX; mouseY=e.clientY; };
    let rafId=0;
    const animate = ()=>{
      posX += (mouseX - posX) / 6; posY += (mouseY - posY) / 6;
      cursor.style.left = `${posX}px`; cursor.style.top = `${posY}px`;
      trailPositions.unshift({x:posX,y:posY}); if(trailPositions.length>trailCount) trailPositions.pop();
      trailPositions.forEach((p,i)=>{ const t=trailElements[i]; if(t){ t.style.left=`${p.x}px`; t.style.top=`${p.y}px`; }});
      rafId = requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', handleMouseMove);
    const down=()=>cursor.classList.add('active'), up=()=>cursor.classList.remove('active');
    document.addEventListener('mousedown', down); document.addEventListener('mouseup', up);
    rafId = requestAnimationFrame(animate);
    return ()=>{
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      trailElements.forEach(t=>t.remove());
    };
  }, []);

  const handleLogin = (e)=>{ e.preventDefault(); setIsLoggedIn(true); setShowAuthModal(false); };
  const handleLogout = ()=> setIsLoggedIn(false);
  const handleGuestAccess = ()=> setShowAuthModal(false);

  const filteredPortfolios = portfolios.filter(p=>{
    const q = searchQuery.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || (p.tags||[]).some(tag=>tag.toLowerCase().includes(q));
    const matchesCategory = selectedCategory==='all' || p.category===selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Floating particles (keep in sync with dark mode)
  useEffect(()=>{
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];
    const particleCount = darkMode ? 30 : 15;
    const particles = [];
    for(let i=0;i<particleCount;i++){
      const particle = document.createElement('div');
      particle.className = 'particle floating';
      const size = Math.random()*10 + 5, posX = Math.random()*window.innerWidth, posY = Math.random()*window.innerHeight;
      const color = colors[Math.floor(Math.random()*colors.length)];
      const duration = Math.random()*10 + 10, delay = Math.random()*5;
      Object.assign(particle.style, { width:`${size}px`, height:`${size}px`, left:`${posX}px`, top:`${posY}px`, background:color, opacity: darkMode ? '0.6':'0.3', animationDuration:`${duration}s`, animationDelay:`${delay}s` });
      document.body.appendChild(particle); particles.push(particle);
    }
    return ()=>{ particles.forEach(p=>p.remove()); };
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 smooth-transition">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="lego-font text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Port X Folio</span>
            <div className="relative ml-2">
              <a href="easter_egg.html" target="_blank" className="sparkle-button relative text-pink-500 hover:text-violet-500 transition-colors duration-200 cursor-pointer block" title="✨ Click and you shall find!">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/><path d="M8 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" opacity="0.7"/><path d="M16 5l0.8 2.4 2.4 0.8-2.4 0.8L16 12l-0.8-2.4L12.8 8.8l2.4-0.8L16 5z" opacity="0.5"/>
                </svg>
                <div className="spark-container absolute inset-0 pointer-events-none">
                  <div className="spark spark-1"></div><div className="spark spark-2"></div><div className="spark spark-3"></div>
                  <div className="spark spark-4"></div><div className="spark spark-5"></div><div className="spark spark-6"></div>
                </div>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search portfolios..." className="px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 w-64" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
              <svg className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle dark mode">
              {darkMode ? (
                <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button onClick={()=>setShowResumeBuilder(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition">Build Portfolio</button>
                <button onClick={handleLogout} className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full hover:opacity-90 transition">Logout</button>
              </div>
            ) : (
              <button onClick={()=>setShowAuthModal(true)} className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition">Sign In</button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero */}
        <section className="gradient-bg rounded-3xl p-8 md:p-12 mb-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-400 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h1 className="lego-font text-4xl md:text-6xl mb-4">Showcase Your Professional Journey</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">Craft your perfect portfolio and resume to stand out in the competitive world. Let your work speak for itself.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={()=>setShowAuthModal(true)} className="bg-white text-pink-600 px-6 py-3 rounded-full font-bold hover:bg-opacity-90 transition">Join Now</button>
              <button onClick={()=>setShowResumeBuilder(true)} className="bg-black bg-opacity-30 text-white px-6 py-3 rounded-full font-bold hover:bg-opacity-40 transition border border-white border-opacity-30">Build Your Portfolio</button>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-800">
            <option value="all">All Categories</option>
            {['Color Scheme','Layout Styles','Navigation Styles','Typography-Focused','Special Effects',' Animation Styles','Navigation Effects','Content Presentation',' Mood & Atmosphere','Editor\'s choice'].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64"><div className="loading-spinner"></div></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPortfolios.map(p => <window.PortfolioCard key={p.id} portfolio={p} />)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="lego-font text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Port X Folio</span>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Elevating careers through powerful portfolios since 2025</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Explore</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-pink-500 transition">Featured</a></li>
                  <li><a href="#" className="hover:text-pink-500 transition">Categories</a></li>
                  <li><a href="#" className="hover:text-pink-500 transition">Trending</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-pink-500 transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-pink-500 transition">Terms</a></li>
                  <li><a href="#" className="hover:text-pink-500 transition">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© 2025 Port X Folio. © All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuthModal && <window.AuthModal authType={authType} setAuthType={setAuthType} onClose={()=>setShowAuthModal(false)} onLogin={handleLogin} onGuestAccess={handleGuestAccess} darkMode={darkMode} />}
      {showResumeBuilder && <window.ResumeBuilder onClose={()=>setShowResumeBuilder(false)} darkMode={darkMode} />}
    </div>
  );
}

window.App = App;
