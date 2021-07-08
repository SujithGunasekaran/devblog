// mongoose
const mongoose = require('mongoose');

// apollo server
const { ApolloServer, gql } = require('apollo-server-express');

// graphql types
const { userTypes } = require('./types/userTypes');
const { postTypes } = require('./types/postTypes');
const { commentTypes } = require('./types/commentTypes');

// grapql resolver
const { userQuery, userMutation } = require('./resolver/Gql_UserQuery');
const { postQuery, postMutation } = require('./resolver/Gql_PostQuery');
const { userFollowQuery, userFollowMutation } = require('./resolver/Gql_UserFollowQuery');
const { commentQuery, commentMutation } = require('./resolver/Grl_CommentQuery');

// graphql model
const postModel = require('./model/Gql_postModel');
const userModel = require('./model/Gql_UserMode');
const userFollowModel = require('./model/Gql_UserFollowModel');
const commentModel = require('./model/Gql_CommentModel');

exports.createApolloServer = () => {

    // graphql server

    const typeDefs = gql(`

        ${userTypes}
        ${postTypes}
        ${commentTypes}

        type Query {

            getUserInfo : userInfo
            getUserById(userid : ID) : userDataInfo 
            getUserPosts(userid : ID) : userPostList
            logout : Boolean

            getTagList : tagList

            getAllPost(input : allPostInput) : allPost
            getPostById(input : getPostInfo) :  postById
            getPostByUser(postid : ID) : postByUser

            getUserFollowFollowing(userid : ID) : getUserFollow
            getLoggedUserFollowFollwingList : getUserFollow
            getUserFollowListInfo(userid : ID) : followListInfo
            getUserFollowingListInfo(userid : ID) : followingListInfo

            getCommentByPostId(postid : ID) : commentListInfo

        }

        type Mutation {

            createPost(input : createPostInput) : post
            editPost(input : editPostInfo) : post
            addLikeToPost(input : likeToPost) : likeToPostResult
            addSaveToPost(input : saveToPost) : saveToPostResult

            deleteUserPosts(input : deletePost) : userPostList

            addUserFollow(input : userFollowInput) : FollowFollowingResult
            removeUserFollow(input : userFollowInput) : FollowFollowingResult

            addComment(input : addCommentInput) : commentInfo

        }

    `);

    const resolvers = {
        Query: {
            ...userQuery,
            ...postQuery,
            ...userFollowQuery,
            ...commentQuery
        },
        Mutation: {
            ...postMutation,
            ...userMutation,
            ...userFollowMutation,
            ...commentMutation
        }
    }

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({
            model: {
                userModel: new userModel(mongoose.model('devBlogUser'), req),
                postModel: new postModel(mongoose.model('devBlogPost'), req),
                userFollowModel: new userFollowModel(mongoose.model('devBlogUserFollowInfo'), req),
                commentModel: new commentModel(mongoose.model('devBlogComment'), req)
            }
        }),
        playground: true
    })

    return apolloServer;

}
