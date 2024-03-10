import clientPromise from "@/lib/mongodb";

clientPromise
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
    let hiraganaLeaderboard, katakanaLeaderboard;
    const client = await clientPromise;
    const db = client.db("kanaScriptDB");
    try {
        hiraganaLeaderboard = await db.collection("hiragana").find({}).toArray();
        katakanaLeaderboard = await db.collection("katakana").find({}).toArray();
    } catch (error) {
        return new Response(error);
    }

    hiraganaLeaderboard.sort(function(a, b){return a.time - b.time});
    katakanaLeaderboard.sort(function(a, b){return a.time - b.time});
    return new Response(JSON.stringify({hiraganaLeaderboard, katakanaLeaderboard}, null, 2), {status: 200})
}