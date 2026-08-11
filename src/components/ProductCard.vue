<template>
  <div class="product-card" :class="{ 'product-card--sold-out': product.soldOut }">
    <div class="product-card__image-wrapper" @click="openModal">
      <img
        :src="product.images[0]"
        :alt="product.title"
        class="product-card__image"
      />
    </div>
    <div class="product-card__divider"></div>
    <h2 class="product-card__title" @click="openModal">
      {{ product.title }}
    </h2>
    <div class="product-card__price-row">
      <div class="product-card__prices">
        <span
          v-if="product.oldPrice && !product.soldOut"
          class="product-card__old-price"
        >
          {{ formatPrice(product.oldPrice) }} $
        </span>
        <span
          v-if="!product.soldOut"
          class="product-card__price"
        >
          {{ formatPrice(product.price) }} $
        </span>
        <span v-else class="product-card__sold-out">
          Продана на аукционе
        </span>
      </div>
      <button
        v-if="!product.soldOut"
        class="product-card__buy-btn"
        :class="buttonClass"
        :disabled="isProcessing"
        @click="handleBuyClick"
      >
        <span v-if="isDefault" class="product-card__btn-text">Купить</span>
        <span v-else-if="isProcessing" class="product-card__btn-content">
          <span class="product-card__spinner"></span>
        </span>
        <span v-else-if="isInCart" class="product-card__btn-content">
          <img :src="checkIcon" alt="" class="product-card__check-icon" />
          <span>В корзине</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Product, ButtonState } from '@/types';
import checkIcon from '@/assets/icon-check.svg';

export default Vue.extend({
  name: 'ProductCard',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    cartItems: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },
  data() {
    return {
      checkIcon,
      processingIds: [] as number[],
    };
  },
  computed: {
    buttonState(): ButtonState {
      if (this.processingIds.includes(this.product.id)) return 'processing';
      if (this.cartItems.includes(this.product.id)) return 'in-cart';
      return 'default';
    },
    isDefault(): boolean {
      return this.buttonState === 'default';
    },
    isProcessing(): boolean {
      return this.buttonState === 'processing';
    },
    isInCart(): boolean {
      return this.buttonState === 'in-cart';
    },
    buttonClass(): Record<string, boolean> {
      return {
        'product-card__buy-btn--processing': this.isProcessing,
        'product-card__buy-btn--in-cart': this.isInCart,
      };
    },
  },
  methods: {
    formatPrice(price: number): string {
      return price.toLocaleString('ru-RU');
    },
    handleBuyClick(): void {
      if (this.isProcessing) return;

      if (this.isInCart) {
        this.$emit('remove-from-cart', this.product.id);
        return;
      }

      this.processingIds.push(this.product.id);

      setTimeout(() => {
        const idx = this.processingIds.indexOf(this.product.id);
        if (idx > -1) {
          this.processingIds.splice(idx, 1);
        }
        this.$emit('add-to-cart', this.product.id);
      }, 2000);
    },
    openModal(): void {
      this.$emit('open-modal', this.product);
    },
  },
});
</script>

<style scoped>
.product-card {
  width: 280px;
  background: #ffffff;
  border: 1px solid #e1e1e1;
  position: relative;
  transition: opacity 0.2s;
}

.product-card--sold-out {
  opacity: 0.5;
}

.product-card__image-wrapper {
  width: 280px;
  height: 160px;
  overflow: hidden;
  cursor: pointer;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-card__divider {
  width: 100%;
  height: 1px;
  background: #e7e7e7;
}

.product-card__title {
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  color: #343030;
  margin: 20px 24px 0;
  min-height: 54px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.product-card__title:hover {
  opacity: 0.7;
}

.product-card__price-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 22px 24px 0;
  padding-bottom: 24px;
}

.product-card__prices {
  display: flex;
  flex-direction: column;
}

.product-card__old-price {
  font-family: 'Merriweather', serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.5;
  color: #a0a0a0;
  text-decoration: line-through;
}

.product-card__price {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: #343030;
}

.product-card__sold-out {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  color: #343030;
  min-height: 48px;
  align-content: center;
}

.product-card__buy-btn {
  width: 118px;
  height: 48px;
  background: #382e2b;
  border: none;
  color: #f4f6f9;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-card__buy-btn:hover {
  background: #776763;
}

.product-card__buy-btn:active {
  background: #5b3a32;
}

.product-card__buy-btn--processing {
  background: #c1b4b1;
  cursor: wait;
}

.product-card__buy-btn--in-cart {
  background: #5b3a32;
  cursor: pointer;
  width: 118px;
}

.product-card__buy-btn--in-cart:hover {
  background: #8b6b62;
}

.product-card__buy-btn:disabled {
  opacity: 1;
}

.product-card__btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-card__check-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.product-card__spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(244, 246, 249, 0.3);
  border-top-color: #f4f6f9;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .product-card {
    width: 100%;
    max-width: 280px;
  }

  .product-card__image-wrapper {
    width: 100%;
    height: 0;
    padding-bottom: 57.14%;
    position: relative;
  }

  .product-card__image {
    position: absolute;
    top: 0;
    left: 0;
  }

  .product-card__title {
    font-size: 16px;
    margin: 16px 16px 0;
  }

  .product-card__price-row {
    margin: 12px 16px 0;
    padding-bottom: 20px;
  }
}

@media (max-width: 360px) {
  .product-card {
    max-width: 100%;
  }

  .product-card__title {
    font-size: 15px;
    margin: 12px 12px 0;
    min-height: auto;
  }

  .product-card__price-row {
    margin: 10px 12px 0;
    padding-bottom: 16px;
  }

  .product-card__buy-btn {
    width: 100px;
    height: 42px;
    font-size: 13px;
  }

  .product-card__buy-btn--in-cart {
    width: 118px;
  }

  .product-card__price {
    font-size: 15px;
  }

  .product-card__old-price {
    font-size: 13px;
  }
}
</style>
