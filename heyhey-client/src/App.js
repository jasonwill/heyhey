import './App.css'
import { Announcements } from './components/Announcements'
import { AnnouncementPage } from './components/AnnouncementPage'
import { AddAnnouncement } from './components/AddAnnouncement'
import { Users } from './components/Users'
import { UserPage } from './components/UserPage'
import { AddUser } from './components/AddUser'
import { AddUserAnnouncement } from './components/AddUserAnnouncement'
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
    path: "/User/:id",
    element: <UserPage/>
  },
  {
    path: "/UserAddAnnouncement/:id",
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
