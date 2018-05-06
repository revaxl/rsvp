const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const EventSchema = new Schema({
  name: {
    type: String,
    required: 'please supply some text',
    trim: true
  },
  description: {
    type: String,
    required: 'please supply some text',
    trim: true
  },
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'please supple a creator'
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Event', EventSchema);
