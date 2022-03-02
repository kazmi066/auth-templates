import { gql } from "@apollo/client";

export const GET_USERS = gql `
    query getUsers{
        getUsers{
            id
            username
            email
            role
        }
    }
`

export const LOGOUT = gql `
    query logout{
        message
    }
`