import { useState } from 'react'
import { Home } from '../../models/home.model';
import { PostListProps } from '../../props/timeline.props';
import { CommentButton, ShareButton, SendButton, LikeButton, MoreButton } from '../Buttons'
import { TimeLine, TimeLineContainer } from '../TimeLine'
import './styles.css'

export function PostList({ data, onChange }: PostListProps) {
  const [data_, setData] = useState(data);
  
  const options = [
    {
      icon: 'bookmark',
      label: 'Save',
      onClick: () => {
        console.log('Save')
      },
    },
    {
      icon: 'link',
      label: 'Copy the link of post',
      onClick: () => {
        console.log('Copy the link of post')
      },
    },
    {
      icon: 'clear',
      label: (e?: Home.Employee) => `Stop following ${e?.name}`,
      onClick: () => {},
    },
  ]

  function handleReaction(icon: string, idx: number) {
    const newData = [...data_]
    //increment reaction
    const previous = newData[idx].post[icon] || 0
    newData[idx].post[icon] = previous + 1
    newData[idx].post.user_reaction = icon
    setData(newData)
    onChange && onChange(newData)
  }

  function handleDislike(idx: number) {
    const newData = [...data_]
    //subtract
    const icon = newData[idx].post.user_reaction
    if (!icon) return

    const previous = newData[idx].post[icon] || 0
    newData[idx].post[icon] = previous - 1
    newData[idx].post.user_reaction = undefined
    setData(newData)
    onChange && onChange(newData)
  }

  return (
    <div className="posts-container">
      <div className="posts-container-header">Publications</div>
      <div className="posts-container-list">
        {data && data_.map((row: Home.Posts.Timeline, idx: number) => (
          <TimeLineContainer
            key={idx}
            employee={row.employee}
            post={row.post}
          >
            <TimeLine.Actions>
              <LikeButton 
                  liked={!!row.post?.user_reaction}
                  onReaction={(icon) => handleReaction(icon,idx)}
                  onDislike={() => handleDislike(idx)}/>
              <CommentButton />
              <ShareButton />
              <SendButton />
              <MoreButton employee={row.employee} options={options} />
            </TimeLine.Actions>
          </TimeLineContainer>
        ))}
      </div>
    </div>
  )
}
