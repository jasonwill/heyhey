import './App.css'
import { Announcements } from './components/Announcements'
import { AddAnnouncement } from './components/AddAnnouncement'
import { AnnouncementPage } from './components/AnnouncementPage'
import { Router, Outlet, ReactLocation } from '@tanstack/react-location'

const routes = [
  {
    path: "/",
    element: <Announcements/>
  },
  {
    path: "/Announcement/:id",
    element: <AnnouncementPage/>
  },
  {
    path: "AddAnnouncement",
    element: <AddAnnouncement />

  }
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
