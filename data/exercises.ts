export type Exercise = {
  id: string
  lesson: string
  category: 'articles' | 'numbers' | 'alphabet' | 'greetings' | 'grammar' | 'countries' | 'routines'
  type: 'choice' | 'text' | 'listen' | 'pronounce'
  prompt: string
  answer: string
  options?: string[]
  speech?: string
  hint?: string
}

export const exercises: Exercise[] = [
  { id: 'a1', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ book', answer: 'a', options: ['a', 'an'], hint: 'Use “a” before a consonant sound.' },
  { id: 'a2', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ English book', answer: 'an', options: ['a', 'an'], hint: '“English” begins with a vowel sound.' },
  { id: 'a3', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ pen', answer: 'a', options: ['a', 'an'] },
  { id: 'a4', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ eraser', answer: 'an', options: ['a', 'an'] },
  { id: 'a5', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ tablet', answer: 'a', options: ['a', 'an'] },
  { id: 'a6', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ iPod', answer: 'an', options: ['a', 'an'] },
  { id: 'a7', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ pencil case', answer: 'a', options: ['a', 'an'] },
  { id: 'a8', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ backpack', answer: 'a', options: ['a', 'an'] },
  { id: 'a9', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ cell phone', answer: 'a', options: ['a', 'an'] },
  { id: 'a10', lesson: 'Before you start', category: 'articles', type: 'choice', prompt: '___ notebook', answer: 'a', options: ['a', 'an'] },

  { id: 'n1', lesson: 'Before you start', category: 'numbers', type: 'listen', prompt: 'Ouça e escreva o número em inglês.', answer: 'one', speech: 'one' },
  { id: 'n2', lesson: 'Before you start', category: 'numbers', type: 'listen', prompt: 'Ouça e escreva o número em inglês.', answer: 'three', speech: 'three' },
  { id: 'n3', lesson: 'Before you start', category: 'numbers', type: 'listen', prompt: 'Ouça e escreva o número em inglês.', answer: 'five', speech: 'five' },
  { id: 'n4', lesson: 'Before you start', category: 'numbers', type: 'listen', prompt: 'Ouça e escreva o número em inglês.', answer: 'seven', speech: 'seven' },
  { id: 'n5', lesson: 'Before you start', category: 'numbers', type: 'listen', prompt: 'Ouça e escreva o número em inglês.', answer: 'nine', speech: 'nine' },
  { id: 'n6', lesson: 'Before you start', category: 'numbers', type: 'choice', prompt: 'Qual número é “eight”?', answer: '8', options: ['6', '7', '8', '9'] },
  { id: 'n7', lesson: 'Before you start', category: 'numbers', type: 'choice', prompt: 'Qual número é “zero”?', answer: '0', options: ['0', '1', '2', '10'] },
  { id: 'n8', lesson: 'Before you start', category: 'numbers', type: 'pronounce', prompt: 'Fale este número em inglês: 4', answer: 'four', speech: 'four' },
  { id: 'n9', lesson: 'Before you start', category: 'numbers', type: 'pronounce', prompt: 'Fale este número em inglês: 6', answer: 'six', speech: 'six' },
  { id: 'n10', lesson: 'Before you start', category: 'numbers', type: 'pronounce', prompt: 'Fale este número em inglês: 2', answer: 'two', speech: 'two' },

  { id: 'alpha1', lesson: 'Before you start', category: 'alphabet', type: 'listen', prompt: 'Ouça a letra e digite qual foi.', answer: 'B', speech: 'B' },
  { id: 'alpha2', lesson: 'Before you start', category: 'alphabet', type: 'listen', prompt: 'Ouça a letra e digite qual foi.', answer: 'G', speech: 'G' },
  { id: 'alpha3', lesson: 'Before you start', category: 'alphabet', type: 'listen', prompt: 'Ouça a letra e digite qual foi.', answer: 'J', speech: 'J' },
  { id: 'alpha4', lesson: 'Before you start', category: 'alphabet', type: 'pronounce', prompt: 'Soletre em inglês: COHEN', answer: 'C O H E N', speech: 'C O H E N', hint: 'No livro, o sobrenome Cohen aparece como exemplo de spelling.' },

  { id: 'g1', lesson: 'Lesson 1A', category: 'greetings', type: 'choice', prompt: 'Derek: Good morning! Ryan: ___', answer: 'Good morning, Derek!', options: ['Good morning, Derek!', 'Good night!', 'Bye!', 'No, I am not.'] },
  { id: 'g2', lesson: 'Lesson 1A', category: 'greetings', type: 'choice', prompt: 'How are you?', answer: 'Fine, thanks.', options: ['Fine, thanks.', 'Goodbye.', 'No, I don’t.', 'I am from Brazil.'] },
  { id: 'g3', lesson: 'Lesson 1A', category: 'greetings', type: 'choice', prompt: 'Well, time to go to class.', answer: 'Bye.', options: ['Bye.', 'Good morning.', 'Pretty good.', 'Yes, I do.'] },
  { id: 'g4', lesson: 'Before you start', category: 'greetings', type: 'choice', prompt: 'Nice to meet you.', answer: 'Nice to meet you too.', options: ['Nice to meet you too.', 'No, I am not.', 'Good night.', 'I study here.'] },

  { id: 'gr1', lesson: 'Lesson 1A', category: 'grammar', type: 'choice', prompt: 'Do you study here?', answer: 'Yes, I do.', options: ['Yes, I do.', 'Yes, I am.', 'Yes, you do.', 'No, I am not.'] },
  { id: 'gr2', lesson: 'Lesson 1A', category: 'grammar', type: 'choice', prompt: 'Do you work here?', answer: 'No, I don’t.', options: ['No, I don’t.', 'No, I am not.', 'No, you don’t.', 'No, I do.'] },
  { id: 'gr3', lesson: 'Workbook 1A', category: 'grammar', type: 'text', prompt: 'Transforme em pergunta: “study Spanish”', answer: 'Do you study Spanish?' },
  { id: 'gr4', lesson: 'Workbook 1A', category: 'grammar', type: 'text', prompt: 'Transforme em pergunta: “go to college”', answer: 'Do you go to college?' },
  { id: 'gr5', lesson: 'Workbook 1A', category: 'grammar', type: 'text', prompt: 'Transforme em pergunta: “like New York”', answer: 'Do you like New York?' },
  { id: 'gr6', lesson: 'Workbook 1A', category: 'grammar', type: 'text', prompt: 'Transforme em pergunta: “live in Rio de Janeiro”', answer: 'Do you live in Rio de Janeiro?' },

  { id: 'r1', lesson: 'Lesson 1A', category: 'routines', type: 'choice', prompt: 'Qual frase significa “tomar café da manhã”?', answer: 'have breakfast', options: ['have breakfast', 'watch TV', 'play sports', 'surf the net'] },
  { id: 'r2', lesson: 'Lesson 1A', category: 'routines', type: 'choice', prompt: 'Qual frase significa “navegar na internet”?', answer: 'surf the net', options: ['get up early', 'surf the net', 'have breakfast', 'play sports'] },
  { id: 'r3', lesson: 'Lesson 1A', category: 'routines', type: 'pronounce', prompt: 'Leia em voz alta: “Do you watch TV every day?”', answer: 'do you watch tv every day', speech: 'Do you watch TV every day?' },
  { id: 'r4', lesson: 'Lesson 1A', category: 'routines', type: 'pronounce', prompt: 'Leia em voz alta: “Do you play sports?”', answer: 'do you play sports', speech: 'Do you play sports?' },

  { id: 'c1', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Brazil →', answer: 'Brazilian', options: ['Brazilian', 'Argentinian', 'American', 'Spanish'] },
  { id: 'c2', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Argentina →', answer: 'Argentinian', options: ['Argentinian', 'Australian', 'Italian', 'French'] },
  { id: 'c3', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Japan →', answer: 'Japanese', options: ['Japanese', 'German', 'American', 'Canadian'] },
  { id: 'c4', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Germany →', answer: 'German', options: ['German', 'French', 'Spanish', 'Italian'] },
  { id: 'c5', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Spain →', answer: 'Spanish', options: ['Spanish', 'Italian', 'Canadian', 'Brazilian'] },
  { id: 'c6', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Are you from Brazil?', answer: 'Yes, I am.', options: ['Yes, I am.', 'Yes, I do.', 'No, I don’t.', 'Yes, you are.'] },
  { id: 'c7', lesson: 'Lesson 1B', category: 'countries', type: 'choice', prompt: 'Are you American?', answer: 'No, I am not.', options: ['No, I am not.', 'No, I don’t.', 'No, you aren’t.', 'Yes, I do.'] },
  { id: 'c8', lesson: 'Workbook 1B', category: 'countries', type: 'text', prompt: 'Desembaralhe: TRAUSALIA', answer: 'Australia' },
  { id: 'c9', lesson: 'Workbook 1B', category: 'countries', type: 'text', prompt: 'Desembaralhe: LYTIA', answer: 'Italy' },
  { id: 'c10', lesson: 'Workbook 1B', category: 'countries', type: 'text', prompt: 'Desembaralhe: NAMERG', answer: 'German' }
]

export const categoryLabels: Record<Exercise['category'], string> = {
  articles: 'A ou AN',
  numbers: 'Números',
  alphabet: 'Alfabeto',
  greetings: 'Cumprimentos',
  grammar: 'Do / Are',
  countries: 'Países',
  routines: 'Rotina',
}
