import { useQuery, gql } from '@apollo/client'
import { AnnouncementDetail } from './AnnouncementDetail'
import { Link, useMatch } from '@tanstack/react-location'

export const getAnnouncement = gql`
query GetAnnouncement($nodeId: ID!) {
  announcement(nodeId: $nodeId) {
    nodeId
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
`

export function AnnouncementPage() {
  const { loading, error, data } = useQuery(getAnnouncement, {
    variables: {
      "nodeId": useMatch().params.nodeId
    }
  })

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>


  const announcement =  (
    <AnnouncementDetail announcement={data.announcement} />
  )
  return (
  <div>
    {announcement}
    <Link to = "/AddAnnouncement">Add Announcement</Link><br/>
    <Link to = "/">All Announcements</Link>
  </div>
  )
}


