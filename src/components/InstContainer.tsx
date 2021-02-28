import React, { useEffect } from 'react'
import Feed from './Feed/Feed'
import Header from './Header/Header'
import {connect} from 'react-redux'
import { RootState } from '../redux/store'
import { PostType, User } from '../types/types'
import { addComment, addPost, deleteComment, deletePost, initRequestAndSetPosts } from '../redux/feed-reducer'
import { tempAuthName, register, updateUserData, like, follow } from '../redux/auth-reducer'


type MapStatePropsType = {
  authUser: User
  isInitializing: boolean
  posts: PostType[]
}
type MapDispatchPropsType = {
  addComment: (body: string, postId: number) => void
  addPost: (caption: string, images: FileList) => void
  deleteComment: (commentId: number) => void
  deletePost: (postId: number) => void
  initRequestAndSetPosts: () => void
  tempAuthName: (authUsername: string, password: string) => void
  register: (username: string, password: string) => void
  updateUserData: (avatar: File, bio: string) => void
  like: (postId: number) => void
  follow: (followed_user_id: number) => void
}
type Props = MapStatePropsType & MapDispatchPropsType

const InstContainer: React.FC<Props> = ({
  authUser, isInitializing, posts, addComment, addPost, deleteComment, deletePost, initRequestAndSetPosts, tempAuthName,
  register, updateUserData, like, follow
}) => {

  useEffect(() => {
    if (authUser.id === 0) {
      tempAuthName('user7', 'user7password')
    }
  }, [authUser.id, tempAuthName])


  return (
    <div>
      <Header addPost={addPost} authUser={authUser} tempAuthName={tempAuthName} register={register} 
      updateUserData={updateUserData} />
      <Feed
        isInitializing={isInitializing}
        posts={posts}
        authUser={authUser}

        addComment={addComment}
        deleteComment={deleteComment}
        deletePost={deletePost}
        initRequestAndSetPosts={initRequestAndSetPosts}
        like={like}
        follow={follow}
      />
    </div>
  )
}

const mapStateToProps = (state: RootState): MapStatePropsType => ({
  authUser: state.auth.authUser,
  isInitializing: state.feed.isInitializing,
  posts: state.feed.posts,
})


const mapDispatchToProps: MapDispatchPropsType = {
  // ...actions,
  addComment,
  addPost,
  deleteComment,
  deletePost,
  initRequestAndSetPosts,
  tempAuthName,
  register,
  updateUserData,
  like,
  follow,
}


export default connect
  <MapStatePropsType, MapDispatchPropsType, {}, RootState>
  (mapStateToProps, mapDispatchToProps)(InstContainer)