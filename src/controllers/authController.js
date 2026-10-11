const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const uploadToCloudinary = require('../utils/uploadToCloudinary');

// SIGN UP
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Name, email and password are required'
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Signup error:', error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );

    res.json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error('Login error:', error);

    res.status(500).json({
      error: 'Server error'
    });
  }
};

// UPLOAD PROFILE AVATAR
const uploadAvatar = async (req, res) => {
  try {
    // Check whether the request contains an image.
    if (!req.file) {
      return res.status(400).json({
        error: 'Please select an avatar image'
      });
    }

    // Upload the image to Cloudinary.
    const uploadedImage = await uploadToCloudinary(
      req.file.buffer,
      'media-enhanced-api/avatars'
    );

    // Save the Cloudinary image URL to the user's MongoDB record.
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        avatar: uploadedImage.secure_url
      },
      {
        new: true,
        runValidators: true
      }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    res.json({
      message: 'Profile avatar uploaded successfully',
      user
    });
  } catch (error) {
    console.error('Avatar upload error:', error);

    res.status(500).json({
      error: 'Failed to upload profile avatar'
    });
  }
};

module.exports = {
  signup,
  login,
  uploadAvatar
};