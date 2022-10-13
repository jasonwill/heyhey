import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {Announcement} from './Announcement'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export function UserDetail({ id, user }) {
  let announcements = "none"
  if (user.announcementsByAuthorId.nodes.length > 0) {
    announcements = user.announcementsByAuthorId.nodes.map(announcement => (
      <Announcement key={announcement.id} announcement={announcement} />
    ))
  }
  
  return <>
    <p>Author: {user.username}</p>
    <div>
      <p>{`Created ${dayjs(user.createdAt).fromNow()}, ${dayjs(user.createdAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <p>{`Updated ${dayjs(user.updatedAt).fromNow()}, ${dayjs(user.updatedAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <h2>Announcements</h2>{announcements}
    </div>
    <br />
  </>
}
