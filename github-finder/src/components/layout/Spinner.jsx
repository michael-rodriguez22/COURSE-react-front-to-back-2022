import spinner from "./assets/spinner.gif"

function Spinner() {
  return (
    <div className="w-100 mt-20">
      <img
        src={spinner}
        alt="loading..."
        width={180}
        className="text-center mx-auto"
      />
      <h1 className="text-center font-bold text-xl mt-10">loading...</h1>
    </div>
  )
}

export default Spinner
