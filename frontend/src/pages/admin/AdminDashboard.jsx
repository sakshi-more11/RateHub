import { useState, useEffect, useCallback } from 'react';
import { Users, Store as StoreIcon, Star, Plus, Search } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import StatCard from '../../components/common/StatCard';
import SortableTable from '../../components/common/SortableTable';
import Modal from '../../components/common/Modal';
import UserDetailModal from '../../components/admin/UserDetailModal';
import { getDashboardStats, getUsers, getStores, addUser, addStore } from '../../api/adminApi';
import { validateName, validateEmail, validateAddress, validatePassword } from '../../utils/validators';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [tab, setTab] = useState('users');

  const [users, setUsers] = useState([]);
  const [userFilters, setUserFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [userSort, setUserSort] = useState({ sortBy: 'name', sortOrder: 'asc' });

  const [stores, setStores] = useState([]);
  const [storeFilters, setStoreFilters] = useState({ name: '', email: '', address: '' });
  const [storeSort, setStoreSort] = useState({ sortBy: 'name', sortOrder: 'asc' });

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [storeModalOpen, setStoreModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({ name: '', email: '', address: '', password: '', role: 'NORMAL_USER' });
  const [storeForm, setStoreForm] = useState({ name: '', email: '', address: '' });
  const [formError, setFormError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const loadStats = useCallback(async () => {
    const res = await getDashboardStats();
    setStats(res.data);
  }, []);

  const loadUsers = useCallback(async () => {
    const res = await getUsers({ ...userFilters, ...userSort });
    setUsers(res.data);
  }, [userFilters, userSort]);

  const loadStores = useCallback(async () => {
    const res = await getStores({ ...storeFilters, ...storeSort });
    setStores(res.data);
  }, [storeFilters, storeSort]);

  useEffect(() => { loadStats(); }, [loadStats]);
  useEffect(() => { if (tab === 'users') loadUsers(); }, [tab, loadUsers]);
  useEffect(() => { if (tab === 'stores') loadStores(); }, [tab, loadStores]);

  const handleUserSort = (key) => {
    setUserSort((prev) => ({ sortBy: key, sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc' }));
  };
  const handleStoreSort = (key) => {
    setStoreSort((prev) => ({ sortBy: key, sortOrder: prev.sortBy === key && prev.sortOrder === 'asc' ? 'desc' : 'asc' }));
  };

  const submitUser = async (e) => {
    e.preventDefault();
    setFormError('');

    const err = validateName(userForm.name) || validateEmail(userForm.email) || validateAddress(userForm.address) || validatePassword(userForm.password);
    if (err) { setFormError(err); return; }

    try {
      await addUser(userForm);
      setUserModalOpen(false);
      setUserForm({ name: '', email: '', address: '', password: '', role: 'NORMAL_USER' });
      loadUsers(); loadStats();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add user');
    }
  };

  const submitStore = async (e) => {
    e.preventDefault();
    setFormError('');

    const err = validateName(storeForm.name) || validateEmail(storeForm.email) || validateAddress(storeForm.address);
    if (err) { setFormError(err); return; }

    try {
      await addStore(storeForm);
      setStoreModalOpen(false);
      setStoreForm({ name: '', email: '', address: '' });
      loadStores(); loadStats();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to add store');
    }
  };

  const inputClass = "w-full mt-1.5 px-3.5 py-2.5 rounded-lg border border-borderc bg-bg text-textPrimary placeholder:text-textSecondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition text-sm";

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-textPrimary mb-1">Admin Dashboard</h1>
        <p className="text-textSecondary mb-6">Manage users, stores, and monitor platform activity</p>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Users" value={stats.totalUsers} icon={Users} accent />
          <StatCard label="Total Stores" value={stats.totalStores} icon={StoreIcon} />
          <StatCard label="Total Ratings" value={stats.totalRatings} icon={Star} />
        </div>

        <div className="flex items-center gap-2 mb-5 border-b border-borderc">
          {['users', 'stores'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize border-b-2 transition ${tab === t ? 'border-accent text-textPrimary' : 'border-transparent text-textSecondary hover:text-textPrimary'}`}
            >
              {t}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => (tab === 'users' ? setUserModalOpen(true) : setStoreModalOpen(true))}
            className="mb-2 flex items-center gap-1.5 bg-accent text-[#12172B] font-semibold px-4 py-2 rounded-lg text-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <Plus size={16} /> Add {tab === 'users' ? 'User' : 'Store'}
          </button>
        </div>

        {tab === 'users' && (
          <>
            <div className="grid sm:grid-cols-4 gap-3 mb-4">
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-textSecondary" />
                <input placeholder="Filter by name" value={userFilters.name}
                  onChange={(e) => setUserFilters({ ...userFilters, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <input placeholder="Filter by email" value={userFilters.email}
                onChange={(e) => setUserFilters({ ...userFilters, email: e.target.value })}
                className="px-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input placeholder="Filter by address" value={userFilters.address}
                onChange={(e) => setUserFilters({ ...userFilters, address: e.target.value })}
                className="px-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <select value={userFilters.role} onChange={(e) => setUserFilters({ ...userFilters, role: e.target.value })}
                className="px-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                <option value="">All roles</option>
                <option value="ADMIN">Admin</option>
                <option value="NORMAL_USER">Normal User</option>
                <option value="STORE_OWNER">Store Owner</option>
              </select>
            </div>

            <SortableTable
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'address', label: 'Address' },
                { key: 'role', label: 'Role' },
              ]}
              data={users}
              sortBy={userSort.sortBy}
              sortOrder={userSort.sortOrder}
              onSort={handleUserSort}
              renderRow={(u) => (
                <>
                  <td onClick={() => { setSelectedUserId(u.id); setDetailModalOpen(true); }} className="px-5 py-3.5 text-textPrimary font-medium cursor-pointer">{u.name}</td>
                  <td onClick={() => { setSelectedUserId(u.id); setDetailModalOpen(true); }} className="px-5 py-3.5 text-textSecondary cursor-pointer">{u.email}</td>
                  <td onClick={() => { setSelectedUserId(u.id); setDetailModalOpen(true); }} className="px-5 py-3.5 text-textSecondary max-w-xs truncate cursor-pointer">{u.address}</td>
                  <td onClick={() => { setSelectedUserId(u.id); setDetailModalOpen(true); }} className="px-5 py-3.5 cursor-pointer">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/15 text-accent capitalize">
                      {u.role.replace('_', ' ').toLowerCase()}
                    </span>
                  </td>
                </>
              )}
            />
          </>
        )}

        {tab === 'stores' && (
          <>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <input placeholder="Filter by name" value={storeFilters.name}
                onChange={(e) => setStoreFilters({ ...storeFilters, name: e.target.value })}
                className="px-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input placeholder="Filter by email" value={storeFilters.email}
                onChange={(e) => setStoreFilters({ ...storeFilters, email: e.target.value })}
                className="px-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
              <input placeholder="Filter by address" value={storeFilters.address}
                onChange={(e) => setStoreFilters({ ...storeFilters, address: e.target.value })}
                className="px-3 py-2 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>

            <SortableTable
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'address', label: 'Address' },
                { key: 'rating', label: 'Rating' },
              ]}
              data={stores}
              sortBy={storeSort.sortBy}
              sortOrder={storeSort.sortOrder}
              onSort={handleStoreSort}
              renderRow={(s) => (
                <>
                  <td className="px-5 py-3.5 text-textPrimary font-medium">{s.name}</td>
                  <td className="px-5 py-3.5 text-textSecondary">{s.email}</td>
                  <td className="px-5 py-3.5 text-textSecondary max-w-xs truncate">{s.address}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1 text-textPrimary font-medium">
                      <Star size={14} className="fill-accent text-accent" /> {s.rating || '—'}
                    </span>
                  </td>
                </>
              )}
            />
          </>
        )}
      </div>
      <UserDetailModal userId={selectedUserId} open={detailModalOpen} onClose={() => setDetailModalOpen(false)} />
      <Modal open={userModalOpen} onClose={() => { setUserModalOpen(false); setFormError(''); }} title="Add New User">
        {formError && <div className="mb-3 text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">{formError}</div>}
        <form onSubmit={submitUser} className="space-y-3">
          <input placeholder="Full name (20-60 chars)" required value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className={inputClass} />
          <input type="email" placeholder="Email" required value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className={inputClass} />
          <div>
             <textarea placeholder="Address" required rows={2} maxLength={400} value={userForm.address} onChange={(e) => setUserForm({ ...userForm, address: e.target.value })} className={inputClass} />
             <p className="text-xs text-textSecondary mt-1">{userForm.address.length}/400 characters</p>
          </div>
          <input type="password" placeholder="Password (8-16 chars, 1 uppercase, 1 special)" required value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className={inputClass} />
          <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className={inputClass}>
            <option value="NORMAL_USER">Normal User</option>
            <option value="ADMIN">Admin</option>
            <option value="STORE_OWNER">Store Owner</option>
          </select>
          <button type="submit" className="w-full bg-accent text-[#12172B] font-semibold py-2.5 rounded-lg mt-2 hover:shadow-md transition">Create User</button>
        </form>
      </Modal>

      <Modal open={storeModalOpen} onClose={() => { setStoreModalOpen(false); setFormError(''); }} title="Add New Store">
        {formError && <div className="mb-3 text-sm text-danger bg-danger/10 border border-danger/30 rounded-lg px-3 py-2">{formError}</div>}
        <form onSubmit={submitStore} className="space-y-3">
          <input placeholder="Store name (20-60 chars)" required value={storeForm.name} onChange={(e) => setStoreForm({ ...storeForm, name: e.target.value })} className={inputClass} />
          <input type="email" placeholder="Store email" required value={storeForm.email} onChange={(e) => setStoreForm({ ...storeForm, email: e.target.value })} className={inputClass} />
          <div>
            <textarea placeholder="Address" required rows={2} maxLength={400} value={storeForm.address} onChange={(e) => setStoreForm({ ...storeForm, address: e.target.value })} className={inputClass} />
            <p className="text-xs text-textSecondary mt-1">{storeForm.address.length}/400 characters</p>
          </div>
          <button type="submit" className="w-full bg-accent text-[#12172B] font-semibold py-2.5 rounded-lg mt-2 hover:shadow-md transition">Create Store</button>
        </form>
      </Modal>
    </div>
  );
}