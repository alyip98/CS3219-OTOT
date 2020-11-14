<template>
  <b-card :title=title>
    <b-button-close v-on:click="remove"></b-button-close>

    <b-card-body>
      {{ desc }}

    </b-card-body>
    <b-card-sub-title>Created: {{ createdDate }}</b-card-sub-title>
  </b-card>
</template>

<script>
import moment from 'moment';
export default {
  name: "Todo",
  props: {
    title: {
      required: true,
      type: String
    },
    desc: {
      required: true,
      type: String
    },
    create_date: {
      required: true,
      type: String
    },
    is_done: {
      required: true,
      type: Boolean
    },
    index: Number
  },
  methods: {
    remove() {
      this.$emit("removeTodo", this.index)
    }
  },
  computed: {
    createdDate() {
      return moment(this.create_date).format("h:MM a, DD MMM YY")
    }
  }
}
</script>

<style scoped>

</style>
