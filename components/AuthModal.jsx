const { useState } = React;

function AuthModal({ authType, setAuthType, onClose, onLogin, onGuestAccess, darkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => { e.preventDefault(); onLogin(e); };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className={`relative rounded-2xl p-8 max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Close">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{authType === 'login' ? 'Welcome Back!' : 'Join Port X Folio'}</h2>
        <form onSubmit={handleSubmit}>
          {authType === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500" required/>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500" required/>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500" required/>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition mb-4">
            {authType === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          <div className="text-center mb-4">
            <button type="button" onClick={onGuestAccess} className="text-sm text-pink-500 hover:underline">Continue as Guest</button>
          </div>
          <div className="text-center text-sm">
            {authType === 'login' ? (
              <p>Don't have an account? <button type="button" onClick={()=>setAuthType('signup')} className="text-pink-500 hover:underline font-medium">Sign up</button></p>
            ) : (
              <p>Already have an account? <button type="button" onClick={()=>setAuthType('login')} className="text-pink-500 hover:underline font-medium">Sign in</button></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

window.AuthModal = AuthModal;
