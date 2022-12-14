import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import {Link} from '@tanstack/react-location'

dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export function UserSummary({ id, user }) {
  return <>
    <Link to={`/User/${user.id}`}>{user.username}</Link>
    <p>{user.id}</p>
    <div>
      <p>{`Created ${dayjs(user.createdAt).fromNow()}, ${dayjs(user.createdAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
      <p>{`Updated ${dayjs(user.updatedAt).fromNow()}, ${dayjs(user.updatedAt).format('dddd, MMMM D, YYYY h:mm:ss A')}`}</p>
    </div>
    <br />
  </>
}
