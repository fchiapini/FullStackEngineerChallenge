/**
 * Verify if user is admin to limit the access to API's
 * routes/routes.js
 *
 */

export function permit(isAdmin) {
  return (req, res, next) => {
    if (!isAdmin || (req.user && req.user.isAdmin === isAdmin)) next()
    else res.status(403).json('Forbidden! Admin access required.')
  }
}
