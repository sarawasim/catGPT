import { PencilSquareIcon } from "@heroicons/react/20/solid"

export default function Button({ text, onClick }) {
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md bg-white px-10 py-1.5 text-sm font-semibold text-black border border-slate-400 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
        onClick={onClick}
      >
        <PencilSquareIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
        {text}
      </button>
    </>
  )
}
