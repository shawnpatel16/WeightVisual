import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'
import axios from "axios";
import ReactPaginate from "react-paginate";


const ExerciseTable = () => {
  const [exercises, setExercises] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
              `/api/workout/getExerciseSummary?page=${pageNumber}&limit=20`
            );
          setExercises(response.data.exerciseSummaries)
          setTotalPages(response.data.totalPages)
            console.log(response)
        }
        
       fetchData(); 
    }, 
        
        [pageNumber])
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Exercise Name</th>
            <th>Highest Weight</th>
            <th>Highest Volume</th>
            <th>Most Recent Top Set</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id}>
              <td>
                <Link
                  to={`/exercises/${encodeURIComponent(
                    exercise.exerciseName
                  )}`}
                >
                  {exercise.exerciseName}
                </Link>
              </td>
              <td>{exercise.highestWeight}</td>
              <td>{exercise.highestVolume}</td>
              <td>{`${exercise.topSet.weight} lbs x ${exercise.topSet.reps} reps`}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </>
  );
};

export default ExerciseTable;
