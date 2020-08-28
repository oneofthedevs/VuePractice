Vue.component("productDetails", {
  props: {
    datails: {
      type: Object,
      required: true,
    },
    template: `                
        <h3 v-if="inStock > 0">In stock</h3>
        <h3 v-else :class="[inStock ? activeClass : 'strike-through']">Out of stock</h3>
        <h4>Shipping: {{ shipping }}</h4>
        <ul>
            <li v-for="item in details">{{ item }}</li>
        </ul>`,
    computed: {
      inStock() {
        return this.details.variants[this.selectedVariant].quantity;
      },
      shipping() {
        if (this.details.premium) {
          return "Free";
        }
        return "$2.99";
      },
    },
  },
});

const details = new Vue({
  el: "#app",
});
