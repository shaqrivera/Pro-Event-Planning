const router = require("express").Router();
const { User, Events, Weather, Photo } = require("../models");
const withAuth = require("../utils/auth.js");

// Todo: GET route to show all events on homepage
router.get("/", async (req, res) => {
  try {
    const eventData = await Events.findAll({
      include: {
        model: User,
        attributes: ["id"],
      },
    });

    const events = eventData.map((Events) => Events.get({ plain: true }));
    res.render("homepage", {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const eventData = await Events.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["id", "name"],
      },
    });

    const events = eventData.get({ plain: true });
      let eventDate = new Date(events.event_date);
      const month = eventDate.toLocaleString('default', { month: 'long' });
      let formattedDate = `${month} ${eventDate.getDate()}, ${eventDate.getFullYear()} ${eventDate.toLocaleTimeString()}`;
      console.log(formattedDate);
    res.render("event", {
      events,
      formattedDate,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

// Todo: GET route to redirect for login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

