import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ExerciseTable = () => {
  const [exercises, setExercises] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/workout/getExerciseSummary?page=${pageNumber}&limit=20`
      );
      setExercises(response.data.exerciseSummaries);
      setTotalPages(response.data.totalPages);
      console.log(response);
    }

    fetchData();
  }, [pageNumber]);

  return (
    <>
      <table className="table-auto w-full text-secondary divide-y divide-gray-700 flex-grow">
        <thead className="text-lg border-b border-gray-500">
          <tr className="text-left text-secondary">
            <th className="w-1/4">Exercise Name</th>
            <th className="pr-8 w-1/4">Highest Weight</th>
            <th className="w-1/4">Highest Volume</th>
            <th className="w-1/4">Most Recent Top Set</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr
              key={exercise.id}
              className="text-slate hover:bg-gray-600 cursor-pointer"
              
            >
              <td className="text-left">
                <Link
                  className="text-slate block w-full"
                  to={`/exercises/${encodeURIComponent(exercise.exerciseName)}`}
                >
                  {exercise.exerciseName}
                </Link>
              </td>
              <td className="text-left">{exercise.highestWeight}</td>
              <td className="text-left">{exercise.highestVolume}</td>
              <td className="text-left">
                {`${exercise.topSet.weight} lbs x ${exercise.topSet.reps} reps`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination flex justify-center items-center mt-4">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages} // totalPages should be fetched from the API and stored in the state
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => setPageNumber(selected + 1)} // Update the pageNumber state when a new page is clicked
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default ExerciseTable;
