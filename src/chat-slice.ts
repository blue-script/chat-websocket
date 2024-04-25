import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {api} from './api'
import {AppDispatch} from './store'

export type Message = { id: string, message: string, user: User }
export type User = { id: string, name: string }

export const slice = createSlice({
  name: 'chat',
  selectors: {
    selectMessages: sliceState => sliceState.messages,
    selectTypingUsers: sliceState => sliceState.typingUsers
  },
  initialState: {
    messages: [] as Message[],
    typingUsers: [] as User[]
  },
  reducers: {
    messegesRecived: (state, action: PayloadAction<Message[]>) => {
      state.messages = [...state.messages, ...action.payload]
    },
    newMessageRecived: (state, action: PayloadAction<Message>) => {
      state.messages = [...state.messages, action.payload]
      state.typingUsers = state.typingUsers.filter(u=> u.id !== action.payload.user.id)
    },
    typingUserAdded: (state, action: PayloadAction<User>) => {
      state.typingUsers = [...state.typingUsers.filter(u=>u.id !== action.payload.id), action.payload]
    }
  }
})

export const createConnection = () => (dispatch: AppDispatch) => {
  api.createConnection()
  api.subscribe(
    (messages: Message[], fn: (text: string)=>void) => {
      dispatch(slice.actions.messegesRecived(messages))
      fn('ok')
    },
    (message: Message) => {
      dispatch(slice.actions.newMessageRecived(message))
    },
    (user: User) => {
      dispatch(slice.actions.typingUserAdded(user))
    }
  )
}

export const destroyConnection = () => (dispatch: AppDispatch) => {
  api.destroyConnection()
}

export const setClientName = (name: string) => (dispatch: AppDispatch) => {
  api.sendName(name)
}

export const sendMessage = (message: string) => (dispatch: AppDispatch) => {
  api.sendMessage(message)
}

export const typeMessage = () => (dispatch: AppDispatch) => {
  api.typeMessage()
}

export const chatReducer = slice.reducer
export const {selectMessages, selectTypingUsers} = slice.selectors