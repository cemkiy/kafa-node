// Mongoose schemas
const torrentModel = require('../torrent/models.js');

// Graphql Types
const userTypes = require('../user/types.js');
const torrentTypes = require('../torrent/types.js');

let {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType
} = require('graphql');


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
          user: {
            type: new GraphQLNonNull(userTypes.UserType),
            resolve: function(kafa) {
              return  userModel.findById(kafa.user_id);
            }
          },
          kafa_count:{type: new GraphQLNonNull(GraphQLInt)}
        })
    })

const KafaType = new GraphQLInputObjectType({
        name: 'KafaType',
        description: "This represent a kafa",
        fields: () => ({
          torrent_id: { type: new GraphQLNonNull(GraphQLString)},
          user_id: { type: new GraphQLNonNull(GraphQLString)},
          kafa_count:{type: new GraphQLNonNull(GraphQLInt)}
        })
    })

module.exports = {
  KafaType,
  UserType,
  UserInputType
}
