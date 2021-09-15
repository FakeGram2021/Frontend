import Image from "next/image";

const UserHeader = ({
                      userAvatar,
                      userName,
                      webUrl,
                      biography,
                      isFollow,
                      onFollow,
                      onUnfollow,
                      isBlock,
                      onBlock,
                      onUnblock,
                      isMute,
                      onMute,
                      onUnmute
                    }) => {
  return (
    <div className="block grid gap-4 grid-cols-1 place-items-center">
      <div style={{width: 184, height: 184}} className="rounded-full border-8 border-purple-400">
        <Image
          src={userAvatar}
          width={184}
          height={184}
          className="rounded-full"
          layout="responsive"
        />
      </div>

      <div className="text-lg font-semibold">
        {userName}
      </div>

      <div>
        {webUrl}
      </div>

      <div className="ml-3 font-light antialiased italic block leading-tight">
        {biography}
      </div>

      <div className={"grid grid-cols-3 gap-4"}>
        {isFollow &&
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onUnfollow}>
          Unfollow
        </button>
        }
        {isFollow === false &&
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onFollow}>
          Follow
        </button>
        }

        {isBlock &&
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onUnblock}>
          Unblock
        </button>
        }
        {isBlock === false &&
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onBlock}>
          Block
        </button>
        }

        {isMute &&
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onUnmute}>
          Unmute
        </button>
        }
        {isMute === false &&
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={onMute}>
          Mute
        </button>
        }
      </div>


    </div>
  )
}

export default UserHeader;