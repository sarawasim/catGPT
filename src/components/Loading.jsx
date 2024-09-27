export default function Loading() {
  return (
    <div
      class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-pink-300 rounded-full dark:text-pink-200 mb-6"
      role="status"
      aria-label="loading"
    >
      <span class="sr-only">Loading...</span>
    </div>
  )
}
