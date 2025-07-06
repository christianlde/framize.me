export default function View() {
  const baseUrl = 'https://s3.christiande.com/uploads/';
  // const baseVideoUrl = 'https://v.s3.christiande.com/uploads/';

  const url = new URL(window.location.href); // Get current URL
  const fileUrl = new URLSearchParams(url.search).get('fileUrl');
  // const fileType = new URLSearchParams(url.search).get('fileType');

  // const fileSrc = `${fileType === 'video' ? baseVideoUrl : baseUrl}${fileUrl}`;
  const fileSrc = `${baseUrl}${fileUrl}`;

  return (
    <main className="bg-stone-900 h-screen overflow-hidden flex flex-row justify-center items-center">
      <div className="flex flex-col gap-2 w-full h-full">
        <a href="/app" className="text-center py-2">Back to gallery</a>
        <p className="mx-auto">Image url : <b>{fileSrc}</b></p>

        <div className="w-full h-full p-2 overflow-hidden">
          {/* {fileType === 'video' ? (
            <video controls className="w-full h-full object-contain">
              <source src={fileSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : ( */}
            <img src={fileSrc} alt="file" className="w-full h-full object-contain" />
          {/* )} */}
        </div>
      </div>
    </main>
  );
}
