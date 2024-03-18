import Router from './routes'
import { Toaster } from 'react-hot-toast'

function App(): JSX.Element {
  return (
    <>
      <Toaster position='bottom-right' reverseOrder={false} />
      <Router />
    </>
  )
}

export default App
