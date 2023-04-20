({
  access: 'public',
  method: async (file) => {
    domain.data.container.connection = context
    console.log(await domain.data.test());
    return { status: 'ok' };
  },
})
