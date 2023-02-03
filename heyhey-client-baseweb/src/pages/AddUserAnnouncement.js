import { gql, useMutation } from '@apollo/client'
import dayjs from 'dayjs'
import { Link, useMatch } from '@tanstack/react-location'
import { useRef, useState }  from 'react'

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

  const [announcementInfo, setAnnouncementInfo] = useState({
    title: "",
    content: "",
    updatedAt: "",
    createdAt: "",
  });

  const handleChange = (event) => {
    debugger;
    setAnnouncementInfo({ ...announcementInfo, [event.target.name]: event.target.value });
  };

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
                  "title": announcementInfo.title,
                  "content": announcementInfo.content,
                  "updatedAt": dayjs().format('YYYY-MM-DDTHH:mm:ss'),
                  "createdAt": dayjs().format('YYYY-MM-DDTHH:mm:ss')
                }
              }
            }
                }
          );
          setAnnouncementInfo({ title: "", content: "" });
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={announcementInfo.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Content"
          value={announcementInfo.content}
          onChange={handleChange}
        />
        
        <button type="submit">Add Announcement</button>
      </form>
      <Link to = "/">All Announcements</Link>
    </div>
  );
}