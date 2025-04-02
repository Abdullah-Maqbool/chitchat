import RequestCard from "./cards/RequestCard";
import { useSelector } from "react-redux";

const Requests = (props) => {
  const requests = useSelector((state) => state.user.friendRequests);
  // const requests = [
  //   {
  //     user: {
  //       displayName: "John Doe",
  //       avatar: "/avatar.jpg",
  //       username: "johndoe123",
  //     },
  //     incoming: true,
  //   },
  //   {
  //     user: {
  //       displayName: "Alice",
  //       avatar: "/avatar.jpg",
  //       username: "alice123",
  //     },
  //     incoming: false,
  //   },
  // ];

  const filteredRequests = requests.filter(
    (request) => request.incoming !== props.pending
  );

  // Use state instead of array size to conditionally render the No Requests message
  return filteredRequests.length === 0 ? (
    <h1 className="flex flex-col justify-center items-center px-4 h-full mb-24 overflow-scroll text-white">
      No Requests...
    </h1>
  ) : (
    <div className="flex flex-col mt-4 px-4 space-y-3 mb-24 lg:mb-12 overflow-scroll">
      {filteredRequests.map((req, index) => (
        <RequestCard key={index} pending={props.pending} data={req.user} />
      ))}
    </div>
  );
};

export default Requests;
