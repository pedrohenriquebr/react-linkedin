import './Home.css'

import { PostList } from '../components/PostList';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TimeLineMock } from '../asset/timeline';
import { Home } from '../models/home.model';


function HomeComponent() {
  const [data, setData] = useLocalStorage('timeLine');

  if(!data)
    setData(JSON.stringify(TimeLineMock));
  return (
    <div className="App">
      <header className="app-body">
        <PostList 
        data={data ? JSON.parse(data) as  Home.Posts.Timeline[] : []}
        onChange={(timeline)=> setData(JSON.stringify(timeline))}
        />
      </header>
    </div>
  )
}

export default HomeComponent
