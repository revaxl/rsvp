var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/users');
var Event = require('../models/events');

router.get('/', function (req, res, next) {
    Event.find()
        .exec(function (err, events) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: events
            });
        });
});

/*router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});*/

router.post('/', function (req, res, next) {
   /* var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }*/
        var event = new Event({
            name: req.body.name,
            description: req.body.description,
            date: req.body.date
        });
  event.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            //user.events.push(result);
            //user.save();
            res.status(201).json({
                message: 'Saved event',
                obj: result
            });
        //});
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Event.findById(req.params.id, function (err, event) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!event) {
            return res.status(500).json({
                title: 'No Event Found!',
                error: {message: 'Event not found'}
            });
        }
        if (event.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        event.content = req.body.content;
        event.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated event',
                obj: result
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
                error: err
            });
        }
        if (!event) {
            return res.status(500).json({
                title: 'No Event Found!',
                error: {message: 'Event not found'}
            });
        }
        if (event.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        event.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted event',
                obj: result
            });
        });
    });
});

module.exports = router;
