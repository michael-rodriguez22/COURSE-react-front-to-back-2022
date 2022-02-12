module.exports = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode
  const body = {}

  body.message = err.message
  if (process.env.NODE_ENV !== "production") body.stack = err.stack

  return res.status(status).json(body)
}
