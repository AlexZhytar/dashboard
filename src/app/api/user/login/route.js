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
  
  const data = await res.json();
  
  if ( !res.ok ) {
    return NextResponse.json( data.error || [] );
  }
  
  return NextResponse.json( data || [] );
}
