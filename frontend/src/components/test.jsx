<FieldArray name="exercises">
  {({ remove, push }) => (
    <>
      {values.exercises.map((exercise, index) => (
        <div key={index} className="flex exercise-wrapper"> 
          <div className="space-y-4 flex-grow"> 
            <div className="flex items-center space-x-4 exercise-row"> 
              <label
                          className="exercise-name-label"
                          htmlFor={`exercises.${index}.exerciseName`}
                        >
                          Exercise {index + 1}
                        </label>
                        <Autosuggest
                          suggestions={suggestions}
                          theme={{ container: "autosuggest-container" }}
                          onSuggestionsFetchRequested={({ value }) =>
                            onSuggestionsFetchRequested({ value }, values.split)
                          }
                          onSuggestionsClearRequested={
                            onSuggestionsClearRequested
                          }
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={(suggestion) => (
                            <div className="suggestion-item">{suggestion}</div>
                          )}
                          inputProps={{
                            type: "text",
                            name: `exercises.${index}.exerciseName`,
                            value: exercise.exerciseName || "",
                            onChange: (event, { newValue }) => {
                              setFieldValue(
                                `exercises.${index}.exerciseName`,
                                newValue
                              );
                            },
                            className: "h-6 exercise-input",
                          }}
                        />
              <ToggleSwitch
                name={`exercises.${index}.exerciseProgressMade`}
                checked={exercise.exerciseProgressMade}
                onChange={handleChange}
              />
            </div> 

            <FieldArray name={`exercises.${index}.exerciseSets`}>
              {({ remove: removeSet, push: pushSet }) => (
                <>
                  {exercise.exerciseSets.map((set, setIndex) => (
                    <div
                      key={setIndex}
                      className="flex items-center space-x-4 set-wrapper"
                    > {/* Opening tag for set-wrapper div */}
                      <span className="set-label">
                                    Set {setIndex + 1}
                                  </span>
                                  <label
                                    htmlFor={`exercises.${index}.exerciseSets.${setIndex}.weight`}
                                    className="weight-label"
                                  >
                                    Weight
                                  </label>
                                  <input
                                    type="number"
                                    name={`exercises.${index}.exerciseSets.${setIndex}.weight`}
                                    value={set.weight}
                                    onChange={handleChange}
                                    className="w-20 weight-input"
                                  />
                                  <label
                                    htmlFor={`exercises.${index}.exerciseSets.${setIndex}.reps`}
                                    className="reps-label"
                                  >
                                    Reps
                                  </label>
                                  <input
                                    type="number"
                                    name={`exercises.${index}.exerciseSets.${setIndex}.reps`}
                                    value={set.reps}
                                    onChange={handleChange}
                                    className="w-20 reps-input"
                                  />
                      <button
                        type="button"
                        onClick={() => removeSet(setIndex)}
                        className="text-red-600 delete-set-btn"
                      >
                        <FiTrash2 />
                      </button>
                    </div> 
                  ))}
                  <button
                    type="button"
                    onClick={() => pushSet({ weight: "", reps: "" })}
                    className="add-set-btn"
                  >
                    <AiOutlinePlus size={15} />
                  </button>
                </>
              )}
            </FieldArray>
          </div>
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-600 delete-exercise-btn"
          >
            <FiTrash2 />
          </button>
        </div> 
      ))}

      <div className="flex items-center add-exercise-wrapper"> 
        <button
          type="button"
          onClick={() =>
            push({
              exerciseName: "",
              exerciseSets: [],
              exerciseProgressMade: false,
            })
          }
          className="add-exercise-btn"
        >
          <AiOutlinePlus />
        </button>
      </div> 
    </>
  )}
</FieldArray>
