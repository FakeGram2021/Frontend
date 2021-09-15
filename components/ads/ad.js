import Image from "next/image";

const Ad = (
  {
    id,
    imageUrl,
    adUrl
  }) => {
  return (
    <div
      className="bg-white border rounded-sm max-w"
      onClick={() => window.location.assign(adUrl)}
    >
      <div className="flex items-center px-4 py-3">
        <div className="poster-name ml-3 text-sm font-light antialiased italic block leading-tight">
          #Ad
        </div>
      </div>
      <Image
        src={imageUrl}
        width={768}
        height={512}
        className="absolute rounded-lg inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

export default Ad;
