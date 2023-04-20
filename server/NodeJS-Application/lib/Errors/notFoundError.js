({
    NotFoundError: class NotFoundError  {
      constructor(message, context) {
        // super(message, context);
        this.name = 'NotFoundError';
        this.code = 404;
      }
    },
  });
  