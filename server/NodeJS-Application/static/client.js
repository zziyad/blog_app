import { Scaffold } from './scaffold.js';

const scaffolding = new Scaffold(`ws://localhost:8001`);
const { api } = scaffolding;
// window.api = api;

(async () => {
  await scaffolding.load('auth');
  console.log({ scaffolding });
  // // const { status, token } = await api.auth.restore({ token: 'marcus' })
  // const { status, token, msg } = await api.auth.register({
  //   username: 'marcus',
  //   email: 'marcus',
  //   password: 'marcus',
  // });
  // console.log('f', { status, token, msg });
  const data = await api.auth.signin({
    username: 'marcus',
    password: 'marcus',
  });
  console.dir({ data });
})();
