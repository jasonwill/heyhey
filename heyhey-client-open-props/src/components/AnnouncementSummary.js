import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {Link} from '@tanstack/react-location'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export function Announcement({ id, announcement }) {
  return <div className='announcement-summary'>
    <Link to={`/Announcement/${announcement.id}`}><h5>{announcement.title}</h5></Link>
    <p>{announcement.id}</p>
    <p>{announcement.content}</p>
    <div>
      <p>{`Created ${dayjs(announcement.createdAt).fromNow()}, ${dayjs(announcement.createdAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <p>{`Updated ${dayjs(announcement.updatedAt).fromNow()}, ${dayjs(announcement.updatedAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
    </div>
    <br />
  </div>
}
