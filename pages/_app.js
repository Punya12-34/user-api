import RouteGuard from '@/components/RouteGuard'; 
import '@/styles/bootstrap.min.css';
import { SWRConfig } from 'swr';
import Layout from '@/components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard> {/* ✅ Wrap everything inside RouteGuard */}
      <Layout>
        <SWRConfig value={{
          fetcher: async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
              const error = new Error('An error occurred while fetching the data.');
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          }
        }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </RouteGuard>
  );
}
