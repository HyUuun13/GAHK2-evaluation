/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  await Evaluation.create({
    title: "Feedback page for user to write",
    showProgressBar: "top",
    pages: [
      {
        questions: [
          {
            name: "date",
            type: "datepicker",
            inputType: "date",
            title: "Your favorite date:",
            dateFormat: "mm/dd/yy",
            isRequired: true,
          },
          {
            type: "matrix",
            name: "Quality",
            title:
              "Please indicate if you agree or disagree with the following statements",
            columns: [
              {
                value: 1,
                text: "Strongly Disagree",
              },
              {
                value: 2,
                text: "Disagree",
              },
              {
                value: 3,
                text: "Neutral",
              },
              {
                value: 4,
                text: "Agree",
              },
              {
                value: 5,
                text: "Strongly Agree",
              },
            ],
            rows: [
              {
                value: "affordable",
                text: "Product is affordable",
              },
              {
                value: "does what it claims",
                text: "Product does what it claims",
              },
              {
                value: "better then others",
                text: "Product is better than other products on the market",
              },
              {
                value: "easy to use",
                text: "Product is easy to use",
              },
            ],
          },
          {
            type: "rating",
            name: "satisfaction",
            title: "How satisfied are you with the Product?",
            mininumRateDescription: "Not Satisfied",
            maximumRateDescription: "Completely satisfied",
          },
          {
            type: "rating",
            name: "recommend_friends",
            visibleIf: "{satisfaction} > 3",
            title:
              "How likely are you to recommend the Product to a friend or co-worker?",
            mininumRateDescription: "Will not recommend",
            maximumRateDescription: "I will recommend",
          },
          {
            type: "comment",
            name: "suggestions",
            title: "What would make you more satisfied with the Product?",
          },
        ],
      },
    ],
  })

};
