
import { getLayout } from '../index'

const consola = require('consola')

getLayout().then((routes) => {
  consola.success(routes)
})
