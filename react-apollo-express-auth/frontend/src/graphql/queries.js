import { gql } from "@apollo/client";

export const getUsers = gql `
    query getUsers{
        getUsers{
            id
            username
            email
            role
        }
    }
`

export const logout = gql `
    mutation logout{
        message
    }
`