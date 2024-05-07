import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
// eslint-disable-next-line fsd-project/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Theme } from '@/shared/context/ThemeContext'
// eslint-disable-next-line fsd-project/layer-imports
import '@/app/App.scss'

interface InitialProps {
    route?: string | { route: string; path: string }
    initialState?: DeepPartial<StateSchema>
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
    theme?: Theme
}

interface TestProviderProps {
    children: ReactNode
    options?: InitialProps
}

export function TestProvider(props: TestProviderProps) {
    const { children, options = {} } = props

    const { route = '/', initialState, asyncReducers, theme = Theme.DARK } = options

    const content = (
        <I18nextProvider i18n={i18nForTests}>
            <ThemeProvider>
                <div className={`app ${theme}`}>{children}</div>
            </ThemeProvider>
        </I18nextProvider>
    )

    if (typeof route === 'string') {
        return (
            <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
                <MemoryRouter initialEntries={[route]}>{content}</MemoryRouter>
            </StoreProvider>
        )
    }

    return (
        <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
            <MemoryRouter initialEntries={[route.route]}>
                <Routes>
                    <Route path={route.path} element={content} />
                </Routes>
            </MemoryRouter>
        </StoreProvider>
    )
}

export function renderComponent(component: ReactNode, options: InitialProps = {}) {
    return render(<TestProvider options={options}>{component}</TestProvider>)
}
