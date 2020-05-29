# Node Zabbix

<!-- [![Build Status]()](https://github.com/wiltonjunior/node-zabbix) -->

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
$ yarn start
```

### Tech

Dillinger uses a number of open source projects to work properly:

- [Node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Zabbix Promise] - query zabbix data

### Way of use

Post to port 6000 by sending the following parameters:

- zabbix: Object
  - Url: String
  - User: String
  - Password: String
- params: Object

  - Example: ["name"]

- service: String
  - Example: "host"

Example:

```sh
$ curl -X POST http://<API_IP>:<API_PORT>/ -H "Content-Type:application/json" \
  -d '{"zabbix":{"Url": "ZABBIX_URL","User": "USERNAME","Password": "PASSWORD"},"params":["NAME"],"service": "SERVICE"}'
```
