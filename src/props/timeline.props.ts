import { Home } from './../models/home.model';

export interface TimeLineProps {
  employee: Home.Employee
  post?: Home.Posts.Post
}

export interface ActionsProps {
}

export interface PostListProps {
  data: Home.Posts.Timeline[]

  onChange?: (data: Home.Posts.Timeline[]) => void
}

export interface MenuItem {
  icon: string
  label: string | ((employee?: Home.Employee) => string)
  onClick: () => void
}

export interface MoreButtonProps {
  options: MenuItem[]
  employee?: Home.Employee
}

export interface LikeButtonProps {
  onReaction: (reaction: string) => void
  onDislike: () => void
  liked?: boolean
}
