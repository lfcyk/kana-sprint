import clientPromise from "../../../lib/mongodb";

export async function POST(req, { params }) {
    const client = await clientPromise;
    const db = client.db("kanaScriptDB");

    const body = await req.json();

    let toInsert = {
        "username": body.playerName,
        "country": body.country,
        "time": body.elapsedTime,
        "date": new Date(),
    }
    
    let myPost = await db.collection(body.characters).insertOne(toInsert);    

    return new Response('success posting leaderboard', {status: 200})
}