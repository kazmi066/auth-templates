import { ForbiddenError } from "apollo-server-express";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) => {
    if(!me){
        throw new ForbiddenError('Not authenticated as User');
    }
    return skip;
}


export const isAdmin = (parent, args, { me }) => {
    if(!me || me.role !== 'admin'){
        throw new ForbiddenError('Not authorized as Admin');
    }
    return skip;
}