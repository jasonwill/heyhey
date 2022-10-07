import { useQuery, gql } from '@apollo/client'
import { Announcement } from './Announcement'

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


