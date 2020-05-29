# Node Zabbix

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/wiltonjunior/node-zabbix)

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
$ yarn start
```

### Tech

Dillinger uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Zabbix Promise] - query zabbix data

### Way of use

Post to port 6000 by sending the following parameters:

* zabbix: Object
    * Url: String
    * User: String
    * Password: String
    
* params: Object
    * Exemplo: ["name"]

* service: String
    * Exemplo: "host"






