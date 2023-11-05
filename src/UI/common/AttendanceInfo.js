import "../scssutils/commonStyles.scss";

export const AbsentSign = () => {
  return (
    <button className="absentSign" disabled>
      Ab.
    </button>
  );
};
export const PresentSign = () => {
  return (
    <button className="presentSign" disabled>
      Pr.
    </button>
  );
};
export const NoInfoSign = () => {
  return (
    <button className="noInfoSign" disabled>
      N/I
    </button>
  );
};
