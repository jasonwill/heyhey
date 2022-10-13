import { gql, useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import { Link } from '@tanstack/react-location'

const AddUserMutation = gql`
mutation CreateAUser($userInput: CreateUserInput!){
  createUser(input :$userInput) {
     user {
      username
    }
  }
}
`
export function AddUser() {
  let input
  const [addUser, { _, loading, error }] = useMutation(AddUserMutation)

  if (loading)
    return 'Submitting...'
  if (error)
    return `Submission error! ${error.message}`

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addUser({ 
            variables: {
              "userInput": {
                "user": {
                  "username": input.value,
                  "updatedAt": dayjs().format('YYYY-MM-DDTHH:mm:ss'),
                  "createdAt": dayjs().format('YYYY-MM-DDTHH:mm:ss')
                }
              }
            }
                }
          );
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">Add User</button>
      </form>
      <Link to = "/Users">All Users</Link>
    </div>
  );
}