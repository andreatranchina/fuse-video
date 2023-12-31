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
import HostPage from '../pages/HostPage'
import JoinPage from '../pages/JoinPage'
import LivestreamPage from '../pages/LivestreamPage'
import VideoChatPage from '../pages/VideoChatPage'
import LoginPage from '.././pages/LoginPage';
import SignUpPage from '.././pages/SignUpPage';
import ExplorePage from '.././pages/ExplorePage';
import Translations from '.././pages/Translations'
import Customizations from '.././pages/Customizations'
import Profile from '.././pages/Profile'
import ViewProfile from '../pages/ViewProfile'
import RootLayout from '.././layouts/RootLayout'
import { connectWithSocketIO } from '../utils/socketIO'

let socket = connectWithSocketIO();
// let socket = null;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/signup" element={<SignUpPage/>}/>
      <Route path="/profile/:id" element={<Profile/>}/>
      <Route path="/viewProfile/:id" element={<ViewProfile />} />
      {/* <Route path="/join" element={<Join/>}/>
      <Route path="/host" element={<Host/>}> */}
      <Route path="/join" element={<JoinPage socket={socket}/>}/>
      <Route path="/host" element={<HostPage socket={socket}/>} />
      <Route path="/livestream/:code" element={<LivestreamPage socket={socket} />} />
      <Route path="/videochat/:code" element={<VideoChatPage socket={socket} />} />
      <Route path="/explore" element={<ExplorePage />} />
      {/* <Route path="/join" element={<JoinPage />}/>
      <Route path="/host" element={<HostPage />} />
      <Route path="/livestream/:code" element={<LivestreamPage />} /> */}
        {/* <Route path="/golive"/> /host/golive
         <Route path="/schedule"/> /host/schedule <------- nested routes */}
      <Route path="/translate" element={<Translations/>}/>
       {/* <Route path="/preferences" />
        <Route path="/import" />    <---- more nested routes, etc */}
      <Route path="/customize" element={<Customizations/>}/>
    </Route>
  )
)

function App() {
  const { theme } = useThemeContext()

  return (
  <HelmetProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <div className="App">
          <RouterProvider router={router}/>
        </div>
    </ThemeProvider>
  </HelmetProvider>
  );
}

export default App;
