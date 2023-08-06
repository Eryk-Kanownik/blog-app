import React from "react";

interface ILittleImage {
  imagePath: string;
  onClickDelete: Function;
  index: any;
}

const LittleImage: React.FC<ILittleImage> = ({
  imagePath,
  index,
  onClickDelete,
}) => {
  return (
    <div className="little-image">
      <div
        className="little-image__delete"
        onClick={() => onClickDelete(index)}
      >
        &times;
      </div>
      <div className="little-image__image">
        <img src={imagePath} />
      </div>
    </div>
  );
};

export default LittleImage;
