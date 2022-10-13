import './App.css'
import { Announcements } from './components/Announcements'
import { AddAnnouncement } from './components/AddAnnouncement'
import { Router } from '@tanstack/react-location'

export default function App() {
  return (
    <div>
      <h2>Hey Hey</h2>
      <Announcements />
      <AddAnnouncement />
    </div>
  )
}
