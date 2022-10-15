import { gql, useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import { Link, useMatch } from '@tanstack/react-location'
import { useRef }  from 'react'

const AddAnnouncementMutation = gql`
mutation CreateAnAnnouncement($ann: CreateAnnouncementInput!){
  createAnnouncement(input :$ann) {
     announcement{
      title
      content
    }
  }
}
`
export function AddUserAnnouncement() {
  let input
  const userid = useMatch().params.userid
  // debugger
  const [addAnnouncement, { data, loading, error }] = useMutation(AddAnnouncementMutation)

  const titleRef = useRef()
  const contentRef = useRef()

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
                  "title": titleRef.current.value,
                  "content": contentRef.current.value,

                  "updatedAt": dayjs().format('YYYY-MM-DDTHH:mm:ss'),
                  "createdAt": dayjs().format('YYYY-MM-DDTHH:mm:ss')
                }
              }
            }
                }
          );
          //input.value = ''
        }}
      >
        <input type = "text" ref={titleRef} placeholder="title"></input>
        <input type = "text" ref={contentRef} placeholder="content"></input>

        <button type="submit">Add Announcement</button>
      </form>
      <Link to = "/">All Announcements</Link>
    </div>
  );
}