import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/auth-slice"
import ticketReducer from "../features/tickets/ticket-slice"
import noteReducer from "../features/notes/note-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
})
