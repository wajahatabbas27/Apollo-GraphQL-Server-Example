const { ApolloServer, gql } = require('apollo-server');

//data
let Student = [
  {
    id: 1,
    name: 'aamir',
    email: "aamir@gmail.com",
    age: 45
  },
  {
    id: 2,
    name: 'saif',
    email: "saif@gmail.com",
    age: 22
  },
  {
    id: 3,
    name: 'ali',
    email: "ali@gmail.com",
    age: 27
  },
  {
    id: 4,
    name: 'gul',
    email: "gul@gmail.com",
    age: 24
  },
];

//schema
const typeDefs = gql`
  
  type Student {
    id: Int
    name: String
    email: String
    age: Int
  }

  input StdInput {
    id: Int
    name: String
    email: String
    age: Int
  }

  type Query {
    students: [Student]
  }
  
  type Mutation {
    addStudent(input: StdInput) : Student
  }
`;

//resolver
const resolvers = {
  Query: {
    students: () => Student,
  },

  Mutation: {
    addStudent: (_, { input }) => {
      console.log(input);
      Student.push({
        name: input.name,
        age: input.age,
        email: input.email,
        id: input.id
      })
      return {
        name: input.name,
        age: input.age,
        email: input.email,
        id: input.id
      }
    }
  }

};

//server
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
