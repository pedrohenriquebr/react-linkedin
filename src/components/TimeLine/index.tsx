import './styles.css';

import { PropsWithChildren } from 'react';

import { iconsMap } from '../../constants/reactions';
import { relativeTime } from '../../helpers/date';
import { ActionsProps, TimeLineProps } from '../../props/timeline.props';

export namespace TimeLine {
  export function Actions({ children, ...props }: PropsWithChildren<ActionsProps>) {
    return <div className="timeline-actions">{children}</div>
  }
}

export function TimeLineContainer({
  employee: data,
  post,
  children,
}: PropsWithChildren<TimeLineProps>) {
  //Linkedin dropdown options
  const icons = ['em---1', 'em-heart', 'em-angry', 'em-astonished']

  return (
    <div className="timeline-container">
      <div className="timeline-card">
        <img src={data.urlImage} alt="" />
        <div className="timeline-employee-info">
          <span>{data.name}</span>
          <span>{data.department}</span>
          <span>{post && relativeTime(post?.date)}</span>
        </div>
      </div>
      <div className="timeline-post">
        <span>{post?.message}</span>
      </div>
      <div className="timeline-details">
        <div className="timeline-reactions">
          {/* Only show the reactions */}
          {icons
            .filter((icon) => post?.[iconsMap[icon]])
            .map((icon, idx) => {
              return (
                <div key={idx} className="timeline-reaction">
                  <i className={'em ' + icon}></i>
                  <a href="#">{post?.[iconsMap[icon]] || 0}</a>
                </div>
              )
            })}
        </div>
      </div>
      {children}
    </div>
  )
}
