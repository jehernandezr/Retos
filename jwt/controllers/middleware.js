const jwt = require( 'jsonwebtoken' );
const User = require("../models/UserModel");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.SECRET
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    httpOnly: true,
  };
 
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};


const signup = async (req, res, next) => {
  
  let us={
    username: req.body.username,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role:req.body.role };
    try{
      new User(us).validateSync();
      
      const newUser = await User.create(us);
      createSendToken(newUser, 201, res);
    }
  
    catch(err){
      if(err.errors){
        let newErr= { password : err.errors["password"]?err.errors["password"].message: "",
        passwordConfirm: err.errors["passwordConfirm"]? err.errors["passwordConfirm"].message: "",}
        err=new Error()
        err.message=`Must follow the next requirements to signUp as an user: ${JSON.stringify(newErr)}`
      }
      if (err.code==11000)
      {
        err=new Error()
        err.message="username already exists."
      }
        err.status=412
        return next(err);
    }
};

const login =async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password){
    err=new Error()
    err.message="Must provide username and password!"
    err.status=400
    return next(err);
  }

  const user = await User.findOne({ username }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))){

    err=new Error()
    err.message="Incorrect username or password"
    err.status=401
    return next(err);
  }

  createSendToken(user, 200, res);
};

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};


const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      err=new Error()
      err.message="You do not have permission to perform this action."
      err.status=403
    return next(err);
    }
    next();
  };
};

const protect =async (req, res, next) => {
  let token;
  let err;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;
  if (!token){
    err=new Error();
    err.message="You are not logged in! Please log in to get access"
    err.status=401
    return next(err);
  }
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser){
    err= new Error()
    err.message="The user belonging to this token does not longer exist."
    err.status=400
    return next(err);
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

module.exports = {
  signup:signup,
  login:login,
  logout:logout,
  restrictTo:restrictTo,
  protect:protect
}