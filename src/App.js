import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeContext } from "./theme/ThemeContextProvider";
import Home from './pages/Home'
import Join from './pages/Join'
import Host from './pages/Host'
import Translations from './pages/Translations'
import Customizations from './pages/Customizations'
import RootLayout from './layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/join" element={<Join/>}/>
      <Route path="/host" element={<Host/>}>
        {/* <Route path="/golive"/> /host/golive
         <Route path="/schedule"/> /host/schedule <------- nested routes */}
      </Route>
      <Route path="/translate" element={<Translations/>}>
       {/* <Route path="/preferences" />
        <Route path="/import" />    <---- more nested routes, etc */}
      </Route>
      <Route path="/customize" element={<Customizations/>}/>
    </Route>
  )
)

function App() {

  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
     </ThemeProvider>
  );
}

export default App;
