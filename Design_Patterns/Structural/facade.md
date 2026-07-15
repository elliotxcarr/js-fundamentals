## Facade Pattern

The facade pattern provides a simplified interface to a complex subsystem. It hides the complexities of the subsystem and provides a simple interface to the client.

```js
const launchCraft = () => {
  const engineService = new EngineService();
  const doorService = new DoorService();
  const ventService = new VentService();

  engineService.ignite();
  doorService.sealDoors();
  ventService.startFans();
  engineService.beginThrust();
  console.log('take off');
}

// simple method call (facade)
launchCraft();
```


If your code contains bulky and repeated code, you can extract the repeated logic to a facade

```js
const getUsers = async () => {
  return await fetch('http://localhost:5000/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json())
}

const getProfiles = async (id) => {
  return await fetch(`http://localhost:5000/profiles?userId=${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json())
}
```

This can be simplified and even broken down further

```js
const getFetch = (endpoint, params) => {
  const url = `http://localhost:5000/${endpoint}`;
  const query = Object
    .entries(params)
    .map(a => `${a[0]}=${a[1]}`).join('&');
  const body = `${url}?${query}`;

  return fetch(body, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then(response => response.json());
}

// two simple calls which utilise the same core logic for different purposes.
const getProfiles = (id) => getFetch('profiles', { userId: id });
const getUsers = () => getFetch('users');
```

Here, the rest of code is now decoupled from the fetch API logic. If we needed to change the base URL, fetch body or even use AXIOS instead, we only need to change it in one place