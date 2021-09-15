import Image from "next/image";
import {useRouter} from "next/router";

const PrivateUserHeader = ({
                      userId,
                      userAvatar,
                      userName,
                      webUrl,
                      biography
                    }) => {

  const router = useRouter();

  return (
    <div className="block grid gap-4 grid-cols-1 place-items-center">
      <div style={{width: 184, height: 184}} className="rounded-full border-8 border-purple-400">
        <Image
          src={userAvatar}
          width={184}
          height={184}
          className="rounded-full"
          layout="responsive"
          onClick={() => router.push(`/users/${userId}`)}
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
    </div>
  )
}

export default PrivateUserHeader;