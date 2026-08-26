import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import ScrollToTop from './components/common/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
}