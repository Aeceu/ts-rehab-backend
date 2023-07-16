const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    Todos: [{
      title: String,
      description: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }],
    uncomplete_task: [{
      title: String,
      description: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }],
    complete_task: [{
      title: String,
      description: String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    }]
  }, { timestamps: true });
  

module.exports = mongoose.models.users || mongoose.model('users', UserSchema);
