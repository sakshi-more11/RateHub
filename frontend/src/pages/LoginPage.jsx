import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';
import Logo from '../components/common/Logo';
import StarLoader from '../components/common/StarLoader';
import { Store as StoreIcon, Users, TrendingUp } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password });
      loginUser(res.data.user, res.data.token);
      const role = res.data.user.role;
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'STORE_OWNER') navigate('/owner');
      else navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg dot-grid relative overflow-hidden flex items-center justify-center px-6 py-12">
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl blob-float" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl blob-float" style={{ animationDelay: '2s' }} />

      <div className="absolute top-6 right-6 z-20 animate-fade-up"><ThemeToggle /></div>
      <div className="absolute top-6 left-6 md:left-10 z-20 animate-fade-up"><Logo size="md" /></div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: brand copy */}
        <div className="space-y-8 animate-fade-up delay-1 pt-24 lg:pt-0">
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight text-textPrimary">
            Every rating tells<br />a story worth trusting.
          </h1>
          <p className="text-textSecondary max-w-sm">
            Discover, rate, and manage stores across the platform — built for shoppers, owners, and admins alike.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-textPrimary/80">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center"><StoreIcon size={16} className="text-accent" /></div>
              <span className="text-sm">Browse and search verified stores</span>
            </div>
            <div className="flex items-center gap-3 text-textPrimary/80">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center"><Users size={16} className="text-accent" /></div>
              <span className="text-sm">Role-based access for every user type</span>
            </div>
            <div className="flex items-center gap-3 text-textPrimary/80">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center"><TrendingUp size={16} className="text-accent" /></div>
              <span className="text-sm">Real-time rating analytics for owners</span>
            </div>
          </div>

          <StarLoader size={22} />
        </div>

        {/* Right: form card */}
        <div className="animate-fade-up delay-2">
          <div className="w-full max-w-sm ml-auto bg-surface border border-borderc rounded-2xl p-8 card-float">
            <h2 className="font-display text-2xl font-bold text-textPrimary mb-1">Welcome back</h2>
            <p className="text-textSecondary mb-8">Sign in to continue to your dashboard</p>

            {error && (
              <div className="mb-4 text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-textPrimary">Email</label>
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="you@example.com"
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-borderc bg-bg text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-textPrimary">Password</label>
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  className="w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-borderc bg-bg text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-[#12172B] font-semibold py-2.5 rounded-lg border border-accent shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Log In
              </button>
            </form>

            <p className="text-sm text-textSecondary mt-6 text-center">
              Don't have an account? <Link to="/signup" className="text-accent font-semibold hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}