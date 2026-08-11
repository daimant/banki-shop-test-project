<template>
  <div class="app">
    <AppHeader
      :search-query.sync="searchQuery"
      @search="onSearch"
    />
    <main class="main">
      <h1 class="main__title">Картины эпохи Возрождения</h1>
      <div class="main__grid" v-if="filteredProducts.length > 0">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          :cart-items="cartItems"
          @add-to-cart="addToCart"
          @remove-from-cart="removeFromCart"
          @open-modal="openModal"
        />
      </div>
      <div v-else class="main__empty">
        <p>Ничего не найдено</p>
      </div>
    </main>
    <AppFooter />
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      :visible="modalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ProductCard from '@/components/ProductCard.vue';
import ProductModal from '@/components/ProductModal.vue';
import { products as productList } from '@/data/products';
import { Product } from '@/types';

const CART_STORAGE_KEY = 'banki-shop-cart';

export default Vue.extend({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    ProductCard,
    ProductModal,
  },
  data() {
    return {
      products: productList,
      searchQuery: '',
      cartItems: [] as number[],
      modalVisible: false,
      selectedProduct: null as Product | null,
    };
  },
  computed: {
    filteredProducts(): Product[] {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) return this.products;
      return this.products.filter((p) =>
        p.title.toLowerCase().includes(query)
      );
    },
  },
  created() {
    this.loadCart();
  },
  methods: {
    addToCart(productId: number): void {
      if (!this.cartItems.includes(productId)) {
        this.cartItems.push(productId);
        this.saveCart();
      }
    },
    removeFromCart(productId: number): void {
      const idx = this.cartItems.indexOf(productId);
      if (idx > -1) {
        this.cartItems.splice(idx, 1);
        this.saveCart();
      }
    },
    onSearch(query: string): void {
      this.searchQuery = query;
    },
    openModal(product: Product): void {
      this.selectedProduct = product;
      this.modalVisible = true;
    },
    closeModal(): void {
      this.modalVisible = false;
    },
    loadCart(): void {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          this.cartItems = JSON.parse(stored);
        }
      } catch {
        this.cartItems = [];
      }
    },
    saveCart(): void {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cartItems));
      } catch {
        // localStorage not available
      }
    },
  },
});
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Merriweather', serif;
  background: #f6f3f3;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 0 352px 75px;
}

.main__title {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 1.5;
  color: #343030;
  margin-top: 45px;
  margin-bottom: 39px;
}

.main__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: flex-start;
}

.main__empty {
  text-align: center;
  padding: 80px 20px;
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 16px;
  color: #9f9f9f;
}

@media (max-width: 1440px) {
  .main {
    padding: 0 120px 60px;
  }
}

@media (max-width: 1024px) {
  .main {
    padding: 0 60px 50px;
  }

  .main__title {
    font-size: 22px;
    margin-top: 35px;
    margin-bottom: 30px;
  }

  .main__grid {
    justify-content: center;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .main {
    padding: 0 32px 40px;
  }

  .main__title {
    font-size: 20px;
    margin-top: 28px;
    margin-bottom: 24px;
    text-align: center;
  }

  .main__grid {
    gap: 20px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 0 16px 32px;
  }

  .main__title {
    font-size: 18px;
    margin-top: 24px;
    margin-bottom: 20px;
  }

  .main__grid {
    gap: 16px;
  }
}

@media (max-width: 360px) {
  .main {
    padding: 0 12px 24px;
  }

  .main__title {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 16px;
  }

  .main__grid {
    gap: 12px;
  }
}
</style>
