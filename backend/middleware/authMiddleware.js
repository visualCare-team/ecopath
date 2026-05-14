import jwt from "jsonwebtoken"

export const authMiddleware=async(req,res,next)=>{
    try {
      const authHeaders=req.headers.authorization
      if(!authHeaders) return res.status(401).json({message:'no auth headers provided'})
        const token=authHeaders.split(' ')[1]

      if(!token) return res.status(400).json({message:'no token provided'})

        const decoded= jwt.verify(token,process.env.JWT_SECRET)

        req.userId=decoded.userId
        next()
    } catch (error) {
      if(error.name === 'TokenExpiredError'){
    return res.status(401).json({ message: 'Token expired, please login again' })
  }
      res.status(401).json({message:'Invalid token'})
    }
}