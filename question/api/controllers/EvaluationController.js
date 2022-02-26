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
};

