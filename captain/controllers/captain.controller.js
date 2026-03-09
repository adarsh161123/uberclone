const captainModel = require('../models/captain.model');

const becrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerCaptain = async (req, res) => {
    try {
        const { name, email, password } = req.body; 
        
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }
        const hashedPassword = await becrypt.hash(password, 10);
        const newCaptain = new captainModel({
            name,
            email,
            password: hashedPassword
        });
        await newCaptain.save();
       const { password: pwd, ...captainWithoutPassword } = newCaptain.toObject();

        res.status(201).json({token: jwt.sign({ userId: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' }) ,captainWithoutPassword});
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }       
};

const loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email });
        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await becrypt.compare(password, captain.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: captain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                // Remove password safely

                const { password: pwd, ...captainWithoutPassword } = captain.toObject();

                res.cookie('token', token);

        res.status(200).json({ token , captainWithoutPassword});
   
                // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logoutCaptain = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Captain logged out successfully' });
};

const profileCaptain = (req, res) => {
    try {
        res.send(req.captain);
    }   
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }   
};

const toggleAvailability = async (req, res) => {
    try {
        const captain = await captainModel.findById(req.captain._id);    
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.status(200).json({ message: 'Availability updated', isAvailable: captain.isAvailable });
    }   
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
    

module.exports = {
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    profileCaptain,
    toggleAvailability
};  

