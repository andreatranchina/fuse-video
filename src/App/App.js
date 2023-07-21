import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useThemeContext } from ".././theme/ThemeContextProvider"
import { HelmetProvider } from 'react-helmet-async'
import Home from '.././pages/Home'
import Join from '.././pages/Join'
import Host from '.././pages/Host'
import HostPage from '../pages/HostPage'
import CallPage from '.././pages/CallPage';
import LoginPage from '.././pages/LoginPage';
import SignUpPage from '.././pages/SignUpPage';
import Translations from '.././pages/Translations'
import Customizations from '.././pages/Customizations'
import Profile from '.././pages/Profile'
import RootLayout from '.././layouts/RootLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/profile" element={<Profile/>}/>
      {/* <Route path="/join" element={<Join/>}/>
      <Route path="/host" element={<Host/>}> */}
      <Route path="/join" element={<CallPage/>}/>
      <Route path="/host" element={<HostPage/>}>
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
      <HelmetProvider>
        <div className="App">
          <RouterProvider router={router}/>
        </div>
      </HelmetProvider>
  </ThemeProvider>
  );
}

export default App;
