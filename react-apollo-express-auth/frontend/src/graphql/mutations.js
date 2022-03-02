import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        signUp(username: $username, email: $email, password: $password) {
            message
        }
    }
`

export const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
        }
    }
`