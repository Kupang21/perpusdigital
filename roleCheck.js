function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).send('Akses ditolak: hanya untuk admin');
}

function isMember(req, res, next) {
  if (req.session.user && req.session.user.role === 'member') {
    return next();
  }
  return res.status(403).send('Akses ditolak: hanya untuk member');
}

module.exports = { isAdmin, isMember };
