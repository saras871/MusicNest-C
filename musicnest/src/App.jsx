import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Nav from './components/nav'
import HomePage from './HomePage'
import MusicGroupList from './MusicGroupList'
import MusicGroupDetails from './MusicGroupDetails'


function App() {

  return (
    <BrowserRouter>
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
