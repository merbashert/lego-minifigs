const express = require('express');
const Lego = require('../models/legos.js')
const router = express.Router();


router.get('/', (req, res) => {
    Lego.find({}, (error, legos) => {
        res.render(
            'index.ejs',
            {
                legos:legos
            }
        );
    });
});

router.get('/new', (req, res) => {
    res.render('new.ejs');
});


//Search graveyard
// router.get('/results/:name', (req, res) => {
//     Lego.find({}, (err, foundLego) => {
//         res.render(
//             'results.ejs',
//             {
//                 legos: foundLego
//             }
//         );
//     });
// });

// router.get('/results/:name', (req, res) => {
//     console.log(req.params);
// });

router.get('/:id', (req, res) => {
    Lego.findById(req.params.id, (err, foundLego) => {
        res.render(
            'show.ejs', {
                lego: foundLego
            }
        );
    });
});


router.put('/:id', (req, res) => {
    Lego.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedLego) => {
        res.redirect('/legos')
    })
})

router.get('/:id/edit', (req, res) => {
    Lego.findById(req.params.id, (err, foundLego) => {
        res.render(
            'edit.ejs',
            {
                lego:foundLego
            }
        );
    })
})

router.post('/', (req, res) => {
    if(req.body.happyguy === "on") {
        req.body.img = "/images/new/happy_guy.jpg"
    } if(req.body.happygirl === "on") {
        req.body.img = "/images/new/happy_girl.jpg"
    }if(req.body.angryguy === "on") {
        req.body.img = "/images/new/angry_guy.jpg"
    }if(req.body.angrygirl === "on") {
        req.body.img = "/images/new/angry_girl.jpg"
    }if(req.body.scaredguy === "on") {
        req.body.img = "/images/new/scared_guy.jpg"
    }if(req.body.scaredgirl === "on") {
        req.body.img = "/images/new/scared_girl.jpg"
    }
    req.body.series = "Future Lego Series"
    req.body.year = 2019
    Lego.create(req.body, (error, createdLego) => {
        res.redirect('/legos')
    })
})

router.delete('/:id', (req, res) => {
    Lego.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/legos')
    })
})

module.exports = router;
