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

console.log(torrentTypes);


const KafaType = new GraphQLObjectType({
        name: 'KafaType',
        description: "This represent a kafa",
        fields: () => ({
          torrent: {
            type: new GraphQLNonNull(torrentTypes.KafaType),
            resolve: function(kafa) {
              return  torrentModel.findById(kafa.torrent_id);
            }
          },
          kafa_count:{type: new GraphQLNonNull(GraphQLInt)}
        })
    })

// UserType for query
const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "This represent an user",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)},
    kafas: { type: new GraphQLList(KafaType)},
    created_at: {type: new GraphQLNonNull(GraphQLString)},
    updated_at: {type: new GraphQLNonNull(GraphQLString)},
    deleted_at: {type: new GraphQLNonNull(GraphQLString)}
  })
});

// UserInputType for mutation
const UserInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  description: "This represent an user",
  fields: () => ({
    username: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
    birthday: {type: new GraphQLNonNull(GraphQLString)}
  })
});

module.exports = {
  KafaType,
  UserType,
  UserInputType
}
