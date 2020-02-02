import { getLayout } from '<%= options.adapterPath %>';

export default (ctx) => {
  ctx.$getVirtualContentLayout = () => {
    return getLayout(ctx.$getVirtualContentOptions());
  }
}
