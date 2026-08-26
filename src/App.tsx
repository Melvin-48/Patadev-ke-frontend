import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import ScrollToTop from './components/common/ScrollToTop';
import PageTransitionLoader from './components/common/PageTransitionLoader';

export default function App() {
  return (
    <BrowserRouter>
      <PageTransitionLoader />
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}