import { create } from 'zustand';

const usePatientStore = create((set, get) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/patients/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const data = await response.json();
      set({ profile: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateProfile: async (updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/patients/${get().profile.id}`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const data = await response.json();
      
      set({ profile: data, isLoading: false });
      return { success: true };
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return { success: false, error: err.message };
    }
  }
}));

export default usePatientStore;