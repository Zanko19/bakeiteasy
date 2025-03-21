import { NextRequest, NextResponse } from 'next/server';
import { translate } from '@vitalets/google-translate-api';

export async function POST(req: NextRequest) {
  try {
    const { text, from, to } = await req.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Le texte à traduire est requis' },
        { status: 400 }
      );
    }
    
    const result = await translate(text, { 
      from: from || 'fr',
      to: to || 'en'
    });
    
    return NextResponse.json({ 
      text: result.text,
      from: from || 'fr',
      to: to || 'en'
    });
  } catch (error) {
    console.error('Erreur de traduction:', error);
    
    return NextResponse.json(
      { error: 'Erreur lors de la traduction', details: String(error) },
      { status: 500 }
    );
  }
} 