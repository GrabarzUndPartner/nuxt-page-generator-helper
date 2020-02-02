<template>
  <layout-two-column-container tag="header" class="page-header">
    <template v-slot:left>
      <nav class="navigation">
        <molecule-link-list
          v-bind="linkList"
          style-type="page-header"
        />
      </nav>
    </template>
    <template v-slot:right>
      <nav class="language-switch">
        <molecule-language-switch
          style-type="page-header"
        />
      </nav>
    </template>
  </layout-two-column-container>
</template>

<script>

import LayoutTwoColumnContainer from '../layouts/TwoColumnContainer'
import MoleculeLanguageSwitch from '../molecules/LanguageSwitch'
import MoleculeLinkList from '../molecules/LinkList'
export default {
  components: { LayoutTwoColumnContainer, MoleculeLanguageSwitch, MoleculeLinkList },
  props: {
    linkList: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="postcss">
.page-header {
  border-bottom: solid #ccc 1px;
}
</style>
