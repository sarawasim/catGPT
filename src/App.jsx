import Button from "./components/Button"
import { PaperAirplaneIcon } from "@heroicons/react/20/solid"
import { useState, useEffect, useRef } from "react"
import Loading from "./components/Loading"

function App() {
  const [value, setValue] = useState("")
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState("")
  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const getMessages = async () => {
    setIsLoading(true)
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      // const response = await fetch("http://localhost:8000/completions", options)
      const response = await fetch("/api/completions", options)
      const data = await response.json()
      setMessage(data.choices[0].message)
      inputRef.current.textContent = ""
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle("")
    inputRef.current.textContent = ""
  }

  const handleChatClick = (title) => {
    setCurrentTitle(title)
    setMessage(null)
    setValue("")
    inputRef.current.textContent = ""
  }

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ])
    }
  }, [message, currentTitle])

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  )
  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  )
  return (
    <div className="app bg-white font-sometype flex">
      {/* side bar */}
      <section className="bg-pink-100 h-dvh w-[300px] flex-col justify-between py-4 px-4 hidden sm:flex">
        <Button text="New Chat" onClick={createNewChat} />
        {/* Chat History */}
        <h2 className="text-xs text-slate-900 pt-4 pb-2">
          <strong>Chat History</strong>
        </h2>
        <ul className="h-full overflow-y-auto">
          {uniqueTitles.map((title, index) => (
            <li
              key={index}
              className="cursor-pointer py-2"
              onClick={() => handleChatClick(title)}
            >
              {title}
            </li>
          ))}
        </ul>
        {/* Bottom Nav */}
        <div>
          <p>By Sara</p>
        </div>
      </section>

      {/* main */}
      <section className="h-dvh w-full flex flex-col justify-between items-center py-4 text-center">
        <div className="flex items-center">
          <img src="images/cat.gif" alt="" className="h-24 w-auto" />

          <h1 className="text-5xl font-bold text-slate-900 tracking-wider">
            CatGPT
          </h1>
        </div>
        {/* Chat Feed */}
        <ul className="feed overflow-y-auto w-full max-w-[665px] py-10">
          {currentChat?.map((chatMessage, index) => (
            <li
              key={index}
              className={`
                ${chatMessage.role === "user" ? " text-right" : "text-left"}`}
            >
              <div>
                <p className="pb-1">
                  {chatMessage.role === "assistant" ? "🐱" : "😊"}
                </p>
                <div
                  className={`${
                    chatMessage.role === "user"
                      ? "bg-pink-100 rounded-2xl py-2 px-4 ml-32 inline-block"
                      : "bg-white"
                  }`}
                >
                  {chatMessage.content}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bottom-section w-full flex flex-col justify-center items-center">
          {isLoading && <Loading />}
          {/* Chat Input */}
          <div className="input-container relative w-full max-w-[700px] px-4">
            <div
              ref={inputRef}
              role="input"
              contentEditable={!isLoading}
              className="border border-slate-400 rounded-3xl w-full text-sm px-8 py-3 focus-visible:outline-0 shadow-md text-left"
              value={value}
              onInput={(e) => setValue(e.currentTarget.textContent)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  e.preventDefault()
                  getMessages()
                }
              }}
            />
            <PaperAirplaneIcon
              aria-hidden="true"
              className="-ml-0.5 h-8 w-8 absolute bottom-2 right-6 bg-pink-200 rounded-full p-1.5 cursor-pointer"
              onClick={getMessages}
            />
          </div>
          {/* Info */}
          <p className="text-xs text-slate-500 mt-2">
            CatGPT can make mistakes. Check important info.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App
