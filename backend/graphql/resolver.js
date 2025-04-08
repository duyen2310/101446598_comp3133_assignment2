const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const Employee = require('../models/Employee');
require('dotenv').config();

const generateToken = (user) => {
    return jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const resolvers = {
    Query: {
        //login
        login: async (_, { username, password }) => {
            //find user name if not throw error
            const user = await User.findOne({ $or: [{ username }] });
            if (!user) throw new AuthenticationError('Invalid username');

            //check pass
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new AuthenticationError('Invalid credentials');

            return generateToken(user);
        },

        getAllEmployees: async (_, __, { user }) => {
            //check auth
            if (!user) throw new AuthenticationError('Unauthorized');
            
            return await Employee.find();
        },

        searchEmployeeByEid: async (_, { eid }, { user }) => {
            //check auth
            if (!user) throw new AuthenticationError('Unauthorized');
            //find by id
            return await Employee.findById(eid);
        },

        searchEmployeeByField: async (_, { designation, department }, { user }) => {
            if (!user) throw new AuthenticationError('Unauthorized');
            const filter = {};

            //check designation or department
            if (designation) filter.designation = designation;
            if (department) filter.department = department;
            return await Employee.find(filter);
        }
    },

    Mutation: {
        signup: async (_, { username, email, password }) => {
            //hash pwd
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });

            //save user 
            await user.save();
            return generateToken(user);
        },

        addEmployee: async (_, { input }, { user }) => {
            if (!user) throw new AuthenticationError('Unauthorized');

            //create new emp
            const employee = new Employee(input);
            return await employee.save();
        },

        updateEmployee: async (_, { eid, input }, { user }) => {

            //update
            if (!user) throw new AuthenticationError('Unauthorized');
            return await Employee.findByIdAndUpdate(eid, input, { new: true });
        },

        deleteEmployee: async (_, { eid }, { user }) => {
            if (!user) throw new AuthenticationError('Unauthorized');
            //find and delete
            await Employee.findByIdAndDelete(eid);
            return 'Employee deleted';
        }
    }
};

module.exports = resolvers;
