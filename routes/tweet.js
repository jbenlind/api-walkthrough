const express = require("express");
const { route } = require(".");
const router = express.Router();
const db = require("../db/models")
const { Tweet } = db
const {check, validationResult} = require("express-validator")

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    console.log(validationErrors)
    
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        return next(err);
    }
    next();

}
const validateTweet = [
    check("message")
        .exists({checkFalsy: true})
        .withMessage("The tweet can't be empty")
        .isLength({max: 280})
        .withMessage("The tweet can't be longer than 280 characters"), 
    handleValidationErrors
]
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next) 


router.get('/', asyncHandler(async (req, res) => {
    const tweets = await Tweet.findAll()

    res.json({message: "test tweets index", tweets});

}))

router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const tweet = await Tweet.findByPk(id)
   
    if (tweet) {
        res.json({ tweet })
    } else{
        function tweetNotFoundError(id) {
            let err = new Error()
            err.title = "Tweet not found"
            err.message = "The tweet of the given id not found"
            err.status = 404
            return err
        }

        next(tweetNotFoundError(id))
    }
}))

router.post('/', validateTweet, asyncHandler(async (req, res) => {
   const newTweet = await Tweet.create(req.body.message)
   res.json({newTweet})
}))



module.exports = router
