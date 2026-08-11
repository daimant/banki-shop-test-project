<template>
  <header class="header">
    <div class="header__inner">
      <nav class="header__nav">
        <a
          v-for="item in menuItems"
          :key="item"
          class="header__nav-link"
          href="#"
          @click.prevent="handleNavClick(item)"
        >
          {{ item }}
        </a>
      </nav>
      <SearchBar
        :value="searchQuery"
        @input="$emit('update:searchQuery', $event)"
        @search="$emit('search', $event)"
      />
    </div>
    <div class="header__border"></div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchBar from '@/components/SearchBar.vue';

export default Vue.extend({
  name: 'AppHeader',
  components: { SearchBar },
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
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
.header {
  width: 100%;
  background: #ffffff;
}

.header__inner {
  max-width: 1920px;
  margin: 0 auto;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 352px;
}

.header__nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.header__nav-link {
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #343030;
  text-decoration: none;
  transition: opacity 0.2s;
}

.header__nav-link:hover {
  opacity: 0.7;
}

.header__border {
  width: 100%;
  height: 1px;
  background: #e1e1e1;
}

@media (max-width: 1440px) {
  .header__inner {
    padding: 0 120px;
  }
}

@media (max-width: 1024px) {
  .header__inner {
    padding: 0 60px;
    height: auto;
    min-height: 60px;
    flex-wrap: wrap;
    gap: 12px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .header__nav {
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .header__inner {
    padding: 0 32px;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 14px;
    padding-bottom: 14px;
  }

  .header__nav {
    gap: 16px;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .header__inner {
    padding: 0 16px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .header__nav {
    gap: 12px;
    font-size: 13px;
  }

  .header__nav-link {
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .header__inner {
    padding: 0 12px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .header__nav {
    gap: 10px;
  }

  .header__nav-link {
    font-size: 12px;
  }
}
</style>
