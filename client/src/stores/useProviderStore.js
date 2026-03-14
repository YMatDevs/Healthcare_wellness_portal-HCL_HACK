import { create } from 'zustand';

const useProviderStore = create((set, get) => ({
  provider: null,
  isLoading: false,
  error: null,

  // Action 1: Fetch Provider Data
  fetchProvider: async (providerId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/providers/${providerId}`);
      if (!response.ok) throw new Error('Could not load provider profile');
      
      const data = await response.json();
      set({ provider: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Action 2: Update Provider Data & Sync
  updateProvider: async (updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/providers/${get().provider.id}`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update provider info');

      const data = await response.json();
      
      // Update local state with the server response
      set({ provider: data, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  }
}));

export default useProviderStore;