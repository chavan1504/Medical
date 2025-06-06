const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const User = require('/models/User');

const router = express.Router();

// Get current user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// Get dashboard data based on role
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    let dashboardData = {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    };

    if (user.role === 'doctor') {
      dashboardData.doctorStats = {
        patients: 0, // You'll implement this
        appointments: 0,
        specialization: user.profile?.specialization || 'Not specified'
      };
    } else {
      dashboardData.patientStats = {
        appointments: 0, // You'll implement this
        doctors: 0,
        medicalHistory: user.profile?.medicalHistory || []
      };
    }

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router;