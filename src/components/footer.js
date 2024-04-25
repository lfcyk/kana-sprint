import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 flex flex-row justify-center items-center gap-2 mx-auto w-full select-none p-1 bg-gray-200">
        <div>
            Copyright ©	{new Date().getFullYear()} lfcyk
        </div>
        <a href="https://github.com/lfcyk" target="_blank">
            <FaGithub />
        </a>
    </div>
  )
}

export default Footer
