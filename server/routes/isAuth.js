function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    return res.json('unauthorized');
  }
}

module.exports = isAuthenticated;
