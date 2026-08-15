import { useState, useEffect, useCallback } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import Navbar from '../../components/common/Navbar';
import StoreCard from '../../components/user/StoreCard';
import TopRatedStores from '../../components/user/TopRatedStores';
import StoreDetailModal from '../../components/user/StoreDetailModal';
import { useDebounce } from '../../hooks/useDebounce';
import { browseStores } from '../../api/storeApi';
import { submitRating, deleteRating } from '../../api/ratingApi';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedStore, setSelectedStore] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const debouncedName = useDebounce(name, 300);
  const debouncedAddress = useDebounce(address, 300);

  const loadStores = useCallback(async () => {
    const res = await browseStores({ name: debouncedName, address: debouncedAddress, sortBy, sortOrder });
    setStores(res.data);
  }, [debouncedName, debouncedAddress, sortBy, sortOrder]);

  useEffect(() => { loadStores(); }, [loadStores]);

  const handleRateFromModal = async (store, value) => {
    let newValue = value;
    if (value === store.userRating) newValue = value - 1;
    if (newValue <= 0) {
      await deleteRating(store.id);
    } else {
      await submitRating({ storeId: store.id, value: newValue });
    }
    await loadStores();
    setDetailOpen(false);
  };

  const toggleSort = (field) => {
    setSortOrder((prevOrder) => (sortBy === field ? (prevOrder === 'asc' ? 'desc' : 'asc') : 'asc'));
    setSortBy(field);
  };

  const SortButton = ({ field, label }) => (
    <button
      onClick={() => toggleSort(field)}
      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border transition ${
        sortBy === field ? 'border-accent text-accent bg-accent/10' : 'border-borderc text-textSecondary hover:text-textPrimary'
      }`}
    >
      {label}
      {sortBy === field && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
    </button>
  );

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-textPrimary mb-1">Browse Stores</h1>
        <p className="text-textSecondary mb-6">Discover and rate stores across the platform</p>

        <TopRatedStores />

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textSecondary" />
            <input
              placeholder="Search by store name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <input
            placeholder="Search by address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-borderc bg-surface text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-textSecondary mr-1">Sort by:</span>
          <SortButton field="name" label="Name" />
          <SortButton field="address" label="Address" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} onRated={loadStores} onOpenDetail={(s) => { setSelectedStore(s); setDetailOpen(true); }} />
          ))}
        </div>

        {stores.length === 0 && (
          <p className="text-center text-textSecondary py-12">No stores found matching your search.</p>
        )}
      </div>

      <StoreDetailModal store={selectedStore} open={detailOpen} onClose={() => setDetailOpen(false)} onRate={handleRateFromModal} />
    </div>
  );
}