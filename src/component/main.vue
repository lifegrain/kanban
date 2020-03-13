<template>
  <div class="d-flex p-2">
    <div class="col-3">
      <div class="rounded category">
        <h6 class="title">Backlog</h6>
        <div class="d-flex flex-column contain">
          <card
            v-for="backlog in backlog"
            :key="backlog.id"
            :data="backlog"
            @delete="deleteTasks"
            @edit="showEditModal"
          ></card>
        </div>
        <div class="addCard" @click="showAddModal(`Backlog`)">add a card...</div>
      </div>
    </div>
    <div class="col-3">
      <div class="rounded category">
        <h6 class="title">Todo</h6>
        <div class="d-flex flex-column contain">
          <card
            v-for="todo in todo"
            :key="todo.id"
            :data="todo"
            @delete="deleteTasks"
            @edit="showEditModal"
          ></card>
        </div>
        <div class="addCard" @click="showAddModal(`Todo`)">add a card...</div>
      </div>
    </div>
    <div class="col-3">
      <div class="rounded category">
        <h6 class="title">Done</h6>
        <div class="d-flex flex-column contain">
          <card
            v-for="done in done"
            :key="done.id"
            :data="done"
            @delete="deleteTasks"
            @edit="showEditModal"
          ></card>
        </div>
        <div class="addCard" @click="showAddModal(`Done`)">add a card...</div>
      </div>
    </div>
    <div class="col-3">
      <div class="rounded category">
        <h6 class="title">Completed</h6>
        <div class="d-flex flex-column contain">
          <card
            v-for="completed in completed"
            :key="completed.id"
            :data="completed"
            @delete="deleteTasks"
            @edit="showEditModal"
          ></card>
        </div>
        <div class="addCard" @click="showAddModal(`Completed`)">add a card...</div>
      </div>
    </div>
    <!-- add Form -->
    <b-modal ref="addModal" id="addModal" hide-footer centered title="Add a Card">
      <b-form @submit.prevent="addTasks">
        <b-form-group id="title-add-label" label="Card Title:" label-for="title-add-input">
          <b-form-input
            id="title-add-input"
            v-model="addForm.title"
            type="text"
            required
            placeholder="Enter Card title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="category-add-label" label="Category:" label-for="category-add-input">
          <b-form-select
            id="category-add-input"
            v-model="addForm.category"
            :options="categories"
            required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="hideAddModal">Add Task</b-button>
      </b-form>
    </b-modal>
    <!-- edit Form -->
    <b-modal ref="editModal" id="editModal" hide-footer centered title="Edit a Card">
      <b-form @submit.prevent="editTasks">
        <b-form-group id="title-edit-label" label="Card Title:" label-for="title-edit-input">
          <b-form-input
            id="title-edit-input"
            v-model="editForm.title"
            type="text"
            required
            placeholder="Enter Card title"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="category-edit-label" label="Food:" label-for="category-edit-input">
          <b-form-select
            id="category-edit-input"
            v-model="editForm.category"
            :options="categories"
            required
          ></b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="hideEditModal">Edit Task</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import card from "./card";
import axios from "axios";

const server = `https://kanban-h8-1584088116232.web.app`;

export default {
  props: [`view`],
  components: {
    card
  },
  data() {
    return {
      tasks: [],
      addForm: {
        title: "",
        category: null
      },
      editForm: {
        id: null,
        title: "",
        category: null
      },
      categories: [
        { text: "Select One", value: null },
        "Backlog",
        "Todo",
        "Done",
        "Completed"
      ]
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    showAddModal(category) {
      this.addForm.category = category;
      this.$refs["addModal"].show();
    },
    showEditModal(data) {
      this.editForm.id = data.id;
      this.editForm.category = data.category;
      this.editForm.title = data.title;

      console.log(this.editForm);
      this.$refs["editModal"].show();
    },
    hideAddModal() {
      if (this.addForm.title && this.addForm.category) {
        this.$refs["addModal"].hide();
      }
    },
    hideEditModal() {
      if (this.editForm.title && this.editForm.category) {
        this.$refs["editModal"].hide();
      }
    },
    getTasks() {
      axios({
        url: `${server}/tasks`,
        method: `get`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.tasks = data;
        })
        .catch(err => {
          this.checkError(err);
        });
    },
    addTasks() {
      axios({
        url: `${server}/tasks`,
        method: `post`,
        data: {
          title: this.addForm.title,
          category: this.addForm.category
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          this.addForm.title = ``;
          this.addForm.category = null;
          this.getTasks();
        })
        .catch(err => {
          this.checkError(err);
        });
    },
    editTasks() {
      axios({
        url: `${server}/tasks/${this.editForm.id}`,
        method: `put`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.editForm.title,
          category: this.editForm.category
        }
      })
        .then(data => {
          this.getTasks();
        })
        .catch(err => {
          checkError(err);
        });
    },
    deleteTasks(id) {
      axios({
        url: `${server}/tasks/${id}`,
        method: `delete`,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          this.getTasks();
        })
        .catch(err => {
          this.checkError(err);
        });
    },
    checkError(err) {
      if (err.response.status === 401) {
        localStorage.removeItem(`token`);
        this.$emit(`page`, `login`);
      } else {
        this.$emit(`error`, err);
      }
    }
  },
  computed: {
    backlog() {
      return this.tasks.filter(tasks => tasks.category === `Backlog`);
    },
    todo() {
      return this.tasks.filter(tasks => tasks.category === `Todo`);
    },
    done() {
      return this.tasks.filter(tasks => tasks.category === `Done`);
    },
    completed() {
      return this.tasks.filter(tasks => tasks.category === `Completed`);
    }
  }
};
</script>