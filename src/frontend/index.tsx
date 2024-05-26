import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'

import App from './app/ui/App/App'
import { AppRouterProvider } from './app/providers/AppRouterProvider'
import { AppInitProvider } from './app/providers/AppInitProvider'
import { LanguageProvider } from './app/providers/LanguageProvider'

const container = document.getElementById('root')

if (!container) {
    throw new Error('Отсутствует контейнер для монтирования react-приложения')
}

const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
    <StoreProvider>
        <ErrorBoundary>
            <ThemeProvider>
                <LanguageProvider>
                    <AppInitProvider>
                        <AppRouterProvider app={<App />} />
                    </AppInitProvider>
                </LanguageProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </StoreProvider>,
)
