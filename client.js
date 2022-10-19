import { JSONRPCClient } from "json-rpc-2.0";

const client = new JSONRPCClient(async (request) => {
  try {
    const response = await fetch("http://0.0.0.0:3009", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    client.receive(data);
  } catch (err) {
    return Promise.reject(new Error(err));
  }
});

client
  .request("sayHello", { name: "Mike" })
  .then((result) => console.log(result));

client.request("sum", { a: 5, b: 3 }).then((result) => console.log(result));

client.notify("log", { message: "Notification" }); // notify makes no difference for request data
