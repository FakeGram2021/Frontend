import {useState} from "react";

import PostLayout from "../../components/layout/post/postLayout";
import PostCard from "../../components/posts/postCard";
import PostServiceClient from "../../lib/clients/PostServiceClient";
import {TokensLib} from "../../lib/tokens";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/router";

const PostPage = ({data, auth, errorStatus}) => {
  const [post, setPost] = useState(data);
  const router = useRouter()
  const [newCommentUUID] = useState(uuidv4())
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(auth ? TokensLib.decodeToken(auth).sub : null);
  const [reportVisibility, setReportVisibility] = useState(false);

  const isLiked = () => {
    return post.likes.includes(userId);
  }

  const handleLike = async () => {
    if (userId === null)
      return

    if (isLiked()) {
      await axios.delete(`/api/posts/${post.id}/likes/`);
      setPost({...post, likes: post.likes.filter(like => like !== userId)});
    } else {
      await axios.get(`/api/posts/${post.id}/likes/`);
      setPost({...post, likes: [...post.likes, userId]});
    }
  }

  const isDisliked = () => {
    return post.dislikes.includes(userId);
  }

  const handleDislike = async () => {
    if (userId === null)
      return

    if (isDisliked()) {
      await axios.delete(`/api/posts/${post.id}/dislikes/`);
      setPost({...post, dislikes: post.dislikes.filter(dislike => dislike !== userId)});
    } else {
      await axios.get(`/api/posts/${post.id}/dislikes/`);
      setPost({...post, dislikes: [...post.dislikes, userId]});
    }
  }

  const isFavorited = () => {
    return post.favorites.includes(userId);
  }

  const handleFavorite = async () => {
    if (userId === null)
      return

    if (isFavorited()) {
      await axios.delete(`/api/posts/${post.id}/favorites/`);
      setPost({...post, favorites: post.favorites.filter(favorite => favorite !== userId)});
    } else {
      await axios.get(`/api/posts/${post.id}/favorites/`);
      setPost({...post, favorites: [...post.favorites, userId]});
    }
  }

  const isCommentedOn = () => {
    return post.comments.length > 0 && post.comments.filter(comment => comment.commenter.id === userId).length > 0;
  }

  const handleCommentChange = (event) => {
    const val = event.target.value;
    setNewComment(val);
  };

  const handlePostComment = async (event) => {
    if (userId === null)
      return

    event.preventDefault();
    const commentToAdd = {id: newCommentUUID, comment: newComment};
    await axios.post(`/api/posts/${post.id}/comment`, commentToAdd)
    router.reload();
  }

  const reportPost = async (reason) => {
    const report = {
      reportedAccountId: post.poster.id,
      reportedPostId: post.id,
      reportReason: reason
    }

    await axios.post(`/api/reports`, report);
  }

  return (
    <PostLayout>
      <div className="mb-8">
        {reportVisibility && <div
          className="space-x-2 bg-red-50 p-4 mb-8 rounded flex items-center text-red-600 shadow-lg mx-auto max-w-2xl w-full">
          <button
            className="inline-flex items-center hover:bg-red-100 border border-red-50 hover:border-red-300 hover:text-red-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
            onClick={() => reportPost("BULLYING")}
          >
            Bullying
          </button>
          <button
            className="inline-flex items-center hover:bg-red-100 border border-red-50 hover:border-red-300 hover:text-red-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
            onClick={() => reportPost("NUDITY")}
          >
            Nudity
          </button>
          <button
            className="inline-flex items-center hover:bg-red-100 border border-red-50 hover:border-red-300 hover:text-red-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
            onClick={() => reportPost("HATE_SPEECH")}
          >
            Hate speech
          </button>
          <div className="tracking-wider flex-1">
            <button
              className="inline-flex items-center hover:bg-red-100 border border-red-50 hover:border-red-300 hover:text-red-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
              onClick={() => reportPost("VIOLENCE")}
            >
              Violence
            </button>
          </div>
          <button
            className="inline-flex items-center hover:bg-red-100 border border-red-50 hover:border-red-300 hover:text-red-900 focus:outline-none rounded-full p-2 hover:cursor-pointer"
            onClick={() => setReportVisibility(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current w-4 h-4 pt-1"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/>
            </svg>
          </button>
        </div>}

        {post && <PostCard id={post.id}
                           imageUrl={post.imageUrl}
                           description={post.description}
                           posterId={post.poster.id}
                           posterName={post.poster.username}
                           posterAvatar={post.poster.userAvatar}
                           postDate={post.postDate}
                           tags={post.tags}
                           userTags={post.userTags}
                           likes={post.likes}
                           isLiked={isLiked}
                           dislikes={post.dislikes}
                           isDisliked={isDisliked}
                           favorites={post.favorites}
                           isFavorited={isFavorited}
                           comments={post.comments}
                           isCommentedOn={isCommentedOn}
                           handleLike={handleLike}
                           handleDislike={handleDislike}
                           handleFavorite={handleFavorite}
                           commentValue={newComment} onChangeComment={handleCommentChange}
                           handlePostComment={handlePostComment} handleReportClick={() => setReportVisibility(true)}/>
        }

        {errorStatus && <h1>404 - Could not load post</h1>}
      </div>

    </PostLayout>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookie = context.req.headers.cookie;
    const hasCookie = cookie !== undefined && cookie !== null;

    const response = hasCookie ? await PostServiceClient.get(
        `v1/posts/${encodeURIComponent(context.params.id)}`,
        {headers: {cookie: cookie}})
      : await PostServiceClient.get(
        `v1/posts/${encodeURIComponent(context.params.id)}`)
    return {
      props: {
        data: response.data,
        auth: TokensLib.getToken(context.req),
        errorStatus: null
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        auth: TokensLib.getToken(context.req),
        errorStatus: error.response ? error.response.status : "No response"
      },
    };
  }
}

export default PostPage;
