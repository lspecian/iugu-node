# Iugu para node.js [![Build Status](https://travis-ci.org/iugu/iugu-node.png?branch=master)](https://travis-ci.org/iugu/iugu-node)

## Instalação

`npm install iugu`

## Exemplo de Uso
```js
var iugu = require('iugu')('c73d49f9-6490-46ee-ba36-dcf69f6334fd'); // Ache sua chave API no Painel
// iugu.{ RESOURCE_NAME }.{ METHOD_NAME }
```
## Documentação

Acesse [iugu.com/documentacao](http://iugu.com/documentacao) para referência

## Configuração

 * `iugu.setApiKey('c73d49f9-6490-46ee-ba36-dcf69f6334fd');`
 * `iugu.setTimeout(20000); // in ms` (node's default: `120000ms`)

## Testes

## Autor

Originalmente por [Luis Specian](https://github.com/lspecian) (luis@specian.com.br).
