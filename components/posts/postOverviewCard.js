import Image from "next/image";
import ReactTooltip from "react-tooltip";
import {faComment, faHeart, faThumbsDown, faThumbsUp,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PostOverviewCard = ({
                            id,
                            imageUrl,
                            description,
                            posterId,
                            posterName,
                            posterAvatar,
                            postDate,
                            tags,
                            userTags,
                            likes_count,
                            dislikes_count,
                            favorites_count,
                            comments_count,
                            handleClick,
                          }) => {
  return (
    <div
      className="bg-white border rounded-sm max-w"
      onClick={handleClick}
    >
      <div className="flex items-center px-4 py-3">
        <Image
          src={posterAvatar}
          width={32}
          height={32}
          className="rounded-sm"
        />
        <div className="poster-name ml-3 text-sm font-semibold antialiased block leading-tight">
          {posterName}
        </div>
        <div className="post-date ml-6 text-gray-600 text-xs block">
          {postDate}
        </div>
      </div>
      <div className="post-user-tags-list flex gap-2 items-center px-4 py-1">
        {userTags.map((user, index) => (
          <div key={index} className="post-user-tags-item">
            <Image
              data-tip={user.userName}
              src={user.userAvatar}
              width={24}
              height={24}
              className="absolute rounded-lg inset-0 w-full h-full object-cover"
              on
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
      <div className="flex items-center mx-4 mt-3 mb-2 font-light italic">
        <h4>{description}</h4>
      </div>
      <div>
        <div className="post-block grid grid-cols-4 mx-4 justify-center justify-items-center mt-3 mb-2 font-semibold">
          <div className="grid grid-cols-2 items-center gap-1 h-8 w-8">
            <FontAwesomeIcon icon={faThumbsUp} size={1} color="#2563EB"/>
            {likes_count}
          </div>
          <div className="grid grid-cols-2 items-center gap-1 h-8 w-8">
            <FontAwesomeIcon icon={faThumbsDown} color="#047857"/>
            {dislikes_count}
          </div>
          <div className="grid grid-cols-2 items-center gap-1 h-8 w-8">
            <FontAwesomeIcon icon={faHeart} color="red"/>
            {favorites_count}
          </div>
          <div className="grid grid-cols-2 items-center gap-1 h-8 w-8">
            <FontAwesomeIcon icon={faComment} color="#FBBF24"/>
            {comments_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostOverviewCard;
