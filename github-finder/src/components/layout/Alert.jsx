import { useContext } from "react"
import AlertContext from "../../context/alert/AlertContext"
import { VscError } from "react-icons/vsc"

function Alert() {
  const { alert } = useContext(AlertContext)

  return (
    alert !== null && (
      <p className="flex items-start items-center mb-4 space-x-2">
        {alert.type === "error" && <VscError color="#EF5350" size={30} />}
        <p className="flex-1 text-base font-semibold lead-7 text-white">
          <strong>{alert.message}</strong>
        </p>
      </p>
    )
  )
}

export default Alert
