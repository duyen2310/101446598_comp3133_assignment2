const { gql } = require('apollo-server-express');
//CREATE SCHEMA FOR EACH 
const typeDefs = gql`
    type User {
        username: String!
        email: String!
        created_at: String
    }

    type Employee {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
        created_at: String
    }

    type Query {
        login(username: String, email: String, password: String!): String
        getAllEmployees: [Employee]
        searchEmployeeByEid(eid: ID!): Employee
        searchEmployeeByField(designation: String, department: String): [Employee]
    }

    type Mutation {
        signup(username: String!, email: String!, password: String!): String
        addEmployee(input: EmployeeInput!): Employee
        updateEmployee(eid: ID!, input: EmployeeInput!): Employee
        deleteEmployee(eid: ID!): String
    }

    input EmployeeInput {
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: String!
        department: String!
        employee_photo: String
    }
`;

module.exports = typeDefs;
