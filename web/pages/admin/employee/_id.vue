<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="reviews"
      no-data-text="No reviews!"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Reviews for: {{ employee.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon nuxt :to="'/admin'">
            <v-icon>mdi-home</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" text v-bind="attrs" v-on="on">
                + Assign reviewer
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="save">
                  <v-select
                    v-model="editedReview.reviewer_id"
                    :items="employees"
                    item-text="name"
                    item-value="id"
                    outlined
                    label="Reviewer"
                  ></v-select>
                  <v-textarea
                    v-model="editedReview.feedback"
                    label="Feedback"
                    hint="Write here your feedback"
                    outlined
                  >
                  </v-textarea>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{ item.createdAt | date }}
      </template>
      <template v-slot:item.updatedAt="{ item }">
        {{ item.updatedAt | date }}
      </template>
      <template v-slot:item.is_reviewed="{ item }">
        {{ item.is_reviewed ? 'Yes' : 'No' }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth'],

  async fetch({ store, error, params }) {
    try {
      await store.dispatch('employees/fetchEmployee', params.id)
      await store.dispatch('employees/fetchEmployees')
      await store.dispatch('reviews/fetchReviewsAsReviewee', params.id)
    } catch (e) {
      error({
        statusCode: 503,
        message: `Unable to fetch employee # ${params.id}.`
      })
    }
  },

  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'Reviewer',
          align: 'start',
          sortable: true,
          value: 'reviewer.name'
        },
        { text: 'Position', value: 'reviewer.position', sortable: true },
        { text: 'Feedback', value: 'feedback', sortable: true },
        { text: 'Created At', value: 'createdAt', sortable: true },
        { text: 'Updated At', value: 'updatedAt', sortable: true },
        { text: 'Feedback submitted', value: 'is_reviewed', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      editedIndex: -1,
      editedReview: {
        feedback: '',
        reviewer_id: -1,
        reviewee_id: -1
      }
    }
  },

  computed: {
    ...mapState({
      employee: (state) => state.employees.employee
    }),
    ...mapState({
      employees: (state) => state.employees.employees
    }),
    ...mapState({
      reviews: (state) => state.reviews.reviewsAsReviewee
    }),
    formTitle() {
      return this.editedIndex === -1 ? 'Assign Reviewer' : 'Edit Review'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  methods: {
    buildNewReviewObject() {
      return {
        feedback: '',
        reviewer_id: '',
        reviewee_id: ''
      }
    },

    editItem(item) {
      this.editedIndex = this.reviews.indexOf(item)
      this.editedReview = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedReview = Object.assign({}, this.buildNewReviewObject())
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          await this.$store.dispatch(
            'reviews/updateReviewAsReviewee',
            this.editedReview
          )
        } catch (e) {}
      } else {
        try {
          this.editedReview.reviewee_id = this.employee.id
          await this.$store.dispatch('reviews/createReview', this.editedReview)
        } catch (e) {}
      }
      this.close()
    },

    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
