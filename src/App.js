import './App.css';
import Bigboard from './components/Board';
import { createBrowserRouter, RouterProvider,} from 'react-router-dom'
let allroute=createBrowserRouter(
  [
    {path:'/',element:<Bigboard/>}
  ]
)
function App() {
  return (
    <RouterProvider router={allroute}/>
  );
}

export default App;
