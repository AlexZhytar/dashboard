import { NextResponse } from 'next/server';
import { api } from '@/utils';

export async function POST( req ) {
  const body = await req.json();
  const res = await fetch( api.login(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify( body ),
  } );
  
  if ( !res.ok ) {
    return NextResponse.json( { error: `Auth API error ${ res.status }` }, { status: res.status } );
  }
  
  const data = await res.json();
  return NextResponse.json( data || [] );
}
