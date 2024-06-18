import './App.css';
import './index.css';
import AppNav from './navigation/AppNav';
import { AuthProvider } from './context/Authentication';
function App() {
  return (
   <AuthProvider>
      <AppNav/>
   </AuthProvider>
  );
}

export default App;
