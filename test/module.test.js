const { generate, loadConfig, get, generatePort } = require('@nuxtjs/module-test-utils')

describe('module', () => {
  let nuxt

  beforeAll(async () => {
    const overrides = {
      target: null
    };

    ({ nuxt } = (await generate(loadConfig(__dirname, '../../example', overrides, { merge: true }))))
    await nuxt.listen(await generatePort(60000))
  }, 80000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    let html = await get('/')
    expect(html).toContain('Home')
    html = await get('/de')
    expect(html).toContain('Startseite')
    html = await get('/top-page/sub-page')
    expect(html).toContain('Sub-Page')
  })
})
