const userModel = require('../models/user.model');

const becrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await becrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
       const { password: pwd, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({token: jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }) ,userWithoutPassword});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
        TK0000001832417
    }       
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await becrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                // Remove password safely

                const { password: pwd, ...userWithoutPassword } = user.toObject();

                res.cookie('token', token);

        res.status(200).json({ token , userWithoutPassword});
   
                // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
};

const profileUser = (req, res) => {
    try {
        res.send(req.user);
    }   
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};
    

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    profileUser
};  

