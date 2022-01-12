import { useState, useEffect, useRef } from "react"

function Todo() {
  const [loading, setLoading] = useState(true)
  const [todo, setTodo] = useState({})

  const isMounted = useRef(true)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          if (isMounted.current) {
            setTodo(data)
            setLoading(false)
          }
        }, 3000)
      })

    // runs when component is unmounted
    return () => {
      console.log("dog log")
      isMounted.current = false
    }
  }, [isMounted])

  return <div>{loading ? <h3>loading...</h3> : <h3>{todo.title}</h3>}</div>
}

export default Todo
