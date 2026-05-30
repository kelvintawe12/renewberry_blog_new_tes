const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: String,

    slug: String,

    role: String,

    bio: String,

    image: String,

    department: String,

    expertise: [String],

    achievements: [String],

    website: String,

    facebook: String,

    linkedin: String,

    twitter: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Team',
  teamSchema
);