import { Trip } from '../entities/trip.entity';

export const tripMockData: Partial<Trip>[] = [
  {
    id: '81553c5d-9099-4866-9ebe-860dad974d25',
    title: 'Iceland',
    description:
      'Take part in the adventure and come and discover Iceland, from the Highlands to the Ocean. From the first day, you will dive into the heart of the unique landscapes of this North Atlantic island, alternating travel by vehicle on tracks at the end of the world, long hikes on major natural sites and relaxation in the hot springs. Accompanied by your guide, you will cross the multiple tracks of Iceland revealing the most varied landscapes.',
    level: 'easy',
    duration: 15,
    price: 4795,
    image: 'https://i.gyazo.com/0aae9c20e73caebb07c0dbdfe2bbd89c.jpg',
    createdAt: new Date('2024-07-07T17:26:00.192Z'),
  },
  {
    id: 'eb3f3dd6-1387-4670-9208-323d2766a9fc',
    title: 'Scotland',
    description:
      'In the North of Great Britain, Scotland is a land of character which has much to offer its visitors. Mountains and valleys, islands and cliffs, castles and distilleries, ghosts and legends... Your guide will allow you to better discover the many facets of this region. The accessible and sumptuous hikes will take you to isolated places enjoying splendid or unmissable views because they are so emblematic of the country.',
    level: 'easy',
    duration: 8,
    price: 2145,
    image: 'https://i.gyazo.com/9692ef5341a64659e8a211f19808732f.jpg',
    createdAt: new Date('2024-07-07T17:26:00.192Z'),
  },
  {
    id: 'c752e617-fc4c-4895-873a-b0e122b09545',
    title: 'Norway',
    description:
      'This alpine course immerses us in the wild and unique atmosphere of the southern massifs of the Lofoten archipelago. It is in this sector, the most mountainous of the islands, that we have selected the most beautiful hikes, resulting from our long experience, to make you discover breathtaking landscapes.',
    level: 'moderate',
    duration: 13,
    price: 2690,
    image: 'https://i.gyazo.com/f51b0738c6850a24dacbfe7ef092abe2.jpg',
    createdAt: new Date('2024-07-07T17:26:00.192Z'),
  },
  {
    id: '62c3245c-ef7e-4899-b0b7-0be08c4545c0',
    title: 'Spitsbergen',
    description:
      'This trip to the last affordable territory before the North Pole allows you to discover one of the most beautiful fjords in Spitsbergen: King’s Bay. Stages between three camps, in the heart of the bay, will allow you to sail in a sea kayak in the middle of the icebergs, to approach seals basking in the sun and to admire the whole bay from the surrounding peaks on a hike. . This polar voyage in King’s Bay will be a memorable experience.',
    level: 'moderate',
    duration: 11,
    price: 3495,
    image: 'https://i.gyazo.com/682bf539e0ed5041621703b1a45e532f.jpg',
    createdAt: new Date('2024-07-07T17:26:00.192Z'),
  },
  {
    id: 'cd9c84f6-f3fa-4b44-8c24-5d73853114a0',
    title: 'Greenland',
    description:
      'Exceptional trip of nearly three weeks to the very north of Disko Bay, sanctuary of the largest icebergs in the northern hemisphere. A unique and exploratory stay in this isolated area of northern Greenland where tourist attendance remains sporadic.',
    level: 'difficult',
    duration: 19,
    price: 5395,
    image: 'https://i.gyazo.com/eef2d8dea9e6c55f1bb906ca1f5850b0.jpg',
    createdAt: new Date('2024-07-07T17:26:00.192Z'),
  },
  {
    id: 'd20aa428-a63c-480d-9a19-55ced0344c5d',
    title: 'Ireland',
    description:
      'Immersed in the Emerald Isle, with your guide and a small group of 8 people maximum, you will discover all the wonders of Ireland. This sumptuous, green and hilly island is rich in exceptional natural sites. Fishing villages or colorful towns, vertiginous cliffs and jagged points, geological or archaeological sites, this varied stay will allow you to visit, by carrying out hikes affordable for all, and to immerse yourself in the country. Evenings in festive towns or villages will allow you to discover the heart of Ireland, its people.',
    level: 'easy',
    duration: 8,
    price: 1995,
    image: 'https://i.gyazo.com/f13e6780cd7c0d7440ed04d58d948db3.jpg',
    createdAt: new Date('2024-07-07T17:26:00.192Z'),
  },
];
