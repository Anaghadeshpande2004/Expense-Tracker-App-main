import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import bcrypt from "bcrypt";
import User from "../models/UserSchema.js";

export const registerControllers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Validate if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        // Check if user already exists using email
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password before saving user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user in the database
        let newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Return response with success message
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    } catch (err) {
        // Handle any unexpected errors
        return res.status(500).json({
            success: false,
            message: "Server error: " + err.message,
        });
    }
};

export const loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        // console.log(email, password);
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await User.findOne({ email });
    
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const setAvatarController = async (req, res, next)=> {
    try{

        const userId = req.params.id;
       
        const imageData = req.body.image;
      
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: imageData,
        },
        { new: true });

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
          });


    }catch(err){
        next(err);
    }
}

export const allUsers = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}