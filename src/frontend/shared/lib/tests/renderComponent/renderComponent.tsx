import { render } from '@testing-library/react'
import { ReactNode, useCallback } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ReducersMapObject } from '@reduxjs/toolkit'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
// eslint-disable-next-line fsd-project/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Theme } from '@/shared/context/ThemeContext'
// eslint-disable-next-line fsd-project/layer-imports
import '@/app/ui/App/App.scss'

interface InitialProps {
    route?: string | { route: string; path: string }
    withRouting?: boolean
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

    const { route = '/', withRouting = true, initialState, asyncReducers, theme = Theme.DARK } = options

    const content = (
        <I18nextProvider i18n={i18nForTests}>
            <ThemeProvider>
                <div className={`app ${theme}`}>{children}</div>
            </ThemeProvider>
        </I18nextProvider>
    )

    const makeRouting = useCallback(
        (content: ReactNode) => {
            if (typeof route === 'string') {
                return <MemoryRouter initialEntries={[route]}>{content}</MemoryRouter>
            }

            return (
                <MemoryRouter initialEntries={[route.route]}>
                    <Routes>
                        <Route path={route.path} element={content} />
                    </Routes>
                </MemoryRouter>
            )
        },
        [route],
    )

    const contentWithRouting = withRouting ? makeRouting(content) : content

    return (
        <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
            {contentWithRouting}
        </StoreProvider>
    )
}

export function renderComponent(component: ReactNode, options: InitialProps = {}) {
    return render(<TestProvider options={options}>{component}</TestProvider>)
}
