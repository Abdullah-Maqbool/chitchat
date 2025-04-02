// For Chats List

const ChatCard = (props) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-3xl bg-[#2e333d] py-4 px-4">
      <div className="flex flex-row items-center w-[85%] truncate">
        <img
          src={props.data.avatar}
          alt="avatar"
          className="rounded-2xl w-14 h-14"
        />
        <div className="flex flex-col mt-1">
          <h2 className="text-white text-xl font-bold ml-3">
            {props.data.displayName}
          </h2>
          {props.data.unread === false
            ? props.data.lastMessage && (
                <p className="text-gray-400 text-sm ml-3">
                  {props.data.lastMessage}
                </p>
              )
            : props.data.lastMessage && (
                <p className="text-gray-200 text-sm ml-3">
                  {props.data.lastMessage}
                </p>
              )}
        </div>
      </div>
      {props.data.unread && (
        <div className="relative">
          <span className="bg-[#6b8afd] text-white absolute top-1 left-1 w-3 h-3 rounded-full inline-flex justify-center items-center"></span>
          <span className="bg-[#6b8afd] text-white relative w-5 h-5 rounded-full inline-flex justify-center items-center animate-ping opacity-50"></span>
        </div>
      )}
    </div>
  );
};

export default ChatCard;
