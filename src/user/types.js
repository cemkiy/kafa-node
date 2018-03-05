// Mongoose schemas
const torrentModel = require('../torrent/models.js');


let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType
} = require('graphql');

// UserType for query
const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "This represent an user",
  fields: () => ({
    id: {type:new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});

// UserCreateInputType for mutation
const UserCreateInputType = new GraphQLInputObjectType({
  name: "UserCreateInputType",
  description: "This represent an user",
  fields: () => ({
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)}
  })
});

// UserUpdateInputType for mutation
const UserUpdateInputType = new GraphQLInputObjectType({
  name: "UserUpdateInputType",
  description: "This represent an user",
  fields: () => ({
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString},
    birthday: {type: GraphQLString}
  })
});

module.exports = {
  UserType,
  UserCreateInputType,
  UserUpdateInputType
}
