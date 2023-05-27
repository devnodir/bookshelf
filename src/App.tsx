import React, { Suspense } from 'react'
import ThemeProvider from '@/providers/ThemeProvider'
import AuthProvider from '@/providers/AuthProvider'
import { SnackbarProvider } from 'notistack';
import Layout from './layout';
import PageLoader from './components/elements/PageLoader';
import RenderRoutes from './components/elements/RenderRoutes';
import { privateRoutes, publicRoutes } from './routes';

const App: React.FC = () => {

  return (
    <ThemeProvider>
      <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Suspense fallback={<PageLoader />}>
          <AuthProvider
            render={(isAuth) => (
              isAuth ?
                <Layout>
                  <RenderRoutes routes={privateRoutes} />
                </Layout> :
                <RenderRoutes routes={publicRoutes} />
            )}
          />
        </Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App