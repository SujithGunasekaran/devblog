// mongoose
const mongoose = require('mongoose');

// apollo server
const { ApolloServer, gql } = require('apollo-server-express');

// graphql types
const { userTypes } = require('./types/userTypes');
const { postTypes } = require('./types/postTypes');

// grapql resolver
const { userQuery } = require('./resolver/Gql_UserQuery');
const { postQuery, postMutation } = require('./resolver/Gql_PostQuery');

// graphql model
const postModel = require('./model/Gql_postModel');
const userModel = require('./model/Gql_UserMode');


exports.createApolloServer = () => {

    // graphql server

    const typeDefs = gql(`

        ${userTypes}
        ${postTypes}

        type Query {

            getUserInfo : userInfo
            logout : Boolean

            getTagList : tagList

            getAllPost : allPost
            getPostById(input : getPostInfo) :  postById

        }

        type Mutation {

            createPost(input : createPostInput) : post
            addLikeToPost(input : likeToPost) : likeToPostResult
            addSaveToPost(input : saveToPost) : saveToPostResult

        }

    `);

    const resolvers = {
        Query: {
            ...userQuery,
            ...postQuery
        },
        Mutation: {
            ...postMutation
        }
    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            model: {
                userModel: new userModel(mongoose.model('devBlogUser'), req),
                postModel: new postModel(mongoose.model('devBlogPost'), req)
            }
        }),
        playground: true
    })

    return apolloServer;

}
