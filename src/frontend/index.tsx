import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { StoreProvider } from '@/app/providers/StoreProvider'
import App from '@/app/App'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'

import '@/shared/config/i18n'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Отсутствует контейнер для монтирования react-приложения')
}

const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>,
)
