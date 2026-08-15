import { useState } from 'react';
import Modal from './Modal';
import { changePassword } from '../../api/userApi';

export default function ChangePasswordModal({ open, onClose }) {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const inputClass = "w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-borderc bg-bg text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent text-sm";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    try {
      await changePassword(form);
      setSuccess('Password updated successfully');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Change Password">
      {error && <div className="mb-3 text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">{error}</div>}
      {success && <div className="mb-3 text-sm text-success bg-success/10 border border-success/30 rounded-lg px-3 py-2">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium text-textPrimary">Current Password</label>
          <input type="password" required value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className="text-sm font-medium text-textPrimary">New Password</label>
          <input type="password" required value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })} className={inputClass} />
          <p className="text-xs text-textSecondary mt-1">8-16 chars, 1 uppercase, 1 special character</p>
        </div>
        <button type="submit" className="w-full bg-accent text-[#12172B] font-semibold py-2.5 rounded-lg mt-2 hover:shadow-md transition">
          Update Password
        </button>
      </form>
    </Modal>
  );
}