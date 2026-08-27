import { BrowserRouter, Routes, Route, } from 'react-router'
import Nav from './components/nav'
import HomePage from './HomePage'
import MusicGroupList from './MusicGroupList'
import MusicGroupDetails from './MusicGroupDetails'


function App() {

  return (
    <BrowserRouter>
    {/* Renders the navigation bar at the top of all pages */}
    <Nav/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
          <Route path="/music-groups" element={<MusicGroupList />}/>
            <Route path="/music-groups/:id" element={<MusicGroupDetails />}/>
            </Routes>
          </BrowserRouter>
          );
}

          export default App
