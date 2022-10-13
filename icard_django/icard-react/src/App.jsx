import './assets/main.css';
import { ToastContainer } from 'react-toastify';
import {Navigation} from './routes'
import {AuthProvider} from './context'

function App() {

  return (
    <AuthProvider>
      <Navigation />

      <ToastContainer 
        position='bottom-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  )
}

export default App