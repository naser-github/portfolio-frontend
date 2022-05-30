export default function (context) {
  context.store.dispatch('auth/initAuth', context.req).then((res) => {
    if (res) {
      context.next()
    } else {
      context.redirect('/')
    }
  })
}
