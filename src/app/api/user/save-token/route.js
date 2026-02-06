import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST( req ) {
  const { token, expires_at } = await req.json();
  
  if ( !token ) {
    return NextResponse.json( { error: "Missing token" }, { status: 400 } );
  }
  
  const expiresDate = expires_at ? new Date( expires_at ) : null;
  
  let maxAge;
  if ( expiresDate && !Number.isNaN( expiresDate.getTime() ) ) {
    maxAge = Math.floor( (expiresDate.getTime() - Date.now()) / 1000 );
    if ( maxAge < 0 ) maxAge = 0;
  }
  else {
    maxAge = 60 * 60 * 24 * 90;
  }
  
  const response = NextResponse.json( { success: true } );
  
  response.headers.set(
    "Set-Cookie",
    serialize( "dash-auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge,
      ...(expiresDate && !Number.isNaN( expiresDate.getTime() )
        ? { expires: expiresDate }
        : {}),
    } )
  );
  
  return response;
}