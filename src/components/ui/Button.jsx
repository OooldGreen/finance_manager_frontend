import { useNavigate } from "react-router-dom"
import { CloseIcon } from "./Icon"

export const CloseButton = () => {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate(-1)
  }

  return (
    <button onClick={handleClose} type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-white/10 text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20 disabled:opacity-50 disabled:pointer-events-none" aria-label="Close" data-hs-overlay="#hs-bg-gray-on-hover-cards" data-hs-remove-element="#hs-ai-modal">
      <span className="sr-only">Close</span>
      <CloseIcon/>
    </button>
)}