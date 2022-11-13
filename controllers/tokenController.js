const jwt = require('jsonwebtoken')

exports.createToken = async (req, res, user_id) => {
  try {
    const token = jwt.sign({
      user_id: user_id
    }, process.env.SECRET_KEY, {
      expiresIn: '1h'
    });

    res.cookie('user', token);
    res.status(201).json({ result: 'ok', token });
    return res;
  } catch (err) {
    console.error(err);
  }
};
exports.verifyToken = (header) => {
  try {
    const token = header.split('Bearer ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
 
    if (decoded) {
      return decoded.user_id;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
};