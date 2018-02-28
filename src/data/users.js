const Users = [{
  id: 'asd',
  username: 'kafa-admin',
  email: 'asd@gmail.com',
  password:'asdsad'
}];

const User = module.exports = mongoose.model('User', UserSchema);
