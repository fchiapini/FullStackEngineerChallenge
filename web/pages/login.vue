<template>
  <div class="login">
    <p class="login__title">Log in</p>
    <form class="login__form" @submit.prevent>
      <input
        v-model="email"
        type="email"
        placeholder="Email address"
        class="login__email"
        required
        @blur="$v.email.$touch()"
      />
      <div v-if="$v.email.$error" class="error__notification">
        <p v-if="!$v.email.email" class="errorMessage">
          Please enter a valid email.
        </p>
        <p v-if="!$v.email.required" class="errorMessage">
          Email is required.
        </p>
      </div>

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="login__password"
        required
        @blur="$v.password.$touch()"
      />

      <div v-if="$v.password.$error" class="error__notification">
        <p v-if="!$v.password.required" class="errorMessage">
          Password is required.
        </p>
      </div>
      <button
        :disabled="$v.$invalid"
        type="submit"
        class="btn login__btn-submit"
        @click="login"
      >
        Log in
      </button>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    email: null,
    password: null
  }),
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    async login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.$nuxt.$loading.start()
          await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            }
          })
          this.$nuxt.$loading.finish()
          if (this.$auth.user.is_admin) this.$router.push('/admin')
          else this.$router.push(`/employee/${this.$auth.user.id}`)
        } catch (e) {
          this.$nuxt.$loading.finish()
          alert(e.response.data.message)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.btn {
  border: none;
  padding: 1.5rem 1rem;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.05rem;
  border-radius: 5rem;
  margin: 2rem 0;
  width: 40rem;
  cursor: pointer;
}

.login {
  padding: 5rem;
  &__title {
    letter-spacing: 0.03rem;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      appearance: none;
      border: none;
      height: 4rem;
      width: 40rem;
      margin: 0.5rem 0;
      border: thin solid grey;
      padding: 0.6rem 1.2rem;

      &:focus {
        border: thin solid black;
      }
    }
  }

  &__btn-submit {
    background: grey;
    color: white;

    &:hover {
      background: lighten(lightgrey, 5%);
    }

    &:disabled {
      opacity: 0.65;
      cursor: not-allowed;
    }
  }
}
</style>
