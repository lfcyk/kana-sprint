// import Game from "../game"
import dynamic from 'next/dynamic'
const Game = dynamic(() => import("@/app/game"), { ssr: false })

function Page() {
  return (
    <Game characters={'katakana'}/>
  )
}

export default Page
