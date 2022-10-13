import { useQuery, gql } from '@apollo/client'
import { User } from './User'
import { Link } from '@tanstack/react-location'

export const getAllUsers = gql`
query GetAllUsers {
  allUsers {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    nodes {
      username
      id
      nodeId
      createdAt
      updatedAt
      announcementsByAuthorId {
        nodes {
          title
        }
      }
    }
  }
}
`

export function Users() {
  let endCursor = null
  const { loading, error, data } = useQuery(getAllUsers)

  if (loading)
    return <p>Loading...</p>
  if (error)
    return <p>Error :(</p>

  endCursor = data.allUsers.pageInfo.endCursor;

  const users = data.allUsers.nodes.map(user => (
    <User key={user.id} user={user} />
  ))
  return (
  <div>
    <div>End Cursor: {endCursor}</div>
    {users}
    <Link to = "/AddUser">Add User</Link>
  </div>
  )
}


