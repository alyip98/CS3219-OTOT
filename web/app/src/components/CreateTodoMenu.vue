<template>
  <div>
    <b-button v-b-toggle.collapse-1 variant="primary">New Todo</b-button>
    <b-collapse id="collapse-1" title="asd">
      <b-card class="card">

        <div class="card-title">
          <h3>Add new todo</h3>
        </div>
        <b-form-input v-model="title" placeholder="Title"></b-form-input>
        <b-form-textarea v-model="desc" placeholder="Description (optional)"></b-form-textarea>
        <b-button class="btn-success" v-on:click="addTodo">Add</b-button>

      </b-card>
    </b-collapse>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateTodoMenu",
  data() {
    return {
      title: "",
      desc: ""
    }
  },
  methods: {
    addTodo() {
      if (this.title === "") {
        this.$bvToast.toast(`Todo must have a title`, {
          title: 'Invalid title',
          autoHideDelay: 5000,
          variant: 'danger'
        })
        return;
      }
      var todoTitle = this.title;
      axios.post("api/todo", {
        title: this.title,
        desc: this.desc
      }).then(resp => {
        console.log(resp);
        this.$emit("createTodo");
        this.resetFields();
        this.$bvToast.toast(`Todo ${todoTitle} created`, {
          title: 'Todo created',
          autoHideDelay: 5000,
          variant: 'success'
        })
      }).catch(console.error)
    },
    resetFields() {
      this.title = ""
      this.desc =""
    }
  }
}
</script>

<style scoped>

</style>
