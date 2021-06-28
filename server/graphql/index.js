// mongoose
const mongoose = require('mongoose');

// apollo server
const { ApolloServer, gql } = require('apollo-server-express');

// graphql types
const { userTypes } = require('./types/userTypes');
const { postTypes } = require('./types/postTypes');

// grapql resolver
const { userQuery, userMutation } = require('./resolver/Gql_UserQuery');
const { postQuery, postMutation } = require('./resolver/Gql_PostQuery');
const { userFollowQuery, userFollowMutation } = require('./resolver/Gql_UserFollowQuery');

// graphql model
const postModel = require('./model/Gql_postModel');
const userModel = require('./model/Gql_UserMode');
const userFollowModel = require('./model/Gql_UserFollowModel');


exports.createApolloServer = () => {

    // graphql server

    const typeDefs = gql(`

        ${userTypes}
        ${postTypes}

        type Query {

            getUserInfo : userInfo
            getUserById(userid : ID) : userDataInfo 
            getUserPosts(userid : ID) : userPostList
            logout : Boolean

            getTagList : tagList

            getAllPost(startDate : String) : allPost
            getPostById(input : getPostInfo) :  postById
            getPostByUser(postid : ID) : postByUser

            getUserFollowFollowing(userid : ID) : getUserFollow

        }

        type Mutation {

            createPost(input : createPostInput) : post
            editPost(input : editPostInfo) : post
            addLikeToPost(input : likeToPost) : likeToPostResult
            addSaveToPost(input : saveToPost) : saveToPostResult

            deleteUserPosts(input : deletePost) : userPostList

            addUserFollow(input : userFollowInput) : getUserFollow
            removeUserFollow(input : userFollowInput) : getUserFollow

        }

    `);

    const resolvers = {
        Query: {
            ...userQuery,
            ...postQuery,
            ...userFollowQuery
        },
        Mutation: {
            ...postMutation,
            ...userMutation,
            ...userFollowMutation
        }
    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            model: {
                userModel: new userModel(mongoose.model('devBlogUser'), req),
                postModel: new postModel(mongoose.model('devBlogPost'), req),
                userFollowModel: new userFollowModel(mongoose.model('devBlogUserFollowInfo'), req)
            }
        }),
        playground: true
    })

    return apolloServer;

}
