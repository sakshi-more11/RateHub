import { useState } from 'react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import ChangePasswordModal from './ChangePasswordModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, KeyRound } from 'lucide-react';

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [pwModalOpen, setPwModalOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <>
      <nav className="sticky top-0 z-30 bg-surface border-b border-borderc px-6 py-3.5 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-textPrimary">{user?.name}</p>
            <p className="text-xs text-textSecondary capitalize">{user?.role?.replace('_', ' ').toLowerCase()}</p>
          </div>
          <button
            onClick={() => setPwModalOpen(true)}
            className="p-2 rounded-full border border-borderc bg-bg hover:bg-accent/10 hover:text-accent transition"
            aria-label="Change password"
            title="Change password"
          >
            <KeyRound size={18} />
          </button>
          <ThemeToggle />
          <button
            onClick={handleLogout}
            className="p-2 rounded-full border border-borderc bg-bg hover:bg-danger/10 hover:text-danger transition"
            aria-label="Log out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </nav>
      <ChangePasswordModal open={pwModalOpen} onClose={() => setPwModalOpen(false)} />
    </>
  );
}
