import { render } from 'preact'
import { QueryClient, QueryClientProvider } from 'react-query'
import { App } from './app.tsx'
import './index.css'
import './app.css'

const queryClient = new QueryClient()

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('app')!,
)
