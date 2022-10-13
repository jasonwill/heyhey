import { useQuery, gql } from '@apollo/client'
import { UserDetail } from './UserDetail'
import { Link, useMatch } from '@tanstack/react-location'

export const getUser = gql`
query GetUser($nodeId: ID!) {
  user(nodeId: $nodeId) {
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
      "nodeId": useMatch().params.nodeId
    }
  })

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>


  const user =  (
    <UserDetail user={data.user} />
  )
  return (
  <div>
    {user}
    <Link to = "/AddUser">Add User</Link><br/>
    <Link to = "/Users">All Users</Link><br/>
    <Link to = "/AddAnnouncement">Add Announcement</Link>
    {/* Todo add the user to the route for adding an announcement */}
  </div>
  )
}


