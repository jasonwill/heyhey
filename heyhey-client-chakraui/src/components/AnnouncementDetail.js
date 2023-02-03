import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export function AnnouncementDetail({ id, announcement }) {
  return <>
    <p>{announcement.title}</p>
    <div>
      <p>{`Created ${dayjs(announcement.createdAt).fromNow()}, ${dayjs(announcement.createdAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <p>{`Updated ${dayjs(announcement.updatedAt).fromNow()}, ${dayjs(announcement.updatedAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <div>
        <div>Created By: {announcement.userByAuthorId?.username}</div>
      </div>
    </div>
    <br />
  </>
}
