// For Friends List

const UserCardDesktop = (props) => {
  return (
    <div
      className="flex flex-row items-center justify-between rounded-3xl bg-[#2e333d] py-4 px-4 cursor-pointer border-transparent border-2 border-solid hover:border-white"
      onClick={() => {
        props.setNav("chat");
        props.setChat(props.data.username);
      }}
    >
      <div className="flex flex-row items-center">
        <img
          src={props.data.avatar}
          alt="avatar"
          className="rounded-2xl w-14 h-14"
        />
        <div className="flex flex-col mt-1">
          <h1 className="text-white text-xl font-medium ml-3">
            {props.data.displayName}
          </h1>
          <h1 className="text-gray-400 text-base ml-3">
            ID: {props.data.username}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserCardDesktop;
