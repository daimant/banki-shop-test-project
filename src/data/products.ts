import { Product } from '@/types';

import product1_1 from '@/assets/product-1.jpg';
import product1_2 from '@/assets/product-1-2.jpg';
import product1_3 from '@/assets/product-1-3.jpg';

import product2_1 from '@/assets/product-2.jpg';
import product2_2 from '@/assets/product-2-2.jpg';
import product2_3 from '@/assets/product-2-3.jpg';

import product3_1 from '@/assets/product-3.png';
import product3_2 from '@/assets/product-3-2.png';
import product3_3 from '@/assets/product-3-3.png';

import product4_1 from '@/assets/product-4.jpg';
import product4_2 from '@/assets/product-4-2.png';
import product4_3 from '@/assets/product-4-3.png';

export const products: Product[] = [
  {
    id: 1,
    title: '«Рождение Венеры»\nСандро Боттичелли',
    price: 1000000,
    oldPrice: 2000000,
    description:
      '«Рождение Венеры» — картина итальянского художника Сандро Боттичелли, написанная около 1485 года. На полотне изображена богиня Венера, появляющаяся из морской пены. Картина хранится в галерее Уффици во Флоренции.',
    images: [product1_1, product1_2, product1_3],
    soldOut: false,
  },
  {
    id: 2,
    title: '«Тайная вечеря»\nЛеонардо да Винчи',
    price: 3000000,
    oldPrice: null,
    description:
      '«Тайная вечеря» — монументальная роспись Леонардо да Винчи, созданная в 1495–1498 годах. Изображает сцену последней трапезы Христа со своими учениками. Находится в монастыре Санта-Мария-делле-Грацие в Милане.',
    images: [product2_1, product2_2, product2_3],
    soldOut: false,
  },
  {
    id: 3,
    title: '«Сотворение Адама»\nМикеланджело',
    price: 5000000,
    oldPrice: 6000000,
    description:
      '«Сотворение Адама» — фреска Микеланджело Буонарроти, созданная около 1511 года. Является частью росписи потолка Сикстинской капеллы в Ватикане. Изображает библейский сюжет сотворения первого человека.',
    images: [product3_1, product3_2, product3_3],
    soldOut: false,
  },
  {
    id: 4,
    title: '«Урок анатомии»\nРембрандт',
    price: 0,
    oldPrice: null,
    description:
      '«Урок анатомии доктора Тульпа» — картина Рембрандта, написанная в 1632 году. Групповой портрет, изображающий публичное анатомическое вскрытие. Хранится в музее Маурицхёйс в Гааге.',
    images: [product4_1, product4_2, product4_3],
    soldOut: true,
  },
];
