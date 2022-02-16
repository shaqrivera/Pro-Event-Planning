const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const photoRoutes = require('./photoRoutes');
const {weatherRouter} = require('./weatherroute');
const rsvpRoutes = require('./rsvpRoutes');
const guestRoutes = require('./guestRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/photos', photoRoutes);
router.use('/rsvp', rsvpRoutes);
router.use('/weather', weatherRouter);
router.use('/guests', guestRoutes);

module.exports = router;