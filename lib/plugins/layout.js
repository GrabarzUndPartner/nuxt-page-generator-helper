import { getLayout } from '<%= options.adapterPath %>';

export default (ctx) => {
  ctx.$getGeneratorLayoutData = () => {
    return getLayout(ctx.$getGeneratorOptions());
  }
}
