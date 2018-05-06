var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/users');
var Event = require('../models/events');

router.get('/', function (req, res, next) {
    Event.find()
        .populate('user', 'name')
        .exec(function (err, events) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: err
                });
            }
            res.status(200).json(events);
        });
});

router.get('/:id', function(req, res) {
    Event.findById(req.params.id)
    .populate('user', 'name')
    .exec(function(err, event) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }
        if (!event) {
            return res.status(500).json({
                title: 'No Event Found!',
                message: 'Event not found'
            });
        }
        res.status(200).json(event);
    });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                message: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    
    var event = new Event({
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        user: decoded.user._id
    });
    event.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }
        console.log(result);
        //user.events.push(result);
        //user.save();
        res.status(201).json({
            title: 'Saved event',
            message: result
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }
        if (!event) {
            return res.status(500).json({
                title: 'No Event Found!',
                message: 'Event not found'
            });
        }
        if (event.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                message:  'Users do not match'
            });
        }
        event.content = req.body.content;
        event.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: err
                });
            }
            res.status(200).json({
                title: 'Updated event',
                message: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                message: err
            });
        }
        if (!event) {
            return res.status(500).json({
                title: 'No Event Found!',
                message: 'Event not found'
            });
        }
        if (event.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                message: 'Users do not match'
            });
        }
        event.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    message: err
                });
            }
            res.status(200).json({
                title: 'Deleted event',
                message: result
            });
        });
    });
});

router.get('/:id/join', async (req, res) => {
    var decoded = jwt.decode(req.query.token);
    try {
        const event = await Event.findById(req.params.id);
        const user = await User.findById(decoded.user._id);
        console.log(user);
        // check if the user already exist in the participants collection 
        if (event.participants.indexOf(user._id) > -1)
            return res.status(400).json({title: 'error occurred', message: "already joined"});
        else {
            await event.update({$addToSet: {participants: user._id}});
            return res.status(200).json({title: 'ok', message: 'successefuly joined'});
        }
        //return res.status(200).json({title: 'found', message: event});

    } catch (error) {
        return res.status(400).json({title: 'error occurred', message: error});
    }
});

module.exports = router;
