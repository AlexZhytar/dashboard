import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { config } from "@/constants";

export async function GET( req ) {
  const cookieStore = await cookies();
  const token = cookieStore.get( 'auth_token' )?.value;
  
  if ( !token ) {
    return NextResponse.json( { error: 'Missing token or team_id' }, { status: 400 } );
  }
  
  const res = await fetch( config.API_LOGIN, {
    method: 'GET',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  } );
  
  if ( !res.ok ) {
    return NextResponse.json( { error: `Auth API error ${ res.status }` }, { status: res.status } );
  }
  
  const data = await res.json();
  return NextResponse.json( data || [] );
}
