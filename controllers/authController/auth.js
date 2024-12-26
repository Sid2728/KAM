const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../../models/userSchema/users');

const authController = {
    register: async(req,res,next)=>{
        try {
            const { name, email, password, role } = req.body;
            const user = new User({ name, email, password, role });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
          } catch (err) {
            next(err);
          }
    },
    login: async(req,res,next)=>{
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });
        
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ token });
          } catch (err) {
            next(err);
          }
    }
}

module.exports = authController;