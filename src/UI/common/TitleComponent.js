import React from "react";

export const TitleComponent = ({ child1, child2 }) => {
  return (
    <section className="title">
      <div className="title-left">
        <h1>{child1}</h1>
      </div>
      <div className="title-right">
        <h1>{child2}</h1>
      </div>
    </section>
  );
};
