import { RouteProps } from 'react-router-dom'
import { UserRoles } from '@/shared/const/UserRoles'

export enum AppRoutes {
  Main = 'main',
  Game = 'game',
  // About = 'about',
  Profile = 'profile',
  Articles = 'articles',
  ArticlesDetail = 'articlesDetail',
  AdminPanel = 'adminPanel',
  Forbidden = 'forbidden',
  NotFound = 'notFound'
}

export type AppRoutesProps = RouteProps & {
  authRequired?: boolean
  roles?: UserRoles[]
}

export const GetRoutePaths = {
  [AppRoutes.Main]: () => '/',
  [AppRoutes.Game]: () => '/game',
  // [AppRoutes.About]: () => '/about',
  [AppRoutes.Profile]: (id: string) => `/profile/${id}`, // + :id
  [AppRoutes.Articles]: () => '/articles',
  [AppRoutes.ArticlesDetail]: (id: string) => `/articles${id}`, // + :id
  [AppRoutes.AdminPanel]: () => '/admin',
  [AppRoutes.Forbidden]: () => '/forbidden',
  [AppRoutes.NotFound]: () => '/*',
}

// export const RoutePaths: Record<AppRoutes, string> = {
//   [AppRoutes.Main]: '/',
//   [AppRoutes.Game]: '/game',
//   // [AppRoutes.About]: '/about',
//   [AppRoutes.Profile]: '/profile', // + :id
//   [AppRoutes.Articles]: '/articles',
//   [AppRoutes.ArticlesDetail]: '/articles', // + :id
//   [AppRoutes.AdminPanel]: '/admin', // + :id
//   [AppRoutes.Forbidden]: '/forbidden',
//   [AppRoutes.NotFound]: '/*',
// }
