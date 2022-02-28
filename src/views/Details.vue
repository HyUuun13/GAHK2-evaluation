<template>
  <div class="container">
    <h2>Here shows the details of the feedback</h2>
    <o-table
      :data="isEmpty ? [] : data"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
    >
      <o-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </o-table-column>
      <!-- <o-table-column field="date" label="favourite date" v-slot="props">
        {{ props.row.date }}
      </o-table-column> -->
     <o-table-column field="Quality" label="Quality" v-slot="props">
        {{ props.row.Quality }}
      </o-table-column>
      <o-table-column field="satisfaction" label="satisfaction" v-slot="props">
        {{ props.row.satisfaction }}
      </o-table-column>
      <o-table-column field="suggestions" label="suggestions" v-slot="props">
        {{ props.row.suggestions }}
      </o-table-column>
    </o-table>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
export default {
  data() {
    return {
      data: [],
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
    };
  },
  mounted() {
    fetch("http://localhost:1337/evaluation/read/" + this.$route.params.id)
      .then((res) => res.json())
      .then((data) => (this.data = data))
      .catch((err) => console.log(err.message));
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
