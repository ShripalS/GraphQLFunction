// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }

const Koa = require('koa');

const { ApolloServer, gql } = require('apollo-server-azure-functions');

const order = require('./models/tb_employee');
const {resolver} = require('graphql-sequelize');
const tb_employee = require('./models/tb_employee');

// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

const typeDefs = gql`
  type Query {
    tb_employee(emp_name: ID!): Tb_Employee
    tb_employees: [Tb_Employee]
  }
type Tb_Employee {
    emp_name: ID,
    emp_sal: Int,
    emp_company: String,
    emp_status: String,
  }
  type Mutation {
    update_employee(emp_name: ID!, emp_sal:Int, emp_company : String): Tb_Employee
    create_employee(emp_name: ID!, emp_sal:Int): Tb_Employee
  }
`;

// Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello Priya!',
//   },
// };

const resolvers = {
  Query: {
    tb_employee: resolver(tb_employee),
    tb_employees: resolver(tb_employee,{list: true})
  },
  Mutation: {
    // 2
    update_employee: (parent, args) => {
      return tb_employee.update({emp_sal:args.emp_sal, emp_company:args.emp_company
      }, {where : {emp_name:args.emp_name, emp_sal:args.emp_sal}}
            ).then(function(result){
              console.log(result)
            })
          },

    create_employee: (parent, args) => {
     return tb_employee.create({emp_name:args.emp_name,
        emp_sal:args.emp_sal }
        )}

  },


};

// const Mutation = {
//   update_employee:(root,args,context,info) => {
//     //const id = 
//     return db.tb_employee.create({emp_name:args.emp_name,
//     emp_sal:args.emp_sal})
//     //return db.tb_employee.get(id)
//   }
//}

//module.exports = {resolvers,Mutation}

const server = new ApolloServer({ typeDefs, resolvers
  //,
   //playground: process.env.NODE_ENV === "development"
  });

exports.graphqlHandler = server.createHandler();

// const app = new Koa();
// server.applyMiddleware({ app });

 
// app.listen({ port: 4000 }, () =>
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
// );