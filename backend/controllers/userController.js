import asyncHandler from 'express-async-handler'
import User from '../models/usermodel.js'
import generateToken from '../utils/generateToken.js'
// @desc    Auth user & get toker
// @route   POST /api/useres/login
// @acsess  public
const authUser = asyncHandler(async(req,res,) => {
    const { email, password} = req.body
    const user = await User.findOne({ email})

    if(user &&(await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})


// @desc    get user profile
// @route   GET /api/useres/profile
// @acsess  private
const getUserProfile = asyncHandler(async(req,res,) => {
    const user = User.findById(req.user._id)

    if(user){
        res.json({
         _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found')
    }
})
export { authUser, getUserProfile}