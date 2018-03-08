

module.exports.securityPointForCreateSource = function(request, types_of_permits) {
  if(types_of_permits.indexOf(request.user.role) == -1)
    throw new Error("You are making an unauthorized request. If you think it's a mistake, you can contact us.");
}

module.exports.securityPointForChangeSource = function(request, source_id, types_of_permits) {
  if(types_of_permits.indexOf("source_owner") > -1){
    if (request.user.id !== source_id)
      throw new Error("You are making an unauthorized request. If you think it's a mistake, you can contact us.");
  } else if(types_of_permits.indexOf(request.user.role) == -1){
    throw new Error("You are making an unauthorized request. If you think it's a mistake, you can contact us.");
  }
}
