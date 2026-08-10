<template>
  <transition name="modal-fade">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal">
        <button class="modal__close" @click="close">&times;</button>
        <div class="modal__body">
          <div class="modal__slider">
            <button
              v-if="product.images.length > 1"
              class="modal__slider-btn modal__slider-btn--prev"
              @click="prevSlide"
            >
              &#8249;
            </button>
            <div class="modal__slider-track">
              <img
                v-for="(img, idx) in product.images"
                :key="idx"
                :src="img"
                :alt="product.title"
                class="modal__slider-image"
                :class="{ 'modal__slider-image--active': idx === currentSlide }"
              />
            </div>
            <button
              v-if="product.images.length > 1"
              class="modal__slider-btn modal__slider-btn--next"
              @click="nextSlide"
            >
              &#8250;
            </button>
            <div v-if="product.images.length > 1" class="modal__dots">
              <span
                v-for="(_, idx) in product.images"
                :key="idx"
                class="modal__dot"
                :class="{ 'modal__dot--active': idx === currentSlide }"
                @click="currentSlide = idx"
              ></span>
            </div>
          </div>
          <div class="modal__info">
            <h2 class="modal__title">{{ product.title }}</h2>
            <p class="modal__description">{{ product.description }}</p>
            <p class="modal__price">
              {{ formatPrice(product.price) }} $
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { Product } from '@/types';

export default Vue.extend({
  name: 'ProductModal',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  watch: {
    visible(val: boolean) {
      if (val) {
        this.currentSlide = 0;
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
  },
  beforeDestroy() {
    document.body.style.overflow = '';
  },
  methods: {
    close(): void {
      this.$emit('close');
    },
    prevSlide(): void {
      this.currentSlide =
        (this.currentSlide - 1 + this.product.images.length) %
        this.product.images.length;
    },
    nextSlide(): void {
      this.currentSlide =
        (this.currentSlide + 1) % this.product.images.length;
    },
    formatPrice(price: number): string {
      return price.toLocaleString('ru-RU');
    },
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal {
  background: #ffffff;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid #e1e1e1;
}

.modal__close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: #343030;
  cursor: pointer;
  z-index: 10;
  padding: 4px 8px;
}

.modal__close:hover {
  color: #776763;
}

.modal__body {
  display: flex;
  flex-direction: column;
}

.modal__slider {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 57%;
  background: #f4f6f9;
  overflow: hidden;
}

.modal__slider-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal__slider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.modal__slider-image--active {
  opacity: 1;
}

.modal__slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 24px;
  line-height: 1;
  color: #343030;
  cursor: pointer;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal__slider-btn:hover {
  background: #ffffff;
}

.modal__slider-btn--prev {
  left: 12px;
}

.modal__slider-btn--next {
  right: 12px;
}

.modal__dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 5;
}

.modal__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.2s;
}

.modal__dot--active {
  background: #ffffff;
}

.modal__info {
  padding: 32px;
}

.modal__title {
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  color: #343030;
  margin: 0 0 16px;
  white-space: pre-line;
}

.modal__description {
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.7;
  color: #555555;
  margin: 0 0 24px;
}

.modal__price {
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.5;
  color: #343030;
  margin: 0;
}

/* Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal,
.modal-fade-leave-active .modal {
  transition: transform 0.3s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter .modal,
.modal-fade-leave-to .modal {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .modal {
    max-width: 95vw;
    max-height: 85vh;
  }

  .modal__info {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
    align-items: flex-start;
    padding-top: 40px;
  }

  .modal__info {
    padding: 16px;
  }

  .modal__title {
    font-size: 16px;
  }

  .modal__description {
    font-size: 13px;
  }

  .modal__price {
    font-size: 16px;
  }

  .modal__close {
    font-size: 24px;
    top: 8px;
    right: 8px;
  }
}

@media (max-width: 360px) {
  .modal__info {
    padding: 12px;
  }

  .modal__title {
    font-size: 15px;
  }

  .modal__description {
    font-size: 12px;
    line-height: 1.5;
  }

  .modal__price {
    font-size: 15px;
  }
}
</style>
