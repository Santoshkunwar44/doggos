import React from "react";
const DogCard = ({ dog }) => {
  return (
    <div className="dog">
      <div>
        <p>{dog.Year}</p>
      </div>
      <div>
        <img
          src={
            dog.Poster !== "N/A"
              ? dog.Poster
              : "https://via.placeholder.com/400"
          }
          alt={dog.Title}
        />
      </div>
      <div>
        <span>{dog.Type}</span>
        <h3>{dog.Title}</h3>
      </div>
    </div>
  );
};
export default DogCard;
