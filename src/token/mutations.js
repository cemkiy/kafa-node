

const jwt = require('jsonwebtoken');
const config = require('../config');

// Mongoose schemas
const userModel = require('../user/models.js');
const roleModel = require('../role/models.js');

// Graphql Types
const tokenTypes = require('./types.js');
const userTypes = require('../user/types.js');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema
} = require('graphql');

// mutation {
//    createUser(input: {
//     email: "graphql@test.com"
//    }) {
//     id,
//     email
//   }
// }

// This is the Root Mutation
const TokenMutationRootType = module.exports = new GraphQLObjectType({
	name: 'TokenMutationAppSchema',
	description: "Token Schema Mutation Root",
	fields: () => ({
		createToken: {
			type: new GraphQLNonNull(tokenTypes.TokenType),
			args: {
				input: {
					type: new GraphQLNonNull(tokenTypes.TokenCreateInputType),
				},
			},
			resolve: function (parent, {
				input
			}, context) {
				input_password = input.password;
				delete input.password;
				return userModel.getOne(input)
					.then((user) => {
						if (userModel.comparePassword(input_password, user.password)) {
							const token = jwt.sign({
								user
							}, config.SECRET_KEY, {
								expiresIn: 604800 // 1 week
							});
							tokenObj = tokenTypes.TokenType;
							tokenObj = {
								token: token,
								user_id: user.id
							}
							return tokenObj;
						} else {
							throw new Error("Wrong Password");
						}
					})
					.catch((err) => {
						throw err;
					})
			}
		},
		createUser: {
			type: new GraphQLNonNull(userTypes.UserType),
			args: {
				input: {
					type: new GraphQLNonNull(userTypes.UserCreateInputType),
				},
			},
			resolve: function (parent, {
				input
			}, context) {
				return userModel.new(input)
					.then(function (user) {
						mailgun.sendMail(user.email, "Account Verification",
						"Please confirm your email with click below button.",
						"Confirm Your Email", "http://api.kafa.io/activation/" + user.email_activation_key);
						return user;
					})
					.catch((err) => {
						throw err;
					})
			}
		},
		verifiedUser: {
			type: GraphQLString,
			args: {
				verification_key :{type: new GraphQLNonNull(GraphQLString)}
			},
			resolve: function (parent, args, context) {
				return userModel.findOneAndUpdate({email_verification_key:verification_key}, {
						"$set": {verified:true}
					}).exec()
					.then((user) => {
						roleModel.new({
							user_id: user.id
						});
						return user
					})
					.catch((err) => {
						throw err;
					})
			}
		}
	})
});
