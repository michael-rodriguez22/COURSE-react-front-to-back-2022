import useFetch from "../hooks/useFetch"

function CustomHookExample1() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    {}
  )

  if (loading) return <h3>loading...</h3>

  return (
    <div>
      {data.map(post => (
        <h3 key={post.id} className="mb-5">
          {post.title}
        </h3>
      ))}
    </div>
  )
}

export default CustomHookExample1
