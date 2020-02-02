<script>
import PageDevExtend from '@/extends/PageDev'
export default {
  extends: PageDevExtend,
  nuxtI18n: {
    paths: {
      en: '/:nested/:page',
      de: '/:nested/:page'
    }
  }
}
</script>
