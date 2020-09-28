const {
    buildSchema,
} = require("graphql");

const schema = buildSchema(`
type Company {
  name: String
  catchPhrase: String
  bs: String
}

type Geo {
  lat: String
  lng: String
}

type Address {
  street: String
  suite: String
  city: String
  zipcode: String
  geo: Geo
}

type User {
  id: ID!
  name: String
  username: String
  email: String
  phone: String
  website: String
  company: Company
  address: Address
}

type Post {
  userId: ID!
  id: ID!
  title: String
  body: String
}

input PostInput {
  title: String
  body: String
}

type Comment {
  postId: ID!
  id: ID!
  name: String
  email: String
  body: String
}

type Query {
  allUsers: [User!]!
  allPosts: [Post!]!
  allComments: [Comment!]!
  
  user(id: ID!): User
  post(id: ID!): Post
  comment(id: ID!): Comment
  
  commentByPost(id: ID!): [Comment!]!
}

type Mutation {
  updatePost(id: ID!, input: PostInput): Post 
  deletePost(id: ID!): ID! 
}
`);

module.exports = schema;