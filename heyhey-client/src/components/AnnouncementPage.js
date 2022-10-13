import { useQuery, gql } from '@apollo/client'
import { Announcement } from './Announcement'
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

export function AnnouncementPage() {
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
    <Announcement key={data.announcementById.id} announcement={data.announcementById} />
  )
  return (
  <div>
    {announcement}
    <Link to = "AddAnnouncement">Add Announcement</Link><br/>
    <Link to = "/">All Announcements</Link>
  </div>
  )
}


