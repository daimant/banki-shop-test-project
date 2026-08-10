import { Product } from '@/types';

import product1Img from '@/assets/product-1.png';
import product2Img from '@/assets/product-2.png';
import product3Img from '@/assets/product-3-334ab8.png';
import product4Img from '@/assets/product-4.png';

export const products: Product[] = [
  {
    id: 1,
    title: '«Рождение Венеры»\nСандро Боттичелли',
    price: 1000000,
    oldPrice: 2000000,
    description:
      '«Рождение Венеры» — картина итальянского художника Сандро Боттичелли, написанная около 1485 года. На полотне изображена богиня Венера, появляющаяся из морской пены. Картина хранится в галерее Уффици во Флоренции.',
    images: [product1Img, product1Img, product1Img],
    soldOut: false,
  },
  {
    id: 2,
    title: '«Тайная вечеря»\nЛеонардо да Винчи',
    price: 3000000,
    oldPrice: null,
    description:
      '«Тайная вечеря» — монументальная роспись Леонардо да Винчи, созданная в 1495–1498 годах. Изображает сцену последней трапезы Христа со своими учениками. Находится в монастыре Санта-Мария-делле-Грацие в Милане.',
    images: [product2Img, product2Img, product2Img],
    soldOut: false,
  },
  {
    id: 3,
    title: '«Сотворение Адама»\nМикеланджело',
    price: 5000000,
    oldPrice: 6000000,
    description:
      '«Сотворение Адама» — фреска Микеланджело Буонарроти, созданная около 1511 года. Является частью росписи потолка Сикстинской капеллы в Ватикане. Изображает библейский сюжет сотворения первого человека.',
    images: [product3Img, product3Img, product3Img],
    soldOut: false,
  },
  {
    id: 4,
    title: '«Урок анатомии»\nРембрандт',
    price: 0,
    oldPrice: null,
    description:
      '«Урок анатомии доктора Тульпа» — картина Рембрандта, написанная в 1632 году. Групповой портрет, изображающий публичное анатомическое вскрытие. Хранится в музее Маурицхёйс в Гааге.',
    images: [product4Img, product4Img, product4Img],
    soldOut: true,
  },
];
