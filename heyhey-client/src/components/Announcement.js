import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export function Announcement({ id, announcement }) {
  return <>
    <h3>{announcement.title}</h3>
    <div>
      <p>{`Created ${dayjs(announcement.createdAt).fromNow()}, ${dayjs(announcement.createdAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <p>{`Updated ${dayjs(announcement.updatedAt).fromNow()}, ${dayjs(announcement.updatedAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
    </div>
    <br />
  </>
}
