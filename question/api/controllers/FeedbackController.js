/**
 * FeedbackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (req, res) {

        var feedback = await Feedback.create(req.body).fetch();

        return res.status(201).json({ id: feedback.id });
    },

    // // action - read
    // read: async function (req, res) {

    //     var thatFeedback = await Feedback.find({id: "1"}).populate("feedback");

    //     if (!thatFeedback) return res.notFound();

    //    return res.json([thatFeedback]);
    // },

    populate: async function (req, res) {

        var feedback = await Feedback.findOne(req.params.id).populate("evaluation");

        if (!feedback) return res.notFound();

         return res.json(feedback);
    },

};

