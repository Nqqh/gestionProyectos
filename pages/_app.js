
import '../src/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../src/hooks/useAuth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;