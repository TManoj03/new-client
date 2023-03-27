import { db } from '../connect.js'
import bcrypt from 'bcryptjs'
import  Jwt  from 'jsonwebtoken';

export const register = (req,res)=>{

    //check user if exists

    const q = 'SELECT * FROM users WHERE userName = ?';

db.query(q,[req.body.userName], (err,data)=>{
    if(err) return res.status(500).json(err);
    if(data.length) return res.status(409).json("user already exist");

    //create a new user
        //hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        const q = "INSERT INTO users (`userName`,`email`,`password`,`name`) VALUES (?)"

        const values = [
            req.body.userName,
            req.body.email,
            hashedPassword,
            req.body.name,
        ];

        db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("user has been created");

        });
    }) ;
};

export const login = (req,res)=>{

    const q = "SELECT * FROM users WHERE userName = ?";
    db.query(q,[req.body.userName],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("user Not Found");

        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password);
        
        if(!checkPassword) return res.status(400).json("wrong password or userName")
  
        const token = Jwt.sign({id:data[0].id},"secretkey");

        const { password, ...others }= data[0];

        res.cookie("accessToken",token,{
            httpOnly: true,
        })
        .status(200)
        .json(others);
    });
 
};

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite: 'none'
    })
    .status(200)
    .json("user has been logged out");
};