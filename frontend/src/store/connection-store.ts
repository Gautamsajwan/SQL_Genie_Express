import { create } from 'zustand'

type connectionState = {
  detailsAvailable: boolean,
  dbURL: string,
  createdAt: string,
  setConnectionDetails: (dbURL: string, createdAt: string) => void,
  eraseConnectionDetails: () => void,
}

export const useConnectionStore = create<connectionState>((set) => ({
  detailsAvailable: typeof localStorage !== 'undefined' && JSON.parse(localStorage.getItem('connectionDetails') || '{}').connectionString ? true : false,
  dbURL: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('connectionDetails') || '{}').connectionString || '' : '',
  createdAt: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('connectionDetails') || '{}').connectedAt || '' : '',

  setConnectionDetails: (dbURL: string, createdAt: string) => {
    set((state) => ({
      ...state,
      detailsAvailable: true,
      dbURL,
      createdAt,
    }))
  },
  eraseConnectionDetails: () => {
    set((state) => ({
      ...state,
      detailsAvailable: false,
      dbURL: '',
      createdAt: '',
    }))
  },
}))