import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';
import Logo from '../components/common/Logo';
import StarLoader from '../components/common/StarLoader';
import { Store as StoreIcon, Users, TrendingUp } from 'lucide-react';
import { validateName, validateEmail, validateAddress, validatePassword } from '../utils/validators';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const nameErr = validateName(form.name);
    const emailErr = validateEmail(form.email);
    const addressErr = validateAddress(form.address);
    const passwordErr = validatePassword(form.password);

    const firstError = nameErr || emailErr || addressErr || passwordErr;
    if (firstError) { setError(firstError); return; }

    try {
      const res = await signup(form);
      loginUser(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  const inputClass = "w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-borderc bg-bg text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition";

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
            Join a community<br />that rates with purpose.
          </h1>
          <p className="text-textSecondary max-w-sm">
            Sign up to explore stores, share honest ratings, and help others make better choices.
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
            <h2 className="font-display text-2xl font-bold text-textPrimary mb-1">Create your account</h2>
            <p className="text-textSecondary mb-8">Start rating stores in minutes</p>

            {error && (
              <div className="mb-4 text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-textPrimary">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
                <p className="text-xs text-textSecondary mt-1">20–60 characters</p>
              </div>
              <div>
                <label className="text-sm font-medium text-textPrimary">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-medium text-textPrimary">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} required rows={2} placeholder="Your address" className={inputClass} />
                <p className="text-xs text-textSecondary mt-1">Max 400 characters</p>
              </div>
              <div>
                <label className="text-sm font-medium text-textPrimary">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="••••••••" className={inputClass} />
                <p className="text-xs text-textSecondary mt-1">8–16 chars, 1 uppercase, 1 special character</p>
              </div>
              <button type="submit" className="w-full bg-accent text-[#12172B] font-semibold py-2.5 rounded-lg border border-accent shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                Sign Up
              </button>
            </form>

            <p className="text-sm text-textSecondary mt-6 text-center">
              Already have an account? <Link to="/login" className="text-accent font-semibold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}