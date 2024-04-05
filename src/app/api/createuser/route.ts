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
      return NextResponse.json(
        { error: "Failed to connect to database" },
        { status: 500 }
      );
    }

    // Parse the request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to parse request body" },
        { status: 400 }
      );
    }

    const { username, clerk_id, bio, imageUrl } = body;

    // Validate data
    if (!username || !clerk_id || !bio || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user with the same clerk_id already exists
    const existingUser = await User.findOne({ clerk_id });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this Clerk ID already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    let newUser;
    try {
      newUser = new User({ username, clerk_id, bio, imageUrl });
      await newUser.save();
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Return the new user as JSON
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
