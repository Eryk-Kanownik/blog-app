import React from "react";

interface ILittleImage {
  imagePath: string;
}

const LittleImage: React.FC<ILittleImage> = ({ imagePath }) => {
  return (
    <div className="little-image">
      <div className="little-image__delete">&times;</div>
      <img src={imagePath} />
    </div>
  );
};

export default LittleImage;
