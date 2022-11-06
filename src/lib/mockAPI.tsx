import nock from "nock";

export const MockUsersByIdAPI = (userID:number) => {
  nock("http://localhost:4000")
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
    })
    .get(`/v1/users/${userID}`)
    .reply(200, {
      id: 1,
      username: "Gonçalo Estrelado",
      userImage: "",
      groupsIds: [1, 2],
      cards: [
        {
          id: 134634,
          authorId: 1,
          duration: "03h34",
          date: "05/09/2022",
          location: "Quinta da Alagoa",
          tags: ["Grind", "AtHome"],
          category: "Phisical Training",
          attachImage: "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?w=2000",
          description: "100 💪, 30 Abdominais, 20 Dorsais",
          groupName: "Grind Mindset",
          participants: [
            {
              id: 2,
              userImage:
                "https://external-preview.redd.it/ERjNu9y3IVe0uWs5mBsX97dWyQ9Js0jL-kUo5XHn4R8.jpg?auto=webp&s=823ebc8c7ae4198886cf6c0d23acde708d8aff03",
            },
            {
              id: 4,
              userImage: "",
            },
            {
              id: 4,
              userImage: "",
            },
            {
              id: 4,
              userImage: "",
            },
            {
              id: 4,
              userImage: "",
            },
            {
              id: 4,
              userImage: "",
            },
            {
              id: 4,
              userImage: "",
            },
          ],
        },
        {
          id: 135642,
          authorId: 1,
          duration: "57'54",
          date: "06/09/2022",
          location: "Quinta da Alagoa",
          tags: ["Grind"],
          category: "Phisical Training",
          attachImage: "",
          description: "100 Flexões, 30 Abdominais, 20 Dorsais",
          groupName: "Grind Mindset",
          participants: [
            {
              id: 2,
              userImage:
                "https://external-preview.redd.it/ERjNu9y3IVe0uWs5mBsX97dWyQ9Js0jL-kUo5XHn4R8.jpg?auto=webp&s=823ebc8c7ae4198886cf6c0d23acde708d8aff03",
            },
            {
              id: 4,
              userImage: "",
            },
            {
              id: 4,
              userImage: "",
            },
          ],
        },
      ],
    });
};
