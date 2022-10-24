import { useQuery, gql } from '@apollo/client'
import { AnnouncementDetail } from '../components/AnnouncementDetail'
import { Link, useMatch } from '@tanstack/react-location'

export const getAnnouncement = gql`
query GetAnnouncement($id: BigInt!) {
  announcementById(id: $id) {
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

export function Announcement() {
  const { loading, error, data } = useQuery(getAnnouncement, {
    variables: {
      "id": useMatch().params.id
    }
  })

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>


  const announcement =  (
    <AnnouncementDetail announcement={data.announcementById} />
  )
  return (
  <div>
    {announcement}
    <Link to = "/AddAnnouncement">Add Announcement</Link><br/>
    <Link to = "/">All Announcements</Link>
  </div>
  )
}


