import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

import { Profile, ProfileSchema, profileReducer } from '@/entities/Profile'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import ProfilePage from './ProfilePage'

const mockProfileData: Profile = {
  id: 1,
  username: 'user1',
  firstname: 'Vic',
  lastname: 'Pr',
  age: 20,
  avatar: 'https://robohash.org/EJ7.png?set=set1&size=150x150',
  country: Country.Russia,
  currency: Currency.RUB,
}

const mockState: ProfileSchema = {
  data: mockProfileData,
  isLoading: false,
  error: undefined,
  readonly: false,
}

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  decorators: [
    StoreDecorator(
      { profile: mockState, user: { authData: { id: '1' } } },
      { profile: profileReducer },
    ),
  ],
} as ComponentMeta<typeof ProfilePage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />

export const Default = Template.bind({})
Default.args = {}
