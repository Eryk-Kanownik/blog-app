import React, { useEffect, useState } from "react";

const Notify = () => {
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    setVisibility(true);
    setTimeout(() => setVisibility(false), 10000);
  }, []);
  return (
    <div className={`notification ${visibility ? "notification-appear" : ""}`}>
      <div className="notification__header">
        <h3>Success</h3>
        <div
          className="notification__header__close"
          onClick={() => setVisibility(false)}
        >
          &times;
        </div>
      </div>
      <div className="notification__content">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem
        consequuntur labore est ipsa autem facilis repudiandae explicabo
        distinctio quibusdam eaque recusandae porro ducimus dolor eligendi,
        harum quae quam a ipsam.
      </div>
    </div>
  );
};

export default Notify;
