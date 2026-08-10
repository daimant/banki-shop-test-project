<template>
  <div class="search-bar">
    <input
      v-model="query"
      type="text"
      class="search-bar__input"
      placeholder="Поиск по названию картины"
      @input="onInput"
    />
    <button class="search-bar__button" @click="onSearch">
      Найти
    </button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'SearchBar',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      query: this.value,
    };
  },
  watch: {
    value(val: string) {
      this.query = val;
    },
  },
  methods: {
    onInput(): void {
      this.$emit('input', this.query);
    },
    onSearch(): void {
      this.$emit('search', this.query);
    },
  },
});
</script>

<style scoped>
.search-bar {
  display: flex;
  width: 416px;
  height: 48px;
}

.search-bar__input {
  width: 294px;
  height: 48px;
  border: 1px solid #e1e1e1;
  padding: 0 16px;
  font-family: 'Merriweather', serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
  color: #343030;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
}

.search-bar__input::placeholder {
  color: #9f9f9f;
}

.search-bar__input:focus {
  border-color: #b5b5b5;
}

.search-bar__button {
  width: 122px;
  height: 48px;
  background: #403432;
  border: none;
  color: #ffffff;
  font-family: 'Merriweather', serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 1.5;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}

.search-bar__button:hover {
  background: #776763;
}

.search-bar__button:active {
  background: #382e2b;
}

@media (max-width: 768px) {
  .search-bar {
    width: 100%;
    max-width: 416px;
  }

  .search-bar__input {
    flex: 1;
    width: auto;
  }
}

@media (max-width: 480px) {
  .search-bar {
    height: 42px;
  }

  .search-bar__input {
    height: 42px;
    font-size: 13px;
    padding: 0 12px;
  }

  .search-bar__button {
    height: 42px;
    width: 90px;
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .search-bar {
    height: 40px;
    max-width: 100%;
  }

  .search-bar__input {
    height: 40px;
    font-size: 12px;
    padding: 0 10px;
  }

  .search-bar__button {
    height: 40px;
    width: 80px;
    font-size: 12px;
  }
}
</style>
