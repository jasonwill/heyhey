import './App.css'
import { Announcements } from './pages/Announcements'
import { Announcement } from './pages/Announcement'
import { AddAnnouncement } from './pages/AddAnnouncement'
import { Users } from './pages/Users'
import { User } from './pages/User'
import { AddUser } from './pages/AddUser'
import { AddUserAnnouncement } from './pages/AddUserAnnouncement'
import { Router, Outlet, ReactLocation } from '@tanstack/react-location'
import { MainNavigation } from './components/MainNavigation'

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
    children: [
      {
        path: '/',
        element: <User/>
      },
      {
        path: "AddAnnouncement",
        element: <AddUserAnnouncement/>
      },
    ],
  },
  {
    path: "/AddUser",
    element: <AddUser />
  },

];

const location = new ReactLocation()

export default function App() {
  return (
    <Router children = { null } routes = { routes } location = {location}>
      <MainNavigation />
      <div>
        <Outlet />
      </div>
    </Router>
  )
}
