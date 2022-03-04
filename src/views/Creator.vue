<template>
  <div class="container">
    <form @submit.prevent="createSurvey">
      <label>Survey Title: </label>
      <input v-model="json.title" />
      <br /><br /><br />
      <div v-for="(page, i) in json.pages" :key="i">
        <div v-for="(question, j) in page.questions" :key="j">
          <!-- control -->
          <label>Page {{ i + 1 }}, Question {{ j + 1 }}</label
          ><br />
          <select v-model="question.type" disabled="true">
              <!-- matrix -->
              <!-- date -->
            <option value="datepicker">Date</option>
            <option value="matrix">Matrix</option>
            <option value="comment">Comment</option>
            <option value="rating">Rating</option>
          </select>
          <!-- survey data -->
          <div v-if="question.type == 'comment'">
            <label>Name:</label>
            <input v-model="question.name" /><br />
            <label>Title:</label>
            <input v-model="question.title" />
          </div>
          <div v-if="question.type == 'rating'">
            <label>Name:</label>
            <input v-model="question.name" /><br /> 
            <label>Title:</label>
            <input v-model="question.title" />
            <label>mininumRateDescription:</label>
            <input v-model="question.mininumRateDescription" />
            <label>maximumRateDescription:</label>
            <input v-model="question.maximumRateDescription" />
          </div>
          <div v-if="question.type == 'datepicker'">
            <label>Name:</label>
            <input v-model="question.name" /><br />
            <label>Title:</label>
            <input v-model="question.title" />
          </div>
          <div v-if="question.type == 'matrix'">
            <label>Name:</label>
            <input v-model="question.name" /><br />
            <label>Title:</label>
            <input v-model="question.title" />
          </div>
          <br /><br />
        </div>
      </div>
      <button type="submit"> Submit </button>
    </form>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.css";
export default {
  data() {
    var json = {
      title: "Evaluation Testing page",
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
              name: "recommend friends",
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
    };
    // var model = new SurveyVue.Model(json);
    // model.onComplete.add(this.alertResults);
    // return {
    //   survey: model,
    // };
    return {
      json,
    };
  },
  methods: {
    async createSurvey() {
      const results = JSON.stringify(this.json);
      alert(results);
      var response = await fetch("http://localhost:1337/evaluation/create", {
        method: "POST",
        body: JSON.stringify({ data: this.json }),
      });
      if (response.ok) {
        var surveys = await response.text();
        console.log(surveys);
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
