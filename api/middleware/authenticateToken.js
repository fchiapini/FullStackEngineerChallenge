import jwt from 'jsonwebtoken'

/**
 * Check if authorization header with token is being sent in the request and
 * validate based on TOKEN SECRET configured in the .env
 *
 */

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
