import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketService from "./ticket-service"

const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
}

export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: state => initialState,
  },
  extraReducers: builder => {},
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
