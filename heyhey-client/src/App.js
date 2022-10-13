import './App.css'
import { Announcements } from './components/Announcements'
import { AnnouncementPage } from './components/AnnouncementPage'
import { AddAnnouncement } from './components/AddAnnouncement'
import { Users } from './components/Users'
import { UserPage } from './components/UserPage'
import { AddUser } from './components/AddUser'
import { Router, Outlet, ReactLocation } from '@tanstack/react-location'

const routes = [
  {
    path: "/", //todo landing page
    element: <Announcements/>
  },
  {
    path: "/Announcement/:nodeId",
    element: <AnnouncementPage/>
  },
  {
    path: "/AddAnnouncement",
    element: <AddAnnouncement />
  },
  {
    path: "/Users",
    element: <Users/>
  },
  {
    path: "/User/:nodeId",
    element: <UserPage/>
  },
  {
    path: "/AddUser",
    element: <AddUser />
  },

];

const location = new ReactLocation()

export default function App() {
  return (
    <Router routes = { routes } location = {location}>
      <div>
        <Outlet />
      </div>
    </Router>
  )
}
