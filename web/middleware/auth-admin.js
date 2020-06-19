export default function({ $auth, next }) {
  const user = $auth.$state.user

  if (!user || !user.is_admin) {
    next('/login')
  }
}
