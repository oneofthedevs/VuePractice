Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <div>
      <div class="product">
          <div class="product-image">
              <img :src="image" :alt="altText">
          </div>
          <div class="product-info">
              <h1>{{ product }}</h1>
              <h3>{{ description }}</h3>
              <h3 v-if="inStock > 0">In stock</h3>
              <h3 v-else :class="[inStock ? activeClass : 'strike-through']">Out of stock</h3>
              <h4>Shipping: {{ shipping }}</h4>
              <ul>
                  <li v-for="item in details">{{ item }}</li>
              </ul>
              <div class="colors">
                  <div class="color-box" :style="{backgroundColor: item.color}" v-for="(item, index) in variants"
                      :key="item.id" @mouseover="updateProduct(index)">
                  </div>
              </div>
              <div class="sizes">
                  <div class="size" v-for="size in sizes">{{ size }}</div>
              </div>
              <button v-on:click="addToCart" class="addBtn" :disabled="!inStock">Add to cart</button>
              <button @click="removeFromCart" class="addBtn" style="background-color: #f44336; border: 1px solid #f44336">Remove from cart</button>
          </div>
      </div>
      <div class="review-section">
        <product-review @review-submit="addReview"></product-review>
        <reviews v-bind:reviewList="reviewList"></reviews>
      </div>
    </div>
    `,
  data() {
    return {
      product: "Socks",
      description: "Some description it is, hehehe",
      selectedVariant: 0,
      altText: "Pair of socks",
      details: ["60% cotton", "40% polyester"],
      variants: [
        {
          id: 1234,
          color: "green",
          image: "./assets/vmSocks-green.jpg",
          quantity: 10,
        },
        {
          id: 5678,
          color: "blue",
          image: "./assets/vmSocks-blue.png",
          quantity: 0,
        },
      ],
      sizes: [7, 8, 9, 10, 11],
      cartCount: 0,
      reviewList: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct(i) {
      this.selectedVariant = i;
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    addReview(reviewItem) {
      this.reviewList.push(reviewItem);
      console.log(this.reviewList);
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "$2.99";
    },
  },
});

Vue.component("product-review", {
  template: `
    <form class="form" @submit.prevent="onSubmit" autocomplete="off">
      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" v-model="name" name="name"/>
      </div>
      <div class="form-item">
        <label for="review">Review</label>
        <textarea type="text" v-model="review" name="review"></textarea>
      </div>
      <div class="form-item">
        <label for="rating">Rating</label>
        <input type="radio" v-model.number="rating" name="rating" value="5"> 5
        <input type="radio" v-model.number="rating" name="rating" value="4"> 4
        <input type="radio" v-model.number="rating" name="rating" value="3"> 3
        <input type="radio" v-model.number="rating" name="rating" value="2"> 2
        <input type="radio" v-model.number="rating" name="rating" value="1"> 1
      </div>
      <div class="form-item">
        <input type="submit" class="submitBtn" value="Submit" />
      </div>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      let log = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      console.log(log);
      this.$emit("review-submit", log);
      this.name = null;
      this.review = null;
      this.rating = null;
    },
  },
});

Vue.component("reviews", {
  props: {
    reviewList: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div class="reviews" v-if="reviewList.length > 0">
      {{reviewList}}
      <div class="review" v-for"item in reviews">
        <h2>{{ item.name }} ⭐{{ item.rating }}</h2>
        <p>{{ item.review }}</p>
      </div>
    </div>
  `,
  updated: function () {
    this.reviews = this.reviewList;
  },
  data() {
    return {
      reviews: [],
    };
  },
});

const app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cartCount: [],
  },
  methods: {
    updateCart(id) {
      this.cartCount.push(id);
    },
    updateCartDec(id) {
      const pid = this.cartCount.indexOf(id);
      if (pid > -1) {
        this.cartCount.splice(pid, 1);
      }
    },
  },
});
