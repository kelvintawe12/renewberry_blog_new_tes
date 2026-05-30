const express = require('express');

const router = express.Router();

const {
  getTeamMembers,
  createTeamMember,
} = require('../controllers/teamController');

router.get('/', getTeamMembers);

router.post('/', createTeamMember);

module.exports = router;