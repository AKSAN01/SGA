import { AppProvider } from './context/AppContext';
import { AppRouter } from './routes/AppRouter';
import './index.css';

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
