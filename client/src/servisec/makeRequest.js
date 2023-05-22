import scaffolding from "../system/client";
const { api } = scaffolding;

export async function makeRequest(type, method, args = {}) {
  try {
    await scaffolding.load(type);
    if (scaffolding.socket.readyState !== 1 ) throw new Error('Server Error')
    const response = !args
      ? await api[type][method]()
      : await api[type][method](args);
    
    return response;
  } catch (error) {
    return { status: "rejected", reason: error.message };
  }
}

