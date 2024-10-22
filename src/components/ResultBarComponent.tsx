interface Props {
  score: number;
  count: number;
  percentage: number;
}

const ResultBarComponent = ({ score, percentage, count }: Props) => {
  const totalWidth = 15; // rem
  const dynamicWidth = `${percentage * totalWidth}rem`;
  return (
    <div className="bar-parent">
      <div className="bar-score">{score}</div>
      {count > 0 && (
        <div
          className="bar-percentage themed-invert"
          style={{ width: dynamicWidth }}
        >
          {count}
        </div>
      )}
    </div>
  );
};

export default ResultBarComponent;
