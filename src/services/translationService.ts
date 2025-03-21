/**
 * Service de traduction pour l'application
 * Utilise notre propre API qui communique avec Google Translate
 */

/**
 * Traduit un texte du français vers l'anglais
 */
export async function translateToEnglish(text: string): Promise<string> {
  if (!text || text.trim() === '') {
    return '';
  }
  
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text, 
        from: 'fr', 
        to: 'en' 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.text;
  } catch (error) {
    console.error('Erreur lors de la traduction vers l\'anglais:', error);
    return text; // En cas d'erreur, retourner le texte original
  }
}

/**
 * Traduit un texte de l'anglais vers le français
 */
export async function translateToFrench(text: string): Promise<string> {
  if (!text || text.trim() === '') {
    return '';
  }
  
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text, 
        from: 'en', 
        to: 'fr' 
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data.text;
  } catch (error) {
    console.error('Erreur lors de la traduction vers le français:', error);
    return text; // En cas d'erreur, retourner le texte original
  }
}

/**
 * Traduit un objet complet de l'anglais vers le français
 * en ne traduisant que les propriétés spécifiées
 */
export async function translateObjectToFrench<T>(
  obj: T, 
  propertiesToTranslate: (keyof T)[]
): Promise<T> {
  if (!obj) {
    return obj;
  }
  
  // Créer une copie de l'objet
  const translatedObj = { ...obj };
  
  // Traduire chaque propriété spécifiée
  for (const prop of propertiesToTranslate) {
    if (typeof translatedObj[prop] === 'string') {
      // @ts-expect-error - TS ne peut pas déterminer que la propriété est une chaîne
      translatedObj[prop] = await translateToFrench(translatedObj[prop]);
    }
  }
  
  return translatedObj;
}

/**
 * Traduit un tableau d'objets de l'anglais vers le français
 */
export async function translateArrayToFrench<T>(
  array: T[], 
  propertiesToTranslate: (keyof T)[]
): Promise<T[]> {
  if (!array || array.length === 0) {
    return array;
  }
  
  // Traduire chaque objet du tableau
  const translatedItems = await Promise.all(
    array.map(item => translateObjectToFrench(item, propertiesToTranslate))
  );
  
  return translatedItems;
} 