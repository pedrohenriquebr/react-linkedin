import { Home } from '../enums/home.enum'
import { parseRelativeTime } from '../helpers/date'

export const TimeLineMock = [
  {
    employee: {
      id: 2,
      name: 'Dr. Otto Octavius',
      department: Home.Department.SinisterSix,
      urlImage: 'https://i.ytimg.com/vi/P-98m6UQmBs/sddefault.jpg',
    },
    post: { message: 'Hello Peter!', date: parseRelativeTime('5min') },
  },
  {
    employee: {
      id: 1,
      name: 'Peter Parker',
      department: Home.Department.Avengers,
      urlImage:
        'https://saladadecinema.com.br/wp-content/uploads/2017/06/aranhatom-760x490.jpg',
    },
    post: { message: 'Do I know you?', date: parseRelativeTime('5min') },
  },
  {
    employee: {
      id: 3,
      name: 'Norman Osborn',
      department: Home.Department.SinisterSix,
      urlImage:
        'https://www.xfire.com/wp-content/uploads/2021/12/Spider-Man-No-Way-Home-Marvel-Sony-Villains-Green-Goblin-Face-Reveal-FEATURED-768x423.jpg',
    },
    post: { message: 'Peter! Peter!', date: parseRelativeTime('900d') },
  },
  {
    employee: {
      id: 4,
      name: 'Michelle Jones-Watson',
      department: Home.Department.NoDepart,
      urlImage:
        'https://upload.wikimedia.org/wikipedia/en/0/0a/Zendaya_as_MJ.jpeg',
    },
    post: {
      message: "What's Up, Dorks?",
      date: parseRelativeTime('just now'),
    },
  },
  {
    employee: {
      id: 5,
      name: 'Benedict Cumberbatch',
      department: Home.Department.Avengers,
      urlImage:
        'https://poltronanerd.com.br/wp-content/uploads/2021/08/dr-strange.jpg',
    },
    post: { message: 'Scooby-Doo this crap!', date: parseRelativeTime('6h') },
  },
]
