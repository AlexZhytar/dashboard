import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST( req ) {
  const { token } = await req.json();
  if ( !token ) return NextResponse.json( { error: 'Missing token' }, { status: 400 } );
  
  const response = NextResponse.json( { success: true } );
  response.headers.set(
    'Set-Cookie',
    serialize( 'dash-auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 90,
      path: '/',
      sameSite: 'lax',
    } )
  );
  return response;
}