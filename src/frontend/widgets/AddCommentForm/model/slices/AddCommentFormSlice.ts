import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AddCommentFormSchema } from '../types/AddCommentFormSchema'

const initialState: AddCommentFormSchema = {
    text: '',
}

const AddCommentFormSlice = createSlice({
    name: 'AddCommentForm',
    initialState: { ...initialState },
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
    },
})

export const { actions: addCommentFormActions } = AddCommentFormSlice
export const { reducer: addCommentFormReducer } = AddCommentFormSlice
