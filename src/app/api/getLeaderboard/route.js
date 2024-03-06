import clientPromise from "@/lib/mongodb";

clientPromise
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
    const client = await clientPromise;
    const db = client.db("kanaScriptDB");
    const hiraganaLeaderboard = await db.collection("hiragana").find({}).toArray();
    const katakanaLeaderboard = await db.collection("katakana").find({}).toArray();

    return new Response(JSON.stringify({hiraganaLeaderboard, katakanaLeaderboard}, null, 2), {status: 200})
}