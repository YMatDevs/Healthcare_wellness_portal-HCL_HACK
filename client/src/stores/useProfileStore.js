import { create } from 'zustand';

const useProfileStore = create((set, get) => ({
  user: {
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    avatar_url: '',
  },
  isLoading: false,
  error: null,

  // Action 1: Fetch Basic Profile
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/me'); // Common endpoint for the logged-in user
      if (!response.ok) throw new Error('Failed to load user profile');
      
      const data = await response.json();
      set({ user: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  // Action 2: Update Basic Info
  updateProfile: async (updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Update failed');

      const data = await response.json();
      
      // Sync the store with updated name/info
      set({ user: data, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false };
    }
  }
}));

export default useProfileStore;