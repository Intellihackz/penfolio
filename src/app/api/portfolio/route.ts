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
    const { userId, ...workData } = body;

    let user = await User.findOne({ clerk_id: userId });

    if (!user) {
      return new Response("No such user", { status: 404 });
    } else {
      const existingPortfolio = await Portfolio.findOne({ user: user._id });

      if (existingPortfolio) {
        // If a portfolio already exists, add the new work to its `works` array
        existingPortfolio.works.push(workData);
        await existingPortfolio.save();
        return NextResponse.json(existingPortfolio);
      } else {
        // If no portfolio exists, create a new one with the new work
        const portfolio = new Portfolio({
          user: user._id,
          works: [workData],
        });
        user.portfolios.push(portfolio);
        await user.save();
        return NextResponse.json(await portfolio.save());
      }
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message });
  }
}
