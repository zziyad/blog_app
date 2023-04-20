// ({
//   NotFoundError: class NotFoundError extends domain.error.SystemError  {
//     constructor(message, context) {
//       // super(message, context);
//       this.name = 'NotFoundError';
//       this.code = 404;
//     }
//   },
// });

({
  NotFoundError: class NotFoundError extends Error {
    constructor(message, context) {
      super(message);
      this.name = 'NotFoundError';
      this.code = 404;
      this.context = context;
    }

    toJSON() {
      const { name, code, message, context, stack } = this;
      return { name, code, message, context, stack };
    }
  },
});
