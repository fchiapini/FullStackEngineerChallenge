<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="employees"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Employees</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" text v-bind="attrs" v-on="on">
                + Employee
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="save">
                  <v-text-field
                    v-model="editedEmployee.name"
                    label="Name"
                    required
                    outlined
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="editedEmployee.position"
                    label="Position"
                    required
                    outlined
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="editedEmployee.email"
                    label="Email"
                    required
                    outlined
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="editedEmployee.password_hash"
                    label="Password"
                    required
                    outlined
                  >
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>

        <v-btn
          nuxt
          :to="'/admin/employee/' + item.id"
          color="blue darken-1"
          text
        >
          Reviews
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store, error }) {
    try {
      await store.dispatch('employees/fetchEmployees')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch employees at this time. Please try again.'
      })
    }
  },

  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'Position', value: 'position', sortable: true },
        { text: 'Email', value: 'email', sortable: true },
        { text: 'Password', value: 'password_hash', sortable: false },
        { text: 'Created At', value: 'createdAt', sortable: true },
        { text: 'Updated At', value: 'updatedAt', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedEmployee: {
        name: '',
        position: '',
        email: '',
        password_hash: ''
      }
    }
  },

  computed: {
    ...mapState({
      employees: (state) => state.employees.employees
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'Create Employee' : 'Edit Employee'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    buildNewEmployeeObject() {
      return {
        name: '',
        position: '',
        email: '',
        password_hash: ''
      }
    },

    editItem(item) {
      this.editedIndex = this.employees.indexOf(item)
      this.editedEmployee = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem(item) {
      const answer = confirm('Are you sure you want to delete this item?')
      if (answer) {
        try {
          await this.$store.dispatch('employees/deleteEmployee', item)
        } catch (e) {}
      }
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedEmployee = Object.assign({}, this.buildNewEmployeeObject())
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          await this.$store.dispatch(
            'employees/updateEmployee',
            this.editedEmployee
          )
        } catch (e) {}
      } else {
        try {
          await this.$store.dispatch(
            'employees/createEmployee',
            this.editedEmployee
          )
        } catch (e) {}
      }
      this.close()
    }
  }
}
</script>
