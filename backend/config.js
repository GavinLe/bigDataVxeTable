'use strict'

const path = require('path')

module.exports = {
  port: '3800',
  secret: 'secret',
  publicDir: path.resolve(__dirname, './public'),
  logPath: path.resolve(__dirname, './logs/koa-template.log'),
}
