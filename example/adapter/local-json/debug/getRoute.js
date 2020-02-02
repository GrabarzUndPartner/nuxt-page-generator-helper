
import { getRoute } from '../index'

const consola = require('consola')

getRoute({
  locale: 'en',
  path: '/'
}).then((routes) => {
  consola.success(routes)
})
