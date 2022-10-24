import { useQuery, gql } from '@apollo/client'
import { Announcement } from '../components/AnnouncementSummary'
import { Link } from '@tanstack/react-location'

export const getAllAnnouncements = gql`
query GetFilteredAnnouncements($text: String! $end: Cursor $count: Int!)  {
  allAnnouncements (filter:{title : {includes: $text } } after: $end first: $count){
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      id
      nodeId
      authorId
      title
      content
      createdAt
      updatedAt
      userByAuthorId {
        username
        createdAt
      }
    }
  }
}
`

export function Announcements() {
  let endCursor = null
  const { loading, error, data } = useQuery(getAllAnnouncements, {
    variables: {
      text : "",
      end: endCursor,
      count: 10
    }
  })

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>

  endCursor = data.allAnnouncements.pageInfo.endCursor;

  const announcements = data.allAnnouncements.nodes.map(announcement => (
    <Announcement key={announcement.id} announcement={announcement} />
  ))
  return (
  <div>
    <div>End Cursor: {endCursor}</div>
    {announcements}
    <Link to = "AddAnnouncement">Add Announcement</Link>
  </div>
  )
}


