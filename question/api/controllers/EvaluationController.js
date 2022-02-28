/**
 * EvaluationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
      // action - create
      create: async function (req, res) {

        var evaluation = await Evaluation.create(req.body).fetch();

        return res.status(201).json({ id: evaluation.id });
    },

    json: async function (req, res) {
        var everyevaluations = await Evaluation.find();
        return res.json(everyevaluations);
    },

    populate: async function (req, res) {

        var evaluation = await Evaluation.findOne(req.params.id).populate("feedback");

        if (!evaluation) return res.notFound();

         return res.json(evaluation);
    },

    // action - read
    read: async function (req, res) {

        var thatEvaluation = await Evaluation.find({id: "1"}).populate("Feedback");

        if (!thatEvaluation) return res.notFound();

       return res.json([thatEvaluation]);
    },
};

