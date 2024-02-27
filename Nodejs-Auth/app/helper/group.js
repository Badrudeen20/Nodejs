const express = require('express')
module.exports  = ((callback) => {
    const router = express.Router();
    callback(router);
    return router;
});
/* const express = require('express')
const group = (callback) => {
      const router = express.Router();
      callback(router);
      return router;
};
module.exports = { group } */