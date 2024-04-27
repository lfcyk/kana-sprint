import dynamic from 'next/dynamic'
const Leaderboard = dynamic(() => import("@/app/leaderboard/leaderboard"), { ssr: false })

export default function Page() {
  return (
    <>
      <Leaderboard/>
    </>
  )
}
