import Image from "next/image";
import ReactTooltip from "react-tooltip";
import {faComment, faHeart, faThumbsDown, faThumbsUp,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Comment from "../comment/comment";
import {useRouter} from "next/router";

const PostCard = ({
                    imageUrl,
                    description,
                    posterId,
                    posterName,
                    posterAvatar,
                    postDate,
                    tags,
                    userTags,
                    likes,
                    dislikes,
                    favorites,
                    comments,
                    handleLike,
                    isLiked,
                    handleDislike,
                    isDisliked,
                    handleFavorite,
                    isFavorited,
                    commentValue,
                    onChangeComment,
                    handlePostComment,
                    isCommentedOn,
  handleReportClick
                  }) => {

  const router = useRouter();

  return (
    <>
      <div className="inline-flex justify-center">
        <div
          className="bg-white border rounded-sm"
        >
          <div style={{width: 768}} className="flex items-center px-4 py-3">
            <Image
              src={posterAvatar}
              width={32}
              height={32}
              className="rounded-sm"
              onClick={() => router.push(`/users/${posterId}`)}
            />
            <div className="poster-name ml-3 text-sm font-semibold antialiased block leading-tight">
              {posterName}
            </div>
            <div className="post-date ml-6 text-gray-600 text-xs block">
              {postDate}
            </div>
            <button className="post-date ml-6 text-gray-600 text-xs block" onClick={handleReportClick}>Report post</button>
          </div>
          <div className="post-user-tags-list flex gap-2 items-center px-4 py-1">
            {userTags.map((user) => (
              <div key={user.id} className="post-user-tags-item">
                <Image
                  data-tip={user.userName}
                  src={user.userAvatar}
                  width={24}
                  height={24}
                  className="absolute rounded-lg inset-0 w-full h-full object-cover"
                  onClick={() => router.push(`/users/${user.id}`)}
                />
                <ReactTooltip place="bottom" type="dark" effect="solid"/>
              </div>
            ))}
          </div>
          <Image
            src={imageUrl}
            width={768}
            height={512}
            className="absolute rounded-lg inset-0 w-full h-full object-cover"
          />
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="post-tags flex-none">
              <div className="post-tags-list flex gap-2 font-semibold text-sm">
                {tags.map((tag, index) => (
                  <span key={index} className="post-tags-item">
                {"#" + tag}
              </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex mx-4 mt-3 mb-2">
            <div className="font-light italic break-words whitespace-pre-wrap overflow-y-auto">
              {description}
            </div>
          </div>

          <div>
            <div
              className="post-block grid grid-cols-4 mx-4 justify-center justify-items-center mt-3 mb-2 font-semibold">
              <div className="grid grid-cols-2 items-center gap-1 h-8 w-8" onClick={handleLike}>
                <FontAwesomeIcon icon={faThumbsUp} size={1} color="#2563EB"/>
                {isLiked() && <div style={{color: "#2563EB"}}>{likes.length}</div>}
                {!isLiked() && likes.length}
              </div>
              <div className="grid grid-cols-2 items-center gap-1 h-8 w-8" onClick={handleDislike}>
                <FontAwesomeIcon icon={faThumbsDown} color="#047857"/>
                {isDisliked() && <div style={{color: "#047857"}}>{dislikes.length}</div>}
                {!isDisliked() && dislikes.length}
              </div>
              <div className="grid grid-cols-2 items-center gap-1 h-8 w-8" onClick={handleFavorite}>
                <FontAwesomeIcon icon={faHeart} color="red"/>
                {isFavorited() && <div style={{color: "red"}}>{favorites.length}</div>}
                {!isFavorited() && favorites.length}
              </div>
              <div className="grid grid-cols-2 items-center gap-1 h-8 w-8">
                <FontAwesomeIcon icon={faComment} color="#FBBF24"/>
                {isCommentedOn() && <div style={{color: "#FBBF24"}}>{comments.length}</div>}
                {!isCommentedOn() && comments.length}
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray border rounded-sm divide-y divide-light-blue-400 overflow-y-auto"
        >
          <div className="flex mx-auto items-center justify-center shadow-lg mx-8 mb-4 max-w-lg">
            <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2" onSubmit={handlePostComment}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  className="bg-white rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body" placeholder='Type Your Comment' value={commentValue} onChange={onChangeComment} required/>
                </div>
                <div className="w-full md:w-full flex items-start md:w-full px-3">
                  <div className="-mr-1">

                  </div>
                  <button
                    className="bg-gray-100 text-gray-700 font-medium py-1 px-4 border block w-full rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
          {comments && comments.map(comment => (
              <Comment key={comment.id} commenterId={comment.commenter.id} commenter={comment.commenter.username}
                       commentDate={comment.commentDate}
                       content={comment.comment}/>
            )
          )}
        </div>
      </div>
    </>
  )

};

export default PostCard;
