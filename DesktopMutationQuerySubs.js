const createSendMessageMutation = gql`
  mutation sendMessage($address: String!, $body: String!, $file: FileCreateInput) {
    sendMessage(address: $address, body: $body, file: $file){
      id
      body
      address
    }
  }
`

const createMarkAsReadMutation = gql`
  mutation markThreadAsRead($threadId: Int!){
    markThreadAsRead(threadId: $threadId){
      success
      status
    }
  }
  `

const createAllMessagesSinceQuery = gql`
  query allMessagesSince($timestamp: String!){
    allMessagesSince(timestamp: $timestamp){
      userSent
      androidMsgId
      id
      address
      sender
      read
      body
      threadId
      error
      date
      files {
        id
        contentType
        content
        uploaded
      }
    }
  }
  `

const createMeQuery = gql`
  query me{
    me{
      name
      email
      phone
      id
      conversations{
        threadId
        id
        messages{
         userSent
          androidMsgId
          id
          address
          sender
          read
          body
          threadId
          error
          date
          files {
            id
            contentType
            content
            uploaded
          }
        }
        participants{
          phone
          name
        }
      }
      syncComplete
    }
  }
  `
const createNewMessageSubscription = gql`
  subscription newMessage($token: String!){
    subscription newMessage(token: $token){
     userSent
      androidMsgId
      id
      address
      sender
      read
      body
      threadId
      error
      date
      files {
        id
        contentType
        content
        uploaded
      }
    }
  }
  `

const createAllContactsQuery = gql`
  query allContacts {
    allContacts {
      phone
      name
    }
  }
 `