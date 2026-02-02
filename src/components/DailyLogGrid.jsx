import DailyLogCard from "./DailyLogCard";


const DailyLogGrid = ({ logs }) => {
  return (
    <>
      {logs.map((day) => (
        <DailyLogCard key={day.day_number} day={day} />
      ))}
    </>
  );
};

export default DailyLogGrid;
