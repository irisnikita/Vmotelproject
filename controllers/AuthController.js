const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);
const User = require('../model/user.model');
const bcrypt = require('bcrypt');

// AppConfig
const appConfig = require('../constant')
let tokenList = {};


const accessTokenLife = appConfig.ACCESS_TOKEN_LIFE;

const accessTokenSecret = appConfig.ACCESS_TOKEN_SECERET;

// Thời gian sống của refreshToken
const refreshTokenLife = appConfig.REFRESH_TOKEN_LIFE;

const refreshTokenSecret = appConfig.REFRESH_TOKEN_SECERET;

/**
 * controller sign
 * @param {*} req 
 * @param {*} res 
 */
  let register = (req, res) => {
    try {
      let newUser = new User(req.body);

      newUser.pass = bcrypt.hashSync(req.body.pass, 10);

      newUser.save((err, user) => {
        if(err) {
          return res.status(400).send({
            message: err
          })
        } else {
          user.pass = undefined;
          return res.json(user);
        }
      })

    } catch (error) {
      throw error
    }
  }



/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
let login = async (req, res) => {
    try {
      // Validate user
      User.findOne({
        email: req.body.email
      },async (err, user) => {
        if (err) throw err;

        if(!user){
          res.send({message: 'Lỗi đăng ký! Không tồn tại tài khoản'})
        }
        else if (user) {
          if(!user.comparePassword(req.body.pass)) {
            res.send({message: 'Lỗi đăng ký! Mật khẩu sai'})
          } else {
            const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
            
            const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        

            tokenList[refreshToken] = {accessToken, refreshToken};

            const cpUser = user;
            
            delete cpUser.pass;

            return res.status(200).json({
              data: {accessToken, refreshToken, user: {
                _id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                created: user.created
              }}
            });
                }
              }
        })

    } catch (error) {
      return res.status(500).json(error);
    }
  }
  
  /**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body
    const refreshTokenFromClient = req.body.refreshToken;
    // debug("tokenList: ", tokenList);
    
    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
      try {
        // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded 
        const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
        // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
        // có thể mở comment dòng debug bên dưới để xem là rõ nhé.
        // debug("decoded: ", decoded);
        const userFakeData = decoded.data;
        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
        // gửi token mới về cho người dùng
        return res.status(200).json({accessToken});
      } catch (error) {
        // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
        debug(error);
        res.status(403).json({
          message: 'Invalid refresh token.',
        });
      }
    } else {
      // Không tìm thấy token trong request
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  };

  module.exports = {
    register,
    login: login,
    refreshToken: refreshToken,
  }