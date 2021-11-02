const allowIfHasSecretKey = async (req, res, next) => {
  try {
    const app = res.locals.app;
    if (!app) {
      return res.status(401).json({
        message: "You need secret key to access this route"
      });
    }
    req.app = app;
    next();
  } catch (error) {
    next(error);
  }
}

export default allowIfHasSecretKey;