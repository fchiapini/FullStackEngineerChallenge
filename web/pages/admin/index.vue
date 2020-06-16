<template>
  <div></div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped></style>
