import { ArticleItemProps } from '@/components/modules/Home/Search/ArticleItem/Typing'
import { uniqueId } from 'lodash'

export const articles: ArticleItemProps[] = [
   {
      id: uniqueId(),
      title: 'Understanding Blockchain Technology',
      authors: [
         { id: 1, name: 'Alice Thompson' },
         { id: 2, name: 'Bob Richards' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?technology',
      likes: 120,
      views: 345,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 1, name: 'Blockchain' },
         { id: 2, name: 'Technology' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Basics of Quantum Physics',
      authors: [
         { id: 3, name: 'Carol White' },
         { id: 4, name: 'David Smith' },
         { id: 5, name: 'Eva Green' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?physics',
      likes: 240,
      views: 567,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 3, name: 'Quantum' },
         { id: 4, name: 'Physics' }
      ]
   },
   {
      id: uniqueId(),
      title: 'The World of Computer Algorithms',
      authors: [
         { id: 6, name: 'Frank Johnson' },
         { id: 7, name: 'Grace Lee' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?computer',
      likes: 320,
      views: 789,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 5, name: 'Algorithms' },
         { id: 6, name: 'Computer Science' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Machine Learning for Beginners',
      authors: [
         { id: 8, name: 'Henry Wilson' },
         { id: 9, name: 'Ivy Martin' },
         { id: 10, name: 'Jack Brown' },
         { id: 11, name: 'Katie Wilson' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?machine',
      likes: 200,
      views: 650,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 7, name: 'Machine Learning' },
         { id: 8, name: 'AI' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Evolution of Modern Databases',
      authors: [{ id: 12, name: 'Larry Fisher' }],
      image: 'https://source.unsplash.com/random/900×700/?database',
      likes: 450,
      views: 870,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 9, name: 'Databases' },
         { id: 10, name: 'Tech Evolution' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Introduction to Virtual Reality',
      authors: [
         { id: 13, name: 'Martin King' },
         { id: 14, name: 'Nancy Queen' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?virtual',
      likes: 380,
      views: 920,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 11, name: 'Virtual Reality' },
         { id: 12, name: 'Innovation' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Modern Web Development Trends',
      authors: [
         { id: 15, name: 'Oscar Prince' },
         { id: 16, name: 'Paula Ray' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?web',
      likes: 500,
      views: 1000,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 13, name: 'Web Development' },
         { id: 14, name: 'Trends' }
      ]
   },
   {
      id: uniqueId(),
      title: 'IoT and its Applications',
      authors: [{ id: 17, name: 'Quincy Stevens' }],
      image: 'https://source.unsplash.com/random/900×700/?iot',
      likes: 650,
      views: 1150,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 15, name: 'IoT' },
         { id: 16, name: 'Applications' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Digital Art and Design Principles',
      authors: [
         { id: 18, name: 'Rachel Stone' },
         { id: 19, name: 'Steve Turner' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?art',
      likes: 300,
      views: 620,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 17, name: 'Digital Art' },
         { id: 18, name: 'Design' }
      ]
   },
   {
      id: uniqueId(),
      title: 'Augmented Reality in Today’s World',
      authors: [
         { id: 20, name: 'Ursula Vance' },
         { id: 21, name: 'Victor Whiskey' },
         { id: 22, name: 'Wendy X-ray' }
      ],
      image: 'https://source.unsplash.com/random/900×700/?reality',
      likes: 720,
      views: 1280,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: 19, name: 'Augmented Reality' },
         { id: 20, name: 'Technology' }
      ]
   }
]
