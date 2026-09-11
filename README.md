# English Essentials — iOS Style

Aplicativo web de prática de inglês inspirado no conteúdo do **Fisk Essentials 1** enviado pelo usuário.

## Conteúdo inicial

- A / AN com objetos de sala de aula
- Números 0–9, escrita, listening e pronúncia
- Alfabeto e spelling
- Cumprimentos e respostas de conversação
- Simple Present com `Do you...?`
- Atividades de rotina: breakfast, TV, sports e internet
- Países, nacionalidades e `Are you...?`
- Exercícios no estilo Workbook
- Progresso, precisão e sequência diária salvos no aparelho
- Registro opcional de tentativas no Supabase

## Interface

A interface usa padrões visuais inspirados no iOS: large title, cartões arredondados, blur/translucidez, tab bar inferior, safe areas e tipografia do sistema Apple quando disponível.

## Variáveis de ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

O app funciona sem essas variáveis usando o banco de exercícios embutido e `localStorage`. Ao configurar o Supabase, as tentativas também são registradas na tabela `practice_attempts`.

## Banco

A migration inicial está em `supabase/migrations/001_learning_analytics.sql`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Produção

```bash
npm run build
npm run start
```
