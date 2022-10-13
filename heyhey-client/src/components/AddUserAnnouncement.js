import { gql, useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import { Link, useMatch } from '@tanstack/react-location'


const AddAnnouncementMutation = gql`
mutation CreateAnAnnouncement($ann: CreateAnnouncementInput!){
  createAnnouncement(input :$ann) {
     announcement{
      title
    }
  }
}
`
export function AddUserAnnouncement() {
  let input
  const userid = useMatch().params.id
  // debugger
  const [addAnnouncement, { data, loading, error }] = useMutation(AddAnnouncementMutation)

  if (loading)
    return 'Submitting...'
  if (error)
    return `Submission error! ${error.message}`

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addAnnouncement({ 
            variables: {
              "ann": {
                "announcement": {
                  "authorId": userid,
                  "title": input.value,
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
        <button type="submit">Add Announcement</button>
      </form>
      <Link to = "/">All Announcements</Link>
    </div>
  );
}