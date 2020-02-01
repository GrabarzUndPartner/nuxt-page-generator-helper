
import { getRoutes } from '../index'

const consola = require('consola')

getRoutes().then((routes) => {
  consola.success(routes)
})
