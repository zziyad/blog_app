async () => {
  //   if (application.worker.id === 'W1') {
  console.log('Connecting to pg...');
  // console.log('lib', { this: this });
  //   }
  const options = {
    ...config.database,
    console,
    // model: application.schemas.model,
  };
  // console.log({ domain });

  const database = new metarhia.metasql.Database(options);
  //
  // lib.db.connection = database;
  //   application.emit('bootstrap-db');

  // console.log({ context, database });
  //   if (application.worker.id === 'W1') {
  const {
    rows: [{ now }],
  } = await database.query(`SELECT now()`);
  console.log(`Connected to pg at ${new Date(now).toLocaleTimeString()}`);
  //   }
  return database;
};
