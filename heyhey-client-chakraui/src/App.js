import './App.css'
import { Announcements } from './pages/Announcements'
import { Announcement } from './pages/Announcement'
import { AddAnnouncement } from './pages/AddAnnouncement'
import { Users } from './pages/Users'
import { User } from './pages/User'
import { AddUser } from './pages/AddUser'
import { AddUserAnnouncement } from './pages/AddUserAnnouncement'
import { Router, Outlet, ReactLocation } from '@tanstack/react-location'

const routes = [
  {
    path: "/", //todo landing page
    element: <Announcements/>
  },
  {
    path: "/Announcements",
    element: <Announcements/>
  },
  {
    path: "/Announcement/:id",
    element: <Announcement/>
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
    path: "/User/:id",
    element: <User/>
  },
  {
    path: "/UserAddAnnouncement/:userid",
    element: <AddUserAnnouncement/>
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
