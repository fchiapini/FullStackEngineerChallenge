<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="reviews"
      no-data-text="No reviews to submit yet!"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            >Hello {{ employee.name }}, your pending reviews:
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline"
                  >Give a feedback to
                  {{
                    editedReview.reviewee_id > 0
                      ? editedReview.reviewee.name
                      : ''
                  }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-form @submit.prevent="save">
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
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="blue darken-1" @click="editItem(item)">
          Give a feedback
          <v-icon small class="mr-2">
            mdi-send
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store, error, params }) {
    try {
      await store.dispatch('employees/fetchEmployee', params.id)
      await store.dispatch('reviews/fetchReviewsAsReviewer', params.id)
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
          text: 'Reviewee',
          align: 'start',
          sortable: true,
          value: 'reviewee.name'
        },
        { text: 'Position', value: 'reviewee.position', sortable: true },
        { text: 'Feedback', value: 'feedback', sortable: true },
        { text: 'Created At', value: 'createdAt', sortable: true },
        { text: 'Updated At', value: 'updatedAt', sortable: true },
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
      reviews: (state) => state.reviews.reviewsAsReviewer
    })
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
            'reviews/updateReviewAsReviewer',
            this.editedReview
          )
        } catch (e) {}
      }
      this.close()
    }
  }
}
</script>
