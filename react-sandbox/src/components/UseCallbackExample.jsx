import React, { useState, useCallback } from "react"

function UseCallbackExample() {
  const [tasks, setTasks] = useState([])

  const addTask = useCallback(() => {
    setTasks(prevState => [...prevState, "dog task"])
  }, [setTasks])

  return (
    <div>
      <Button addTask={addTask} />
      {tasks.map((task, index) => (
        <p key={index}>{task}</p>
      ))}
    </div>
  )
}

// useCallback hook memoizes this entire button component, such that it won't rerender every time we setTasks

const Button = React.memo(({ addTask }) => {
  console.log("button rendered")
  return (
    <div>
      <button onClick={addTask} className="btn btn-primary mb-3">
        Add Task
      </button>
    </div>
  )
})

export default UseCallbackExample
