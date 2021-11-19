<script>
export default {
  name: 'DynamicComp',
  functional: true,
  props: {
    customItem: {
      type: Object,
      default: () => ({})
    }
  },
  render(_, { props, children, parent, data }) {
    const h = parent.$createElement

    const { customItem } = props

    return h(customItem.component, data, children)
  }
}
</script>
