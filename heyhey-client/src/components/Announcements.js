import { useQuery, gql } from '@apollo/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { Announcement } from './Announcement'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export const getAllAnnouncements = gql`
query GetAllAnnouncements {
  allAnnouncements{
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      id
      authorId
      title
      content
      createdAt
      userByAuthorId {
        username
        createdAt
      }
    }
  }
}
`

export function Announcements() {
  const { loading, error, data } = useQuery(getAllAnnouncements)

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>

  return data.allAnnouncements.nodes.map(announcement => (
    <Announcement key={announcement.id} announcement={announcement} />
  ))
}


