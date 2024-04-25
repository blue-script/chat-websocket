import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {api} from './api'

export type Message = { id: string, message: string, user: { id: string, name: string } }

export const slice = createSlice({
  name: 'chat',
  selectors: {
    selectMessages: sliceState => sliceState.messages
  },
  initialState: {
    messages: [] as Message[]
  },
  reducers: {
    messegesRecived: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload]
    },
    newMessageRecived: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload]
    }
  }
})

export const createConnection = () => (dispatch: any) => {
  api.createConnection()
  api.subscribe((messages: Message[]) => {
      dispatch(slice.actions.messegesRecived(messages))
    },
    (message: Message) => {
      dispatch(slice.actions.newMessageRecived(message))
    })
}

export const destroyConnection = () => (dispatch: any) => {
  api.destroyConnection()
}

export const setClientName = (name: string) => (dispatch: any) => {
  api.sendName(name)
}

export const sendMessage = (message: string) => (dispatch: any) => {
  api.sendMessage(message)
}

export const typeMessage = () => (dispatch: any) => {
  api.typeMessage()
}

export const chatReducer = slice.reducer
export const selectMessages = slice.selectors.selectMessages