import { rtkApiJson } from '@/shared/api/rtkApi'
import { Notification } from '../model/types/Notification'

const notificationsApi = rtkApiJson.injectEndpoints({
  endpoints: (build) => ({
    getNotificationsList: build.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
  overrideExisting: false,
})

export const useNotificationsList = notificationsApi.useGetNotificationsListQuery
