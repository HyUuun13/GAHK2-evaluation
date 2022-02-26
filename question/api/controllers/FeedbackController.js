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

};

