export default function MobileViewAlert() {
  return (
    <div className="flex flex-col h-screen bg-[url('/background.jpg')] bg-cover">
      <div className="flex flex-col my-auto mx-auto items-center p-6 text-center text-white font-bold">
        Please open this website in your desktop browser, mobile is currently
        unsupported.
      </div>
    </div>
  );
}
