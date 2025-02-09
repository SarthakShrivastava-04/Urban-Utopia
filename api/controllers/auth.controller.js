import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
   
   const {username, email, password, avatar} = req.body;
      
   try{
    
        //HASHING
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //new user creation
        const newUser = await prisma.user.create({
            data:{
                email,
                username, 
                password: hashedPassword,
                avatar,
            },
            })
            console.log(newUser);
          res.status(201).json({message: "User created successfully!"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Failed to create user!"})
    }
   
}


export const login = async (req,res) => {
    const {username, password} = req.body;

   try{
    //check if username exists
        const user = await prisma.user.findUnique({
            where: {username}
        });

        if(!user) return res.status(401).json({message: "Invalid credentials!"});
        
    //check the password is correct
        const isPasswordCorrect = await bcrypt.compare(password , user.password);

        if(!isPasswordCorrect) return res.status(401).json({message: "Invalid credentials!"});

    //generate cookie token and send to the user
       
        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
        const age = 1000 * 60 * 60 * 24 * 10;   //10 days

        const token = jwt.sign(
            {
             id: user.id,
             isAdmin: true,
            },
            process.env.JWT_SECRET_KEY,
            {
             expiresIn: age,
            },
        );

        const {password: userPassword, ...userInfo} = user;

        res
           .cookie("token", token,{
            httpOnly: true,
            secure: true,             //use for https in production otherwise cookie wont be generated
            maxAge: age,
           })
           .status(200)
           .json(userInfo);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to login!"});
    }
}


export const logout = (req,res) => {
    res.clearCookie("token").status(200).json({message: "Logged out successfully!"});
}