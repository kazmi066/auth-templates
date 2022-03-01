import { isAdmin, isAuthenticated } from "./authorization.js";
import { combineResolvers } from "graphql-resolvers";

export default {
    Query: {
        // grab all users
        async getUsers(parent, args, { models }) {
            try {
                const users = await models.User.find();
                return users;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        
        me: async (parent, args, { models, me }) => {
            if (!me) {
              return null;
            }
            return await models.User.findById(me.id);
        },
    },
    Mutation: {
        // update user
        updateUser: combineResolvers( 
            isAuthenticated, 
            async (parent, { username, password }, { models, me }) => {
            try {
                return await models.User.findByIdAndUpdate(me.id, {
                    username,
                    password,
                })
            } catch (error) {
                throw new Error(error.message);
            }
        }),

        // delete user
        deleteUser: combineResolvers(
            isAdmin,
            async (parent, { id }, { models }) => {
              const user = await models.User.findById(id);
      
              if (user) {
                await user.remove();
                return {
                    message: "user deleted"
                };
              }
                return {
                    message: "user not found"
                };
            },
          )
        }
}