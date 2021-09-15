import {useRouter} from "next/router";

const Comment = ({commenterId, commenter, commentDate, content}) => {

  const router = useRouter();

  return (
    <div className="bg-white rounded-lg flex flex-col justify-center items-center md:items-start">
      <div
        className="flex flex-row justify-center items-baseline mr-2 ml-3 text-sm font-semibold antialiased block leading-tight">
        <h3 className="font-semibold text-lg text-center md:text-left "
            onClick={() => router.push(`/users/${commenterId}`)}>{commenter}</h3>
        <h4 className="text-gray-600 ml-6 text-xs block">{commentDate.toLocaleString()}</h4>
      </div>
      <p
        className="text-gray-600 text-lg ml-3 mt-3 text-center md:text-left font-light break-words whitespace-pre-wrap">
        {content}
      </p>
    </div>
  )
}
export default Comment;