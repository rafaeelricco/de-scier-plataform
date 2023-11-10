import { ArticleItemProps } from '@/components/modules/Home/Search/ArticleItem/Typing'
import { uniqueId } from 'lodash'

export const articles: ArticleItemProps[] = [
   {
      id: uniqueId('article'),
      title: 'Understanding Blockchain Technology',
      authors: [
         { id: uniqueId('author'), name: 'Alice Thompson' },
         { id: uniqueId('author'), name: 'Bob Richards' }
      ],
      document_type: 'manuscript',
      image: 'https://source.unsplash.com/random/900×700/?technology',
      likes: 120,
      views: 345,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Blockchain' },
         { id: uniqueId('tag'), name: 'Technology' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Basics of Quantum Physics',
      authors: [
         { id: uniqueId('author'), name: 'Carol White' },
         { id: uniqueId('author'), name: 'David Smith' },
         { id: uniqueId('author'), name: 'Eva Green' }
      ],
      document_type: 'paper',
      image: 'https://source.unsplash.com/random/900×700/?physics',
      likes: 240,
      views: 567,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Quantum' },
         { id: uniqueId('tag'), name: 'Physics' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'The World of Computer Algorithms',
      authors: [
         { id: uniqueId('author'), name: 'Frank Johnson' },
         { id: uniqueId('author'), name: 'Grace Lee' }
      ],
      document_type: 'report',
      image: 'https://source.unsplash.com/random/900×700/?computer',
      likes: 320,
      views: 789,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Algorithms' },
         { id: uniqueId('tag'), name: 'Computer Science' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Machine Learning for Beginners',
      authors: [
         { id: uniqueId('author'), name: 'Henry Wilson' },
         { id: uniqueId('author'), name: 'Ivy Martin' },
         { id: uniqueId('author'), name: 'Jack Brown' },
         { id: uniqueId('author'), name: 'Katie Wilson' }
      ],
      document_type: 'review',
      image: 'https://source.unsplash.com/random/900×700/?machine',
      likes: 200,
      views: 650,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Machine Learning' },
         { id: uniqueId('tag'), name: 'AI' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Evolution of Modern Databases',
      authors: [{ id: uniqueId('author'), name: 'Larry Fisher' }],
      image: 'https://source.unsplash.com/random/900×700/?database',
      document_type: 'conference_abstract',
      likes: 45,
      views: 870,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Databases' },
         { id: uniqueId('tag'), name: 'Tech Evolution' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Introduction to Virtual Reality',
      authors: [
         { id: uniqueId('author'), name: 'Martin King' },
         { id: uniqueId('author'), name: 'Nancy Queen' }
      ],
      document_type: 'other',
      image: 'https://source.unsplash.com/random/900×700/?virtual',
      likes: 380,
      views: 920,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Virtual Reality' },
         { id: uniqueId('tag'), name: 'Innovation' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Modern Web Development Trends',
      authors: [
         { id: uniqueId('author'), name: 'Oscar Prince' },
         { id: uniqueId('author'), name: 'Paula Ray' }
      ],
      document_type: 'manuscript',
      image: 'https://source.unsplash.com/random/900×700/?web',
      likes: 500,
      views: 1000,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Web Development' },
         { id: uniqueId('tag'), name: 'Trends' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'IoT and its Applications',
      authors: [{ id: uniqueId('author'), name: 'Quincy Stevens' }],
      image: 'https://source.unsplash.com/random/900×700/?iot',
      document_type: 'paper',
      likes: 65,
      views: 1150,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'IoT' },
         { id: uniqueId('tag'), name: 'Applications' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Digital Art and Design Principles',
      authors: [
         { id: uniqueId('author'), name: 'Rachel Stone' },
         { id: uniqueId('author'), name: 'Steve Turner' }
      ],
      document_type: 'report',
      image: 'https://source.unsplash.com/random/900×700/?art',
      likes: 300,
      views: 620,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Digital Art' },
         { id: uniqueId('tag'), name: 'Design' }
      ]
   },
   {
      id: uniqueId('article'),
      title: 'Augmented Reality in Today’s World',
      authors: [
         { id: uniqueId('author'), name: 'Ursula Vance' },
         { id: uniqueId('author'), name: 'Victor Whiskey' },
         { id: uniqueId('author'), name: 'Wendy X-ray' }
      ],
      document_type: 'review',
      image: 'https://source.unsplash.com/random/900×700/?reality',
      likes: 720,
      views: 1280,
      access_type: 'open',
      published_date: '2020-12-31T18:30:00.000Z',
      tags: [
         { id: uniqueId('tag'), name: 'Augmented Reality' },
         { id: uniqueId('tag'), name: 'Technology' }
      ]
   }
]
