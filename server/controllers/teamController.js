const Team = require('../models/teamModel');

exports.getTeamMembers =
  async (req, res) => {
    const members = await Team.find();

    res.json(members);
  };

exports.createTeamMember =
  async (req, res) => {
    const member =
      await Team.create(req.body);

    res.json(member);
  };