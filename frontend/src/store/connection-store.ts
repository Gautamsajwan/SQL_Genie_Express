import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ConnectionState {
  detailsAvailable: boolean
  dbURL: string
  createdAt: string
  setConnectionDetails: (dbURL: string, createdAt: string) => void
  eraseConnectionDetails: () => void
}

export const useConnectionStore = create<ConnectionState>()(
  persist(
    (set) => ({
      detailsAvailable: false,
      dbURL: '',
      createdAt: '',

      setConnectionDetails: (dbURL: string, createdAt: string) => {
        set({
          detailsAvailable: true,
          dbURL,
          createdAt,
        })
      },

      eraseConnectionDetails: () => {
        set({
          detailsAvailable: false,
          dbURL: '',
          createdAt: '',
        })
      },
    }),
    {
      name: 'connection-details', // localStorage key
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        }
      ),
    }
  )
)