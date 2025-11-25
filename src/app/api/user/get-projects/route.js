import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from "@/utils";

export async function GET( req ) {
  const cookieStore = await cookies();
  const token = cookieStore.get( 'dash-auth' )?.value;
  const { searchParams } = new URL( req.url );
  const employeeId = searchParams.get( 'employee_id' );
  console.log( employeeId )
  
  if ( !token ) {
    return NextResponse.json( { error: 'Missing token or team_id' }, { status: 400 } );
  }
  
  const res = await fetch( api.getUserProjects( `${ employeeId }` ), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ token }`,
      'Content-Type': 'application/json',
    },
  } );
  
  if ( !res.ok ) {
    return NextResponse.json( { error: `ClickUp API error ${ res.status }` }, { status: res.status } );
  }
  
  const data = await res.json();
  return NextResponse.json( data || [] );
}
