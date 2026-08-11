<template>
  <footer class="footer">
    <div class="footer__inner">
      <nav class="footer__nav">
        <a
          v-for="item in menuItems"
          :key="item"
          class="footer__nav-link"
          href="#"
          @click.prevent="handleNavClick(item)"
        >
          {{ item }}
        </a>
      </nav>
      <div class="footer__contacts">
        <a
          href="tel:+78125555555"
          class="footer__contact"
        >
          <img
            :src="phoneIcon"
            alt=""
            class="footer__contact-icon"
          />
          <span>+7 (812) 555-55-55</span>
        </a>
        <a
          href="https://yandex.ru/maps/?text=Санкт-Петербург,+ул.+Ефимова,+3"
          target="_blank"
          rel="noopener"
          class="footer__contact"
        >
          <img
            :src="addressIcon"
            alt=""
            class="footer__contact-icon"
          />
          <span>г. Санкт-Петербург, ул. Ефимова, 3</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import phoneIcon from '@/assets/icon-phone.svg';
import addressIcon from '@/assets/icon-address.svg';

export default Vue.extend({
  name: 'AppFooter',
  data() {
    return {
      phoneIcon,
      addressIcon,
      menuItems: ['Каталог', 'Доставка', 'Оплата', 'Контакты', 'О компании'] as string[],
    };
  },
  methods: {
    handleNavClick(item: string): void {
      this.$emit('nav-click', item);
    },
  },
});
</script>

<style scoped>
.footer {
  width: 100%;
  background: #eceaea;
}

.footer__inner {
  max-width: 1920px;
  margin: 0 auto;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 352px;
  gap: 48px;
}

.footer__nav {
  display: flex;
  gap: 10px 48px;
  flex-wrap: wrap;
}

.footer__nav-link {
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #555555;
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer__nav-link:hover {
  opacity: 0.7;
}

.footer__contacts {
  display: flex;
  gap: 10px 48px;
  flex-wrap: wrap;
}

.footer__contact {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #555555;
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer__contact:hover {
  opacity: 0.7;
}

.footer__contact-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

@media (max-width: 1440px) {
  .footer__inner {
    padding: 0 120px;
  }
}

@media (max-width: 1024px) {
  .footer__inner {
    padding: 0 60px;
    height: auto;
    min-height: 70px;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .footer__nav {
    gap: 24px;
  }

  .footer__contacts {
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .footer__inner {
    padding: 0 32px;
    min-height: auto;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
    gap: 16px;
  }

  .footer__nav {
    gap: 16px;
  }

  .footer__contacts {
    gap: 12px;
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .footer__inner {
    padding: 0 16px;
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .footer__nav-link {
    font-size: 13px;
  }

  .footer__contact {
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .footer__inner {
    padding: 0 12px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .footer__nav-link,
  .footer__contact {
    font-size: 12px;
  }
}
</style>
