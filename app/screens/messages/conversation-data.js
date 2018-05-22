const conversations = [
  {
    id: '1',
    threadId: '1',
    participants: [
      {
        name: 'Bob Ross',
        phone: '801-555-5555',
      },
    ],
    messages: [
      {
        address: '801-555-5555',
        read: true,
        sender: '801-555-5555',
        body: 'DO YOU LIKE TO PAINT!',
        timestamp: 'Just now',
        userSent: false,
        files: [
          {
            id: 0,
            contentType: 'png',
            content: 'filename.png',
            uploaded: true,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    threadId: '2',
    participants: [
      {
        name: 'Black Panther',
        phone: '801-777-7777',
      },
    ],
    messages: [
      {
        address: '801-777-7777',
        read: true,
        sender: '801-777-7777',
        body: 'Dont freeze!',
        timestamp: 'Just now',
        userSent: true,
        files: [
          {
            id: 2,
            contentType: 'png',
            content: 'filename.png',
            uploaded: true,
          },
        ],
      },
      {
        address: '801-777-7777',
        read: true,
        sender: '801-777-7777',
        body: 'I never freeze!',
        timestamp: 'Just now',
        userSent: false,
        files: [
          {
            id: 1,
            contentType: 'png',
            content: 'filename.png',
            uploaded: true,
          },
        ],
      },
      {
        address: '801-777-7777',
        read: true,
        sender: '801-777-7777',
        body: 'FREEZE ON THIS, SUCKA!',
        timestamp: 'Just now',
        userSent: true,
        files: [
          {
            id: 3,
            contentType: 'png',
            content: 'filename.png',
            uploaded: true,
          },
        ],
      },
    ],
  },
]

export default conversations
