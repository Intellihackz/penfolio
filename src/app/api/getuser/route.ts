import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";
import Portfolio from "../../../models/Portfolio";
import User from "../../../models/User";

export async function POST(request: Request) {
  try {
    // Connect to the database
    try {
      await dbConnect();
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to connect to database" });
    }

    // parse the body request to get the following from the body

    const body = await request.json();
    const { userId } = body;

    let user = await User.findOne({ clerk_id: userId });

    if (!user) {
      return new Response("No such user", { status: 404 });
    } else {
      // Find the portfolios associated with the user
      const portfolios = await Portfolio.find({ user: user._id });

      return NextResponse.json(portfolios);
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message });
  }
}
