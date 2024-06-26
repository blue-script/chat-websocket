import {configureStore} from '@reduxjs/toolkit'
import {chatReducer} from './chat-slice'

export const store = configureStore({
  reducer: {
    chat: chatReducer
  },
})

export type AppStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch