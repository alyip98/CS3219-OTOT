<template>
  <div class="container">
    <h1>Dashboard</h1>
    <CreateTodoMenu @createTodo="loadData"></CreateTodoMenu>
    <Todo v-for="(item, index) in todos.filter(todo => !todo.is_done)" v-bind:key="item.id" v-bind=item
          v-bind:index=index
          @removeTodo="onRemoveChild">
    </Todo>

  </div>

</template>

<script>
import axios from "axios";
import Todo from './Todo'
import CreateTodoMenu from "@/components/CreateTodoMenu";

export default {
  name: 'Dashboard',
  props: {},
  components: {
    CreateTodoMenu,
    Todo
  },
  data() {
    return {
      todos: [],
      completedTodos: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios.get("api/todo").then(
        resp => {
          console.log(resp);
          this.todos = resp.data.data;
        }
      ).catch(console.error)
    },
    dumpData() {
      console.log(this.todos)
    },
    onRemoveChild(index) {
      console.log(index)
      this.todos[index].is_done = true;
      var todo = this.todos.splice(index, 1)[0];
      this.completedTodos.push(todo);
      this.deleteTodo(todo).then(() => {
        delete this.completedTodos.indexOf(todo);
      })
    },
    deleteTodo(todo) {
      var todoTitle = todo.title;
      console.log("deleting", todo._id)
      return axios.delete(`api/todo/${todo._id}`).catch(console.error)
        .then(resp => {
          console.log(resp);
          this.$bvToast.toast(`Todo ${todoTitle} deleted`, {
            title: 'Todo created',
            autoHideDelay: 5000,
            variant: 'warning'
          })
        })
    }
  }
}
;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
