import React, { ReactNode, Suspense } from 'react'
import { ErrorOnPage } from '@/widgets/ErrorOnPage/ErrorOnPage'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState{
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback="">
          <ErrorOnPage />
        </Suspense>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
