import { useQuery, gql } from '@apollo/client'
import { UserDetail } from './UserDetail'
import { Link, useMatch } from '@tanstack/react-location'

export const getUser = gql`
query GetUserById($id: BigInt!) {
  userById(id: $id) {
    nodeId
    id
    username
    createdAt
    updatedAt
    announcementsByAuthorId {
      nodes {
        id
        title
        nodeId
        createdAt
        updatedAt
      }
    }
  }
}
`

export function UserPage() {
  
  const { loading, error, data } = useQuery(getUser, {
    variables: {
      "id": useMatch().params.id
    }
  })

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>


  const user =  (
    <UserDetail user={data.userById} />
  )

  return (
  <div>
    {user}
    <Link to = "/AddUser">Add User</Link><br/>
    <Link to = "/Users">All Users</Link><br/>
    <Link to = {`/UserAddAnnouncement/${data.userById.id}`}>Add Announcement</Link>
    {/* TODO fix the route for adding an announcement */}
  </div>
  )
}


