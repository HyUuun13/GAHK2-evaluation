<template>
  <div class="container">
    <!-- If you want to hide survey, comment the lines below -->
    <h2>SurveyJS Library - a sample survey below</h2>
    <survey :survey="survey"></survey>
  </div>
</template>
<script>
import * as SurveyVue from "survey-vue";
import "bootstrap/dist/css/bootstrap.css";
var Survey = SurveyVue.Survey;
Survey.cssType = "bootstrap";
import * as widgets from "surveyjs-widgets";
import { init as customWidget } from "../components/customwidget";
// widgets.icheck(SurveyVue);
widgets.select2(SurveyVue);
widgets.inputmask(SurveyVue);
widgets.jquerybarrating(SurveyVue);
widgets.jqueryuidatepicker(SurveyVue);
widgets.nouislider(SurveyVue);
widgets.select2tagbox(SurveyVue);
widgets.sortablejs(SurveyVue);
widgets.ckeditor(SurveyVue);
widgets.autocomplete(SurveyVue);
widgets.bootstrapslider(SurveyVue);
customWidget(SurveyVue);
SurveyVue.Serializer.addProperty("question", "tag:number");
export default {
  components: {
    Survey,
  },
  data() {
    var json = {
      // title: "Feedback page for user to write",
      // showProgressBar: "top",
      // pages: [
      //   {
      //     questions: [
      //       {
      //         name: "date",
      //         type: "datepicker",
      //         inputType: "date",
      //         title: "Your favorite date:",
      //         dateFormat: "mm/dd/yy",
      //         isRequired: true,
      //       },
      //       {
      //         type: "matrix",
      //         name: "Quality",
      //         title:
      //           "Please indicate if you agree or disagree with the following statements",
      //         columns: [
      //           {
      //             value: 1,
      //             text: "Strongly Disagree",
      //           },
      //           {
      //             value: 2,
      //             text: "Disagree",
      //           },
      //           {
      //             value: 3,
      //             text: "Neutral",
      //           },
      //           {
      //             value: 4,
      //             text: "Agree",
      //           },
      //           {
      //             value: 5,
      //             text: "Strongly Agree",
      //           },
      //         ],
      //         rows: [
      //           {
      //             value: "affordable",
      //             text: "Product is affordable",
      //           },
      //           {
      //             value: "does what it claims",
      //             text: "Product does what it claims",
      //           },
      //           {
      //             value: "better then others",
      //             text: "Product is better than other products on the market",
      //           },
      //           {
      //             value: "easy to use",
      //             text: "Product is easy to use",
      //           },
      //         ],
      //       },
      //       {
      //         type: "rating",
      //         name: "satisfaction",
      //         title: "How satisfied are you with the Product?",
      //         mininumRateDescription: "Not Satisfied",
      //         maximumRateDescription: "Completely satisfied",
      //       },
      //       {
      //         type: "rating",
      //         name: "recommend_friends",
      //         visibleIf: "{satisfaction} > 3",
      //         title:
      //           "How likely are you to recommend the Product to a friend or co-worker?",
      //         mininumRateDescription: "Will not recommend",
      //         maximumRateDescription: "I will recommend",
      //       },
      //       {
      //         type: "comment",
      //         name: "suggestions",
      //         title: "What would make you more satisfied with the Product?",
      //       },
      //     ],
      //   },
      // ],
    };
    var model = new SurveyVue.Model(json);
    model.onComplete.add(this.alertResults);
    return {
      survey: model,
    };
  },

 mounted() {
    fetch("http://localhost:1337/evaluation/read/" + "2")
      .then((res) => res.json())
      .then(
        (data) => {
            var model = new SurveyVue.Model(data);
            model.onComplete.add(this.alertResults);
            this.survey = model;
          }
      )
      .catch((err) => console.log(err.message));
  },

  methods: {
    async alertResults(sender) {
      alert(JSON.stringify(sender.data));
      var response = await fetch("http://localhost:1337/feedback/create", {
        method: "POST",
        body: JSON.stringify({ Evaluation: 1, data: sender.data }),
      });
      if (response.ok) {
        var surveys = await response.text();
        console.log(surveys);
        // `this` inside methods points to the Vue instance
      } else {
        alert(response.statusText);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
