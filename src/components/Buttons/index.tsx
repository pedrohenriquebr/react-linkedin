import { useEffect, useRef, useState } from 'react'
import { iconsMap } from '../../constants/reactions'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { LikeButtonProps, MoreButtonProps } from '../../props/timeline.props'

import './styles.css'

export function LikeButton({
  onReaction,
  onDislike,
  liked: likedProp = false,
  ...props
}: LikeButtonProps) {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [[x, y], setXY] = useState([0, 0])
  const [liked, setLiked] = useState(likedProp)
  const refMenu = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(refMenu, () => setToggleMenu(false), buttonRef)

  const icons = ['em---1', 'em-heart', 'em-angry', 'em-astonished']
  const styles = {
    top: toggleMenu ? `${y}px` : '-100%',
    left: toggleMenu ? `${x}px` : '-100%',
  }

  //@ts-ignore

  const handleClick = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect()

    if (refMenu.current) {
      setXY([x + width / 2, y - height - 30])
      liked ? handleDislike() : setToggleMenu(true)
    }
  }

  //@ts-ignore
  function handleReaction(e) {
    setToggleMenu(false)
    onReaction && onReaction(iconsMap[e])
    setLiked(true)
  }

  function handleDislike(){
    setLiked(!liked)
    onDislike && onDislike()
  }

  return (
    <>
      <div
        className={`action action-like ${liked || toggleMenu ? '--liked' : ''}`}
        onClick={handleClick}
        ref={buttonRef}
      >
        <span className="material-icons">thumb_up</span>
        <span>Like</span>
      </div>
      <div ref={refMenu} style={styles} className="menu-drop-down reactions">
        {icons.map((icon, idx) => {
          return (
            <div
              key={idx}
              className="menu-item"
              onClick={() => handleReaction(icon)}
            >
              <i className={'em ' + icon} />
            </div>
          )
        })}
      </div>
    </>
  )
}
export function CommentButton() {
  return (
    <div className="action">
      <span className="material-icons">insert_comment</span>
      <span>Comment</span>
    </div>
  )
}
export function ShareButton() {
  return (
    <div className="action">
      <span className="material-icons">share</span>
      <span>Share</span>
    </div>
  )
}
export function SendButton() {
  return (
    <div className="action">
      <span className="material-icons">send</span>
      <span>Send</span>
    </div>
  )
}
export function MoreButton({ options, employee }: MoreButtonProps) {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [[x, y], setXY] = useState([0, 0])
  const refMenu = useRef<HTMLDivElement | null>(null)
  const styles = {
    top: toggleMenu ? `${y}px` : '-100%',
    left: toggleMenu ? `${x}px` : '-100%',
  }

  const actionStyles = {
    color: '#61dafb',
    backgroundColor: '#23272e',
  }

  useOnClickOutside(refMenu, () => setToggleMenu(false))

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect()
    if (refMenu.current) {
      const { width: menuWidth } = getComputedStyle(refMenu.current)
      setXY([x + width - parseInt(menuWidth.split('px')[0]), y + height])
      setToggleMenu(!toggleMenu)
    }
  }

  return (
    <>
      <div
        className="action"
        onClick={handleClick}
        style={toggleMenu ? actionStyles : {}}
      >
        <span className="material-icons">more_vert</span>
      </div>

      <div ref={refMenu} style={styles} className="menu-drop-down">
        {options.map((option, idx) => {
          return (
            <div key={idx} className="menu-item" onClick={option.onClick}>
              <span className="material-icons">{option.icon}</span>
              <span>
                {typeof option.label == 'function'
                  ? option.label(employee)
                  : option.label}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}
