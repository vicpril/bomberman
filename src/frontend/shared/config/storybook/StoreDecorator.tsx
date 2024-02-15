import { Story } from '@storybook/react'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// import { loginReducer } from '@/features/AuthByUsername/model/slices/loginSlice'
// import { profileReducer } from '@/entities/Profile'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { profileReducer } from '@/entities/Profile'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { addCommentFormReducer } from '@/widgets/AddCommentForm/testing'
import { articleCommentsListReducer } from '@/features/ArticleCommentsList/testing'

const defaultAsyncReducers: ReducersList = {
  // loginForm: loginReducer,
  // profile: profileReducer,
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articleCommentsList: articleCommentsListReducer,
}

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
)
