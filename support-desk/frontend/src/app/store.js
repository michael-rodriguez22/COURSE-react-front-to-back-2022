import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/auth-slice"
import ticketReducer from "../features/tickets/ticket-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
  },
})
