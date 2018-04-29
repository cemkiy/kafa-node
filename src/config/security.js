module.exports.securityPointForCreateSource = function (request, typesOfPermits) {
  if (typesOfPermits.indexOf(request.user.role) === -1) {
    throw new Error("You are making an unauthorized request. If you think it's a mistake, you can contact us.")
  }
}

module.exports.securityPointForChangeSource = function (request, sourceId, typesOfPermits) {
  if (typesOfPermits.indexOf(request.user.role) === -1) {
    throw new Error("You are making an unauthorized request. If you think it's a mistake, you can contact us.")
  }
  let query = {
    id: sourceId
  }
  if (typesOfPermits.indexOf('source_owner') > -1) {
    query['user_id'] = request.user.id // This query returns only user sources
  }
  return query
}
