const { getUser } = require("../helper/auth");

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}


async function checkGuest(req, res, next) {
  const userUid = req.cookies?.uid;
  req.user = getUser(userUid);
  if(!req.user) return next()
  return res.redirect('auth/user')

}

module.exports = {
  checkGuest,
  checkAuth,
};

