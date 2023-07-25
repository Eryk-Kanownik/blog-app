import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

const Notify = () => {
  const serverMessage = useAppSelector((state) => state.message);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    setVisibility(true);
    setTimeout(() => setVisibility(false), 10000);
  }, [serverMessage]);
  return (
    <div
      className={`notification ${visibility ? "notification-appear" : ""} ${
        serverMessage.state === 1
          ? "notification-success"
          : "notification-failure"
      }`}
    >
      <div className="notification__header">
        <h3>{serverMessage.state === 1 ? "Success" : "Failure"}</h3>
        <div
          className="notification__header__close"
          onClick={() => setVisibility(false)}
        >
          &times;
        </div>
      </div>
      <div className="notification__content">{serverMessage.message}</div>
    </div>
  );
};

export default Notify;
