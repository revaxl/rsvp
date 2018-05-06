const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  name: {
    type: String,
    required: 'please supply some text',
    trim: true
  },
  email: {
    type: String,
    required: 'please supply some text',
    trim: true
  },
  password: {
    type: String,
    required: 'please supply some text',
    trim: true
  },
  DateJoined: {
    type: Date,
    default: Date.now
  },
  events: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
});

module.exports = mongoose.model('User', UserSchema);
