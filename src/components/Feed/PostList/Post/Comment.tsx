import React, { useState } from 'react'
import { CommentType, UserType } from '../../../../types/types'
import CommentModal from './CommentModal'


const Comment: React.FC<Props> = ({authorUsername, body, commentId, deleteComment}) => {

  const maxLength = 120


  const [isMoreShown, setIsMoreShown] = useState(body.length > maxLength)
  const [isSliced, setIsSliced] = useState(body.length > maxLength)


  const getSlicedBody = (body: string) => {
    for (let i = maxLength; i > 0; i--) {
      if (body[i] === ' ') {
        return body.slice(0, i)
      }
    }
  }


  const onMore = () => {
    setIsSliced(false)
    setIsMoreShown(false)
  }


  return (
    <div className="post__footer">

      <div className="post__footer__comments__item">
        

        <div className="post__footer__comments__comment">

          <span className="post__footer__comments__author">
            {authorUsername}
          </span>

          &nbsp;

          <span>
            {isSliced ? getSlicedBody(body) : body}
          </span>

          {isMoreShown &&
            <span className="post__footer__comments__more" onClick={onMore}>...more
          </span>}

        </div>


        <div className="pointer">
          <CommentModal commentId={commentId} deleteComment={deleteComment} />
        </div>

      </div>
    </div>
  )
}

export default Comment




// types
interface Props {
  authorUsername: UserType['username']
  body: string
  commentId: CommentType['id'] | null
  deleteComment: (id: CommentType['id']) => void
}