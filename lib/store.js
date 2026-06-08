import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFormStore = create(
  persist(
    (set) => ({
      formData: {
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        childName: '',
        yearGroup: '',
        comments: '',
      },
      reference: '',
      setReference: (ref) => set({ reference: ref }),
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data }
      })),
      updateField: (field, value) => set((state) => ({
        formData: { ...state.formData, [field]: value }
      })),
      clearForm: () => set({
        formData: {
          parentName: '',
          parentEmail: '',
          parentPhone: '',
          childName: '',
          yearGroup: '',
          comments: '',
        },
        reference: '',
      })
    }),
    {
      name: 'registration-form-storage', // unique name for localStorage key
    }
  )
);
