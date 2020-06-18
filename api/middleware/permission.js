export function permit(isAdmin) {
  return (req, res, next) => {
    console.log(req.user)
    if (!onlyAdmin || (req.user && req.user.isAdmin === isAdmin)) next()
    else response.status(403).json('Forbidden! Admin access required.')
  }
}
