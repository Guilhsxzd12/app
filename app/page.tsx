'use client'

import { useEffect, useMemo, useState } from 'react'
import { categoryLabels, exercises, Exercise } from '@/data/exercises'
import { logAttempt } from '@/lib/supabase'

type Tab = 'home' | 'practice' | 'progress'

type Stats = {
  total: number
  correct: number
  streak: number
  lastDay: string
  byCategory: Record<string, { total: number; correct: number }>
}

const emptyStats: Stats = {
  total: 0,
  correct: 0,
  streak: 0,
  lastDay: '',
  byCategory: {},
}

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[?.!,]/g, '')
    .replace(/\s+/g, ' ')
    .replace('’', "'")
}

function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.86
  window.speechSynthesis.speak(utterance)
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function yesterdayKey() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export default function Home() {
  const [tab, setTab] = useState<Tab>('home')
  const [category, setCategory] = useState<Exercise['category']>('articles')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [speechResult, setSpeechResult] = useState('')
  const [stats, setStats] = useState<Stats>(emptyStats)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('english-essentials-stats')
    if (stored) {
      try {
        setStats(JSON.parse(stored))
      } catch {
        setStats(emptyStats)
      }
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem('english-essentials-stats', JSON.stringify(stats))
  }, [stats, hydrated])

  const filtered = useMemo(() => exercises.filter((item) => item.category === category), [category])
  const current = filtered[index % filtered.length]
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0

  function selectCategory(next: Exercise['category']) {
    setCategory(next)
    setIndex(0)
    setAnswer('')
    setFeedback(null)
    setSpeechResult('')
    setTab('practice')
  }

  function updateStats(correct: boolean) {
    const day = todayKey()
    setStats((old) => {
      const currentCategory = old.byCategory[category] ?? { total: 0, correct: 0 }
      let streak = old.streak
      if (old.lastDay !== day) {
        if (!old.lastDay) streak = 1
        else if (old.lastDay === yesterdayKey()) streak += 1
        else streak = 1
      }
      return {
        total: old.total + 1,
        correct: old.correct + (correct ? 1 : 0),
        streak,
        lastDay: day,
        byCategory: {
          ...old.byCategory,
          [category]: {
            total: currentCategory.total + 1,
            correct: currentCategory.correct + (correct ? 1 : 0),
          },
        },
      }
    })
  }

  async function submit(value = answer) {
    if (!current || feedback) return
    const correct = normalize(value) === normalize(current.answer)
    setFeedback(correct ? 'correct' : 'wrong')
    updateStats(correct)
    void logAttempt({ exerciseId: current.id, category: current.category, correct, answer: value })
  }

  function next() {
    setIndex((i) => (i + 1) % filtered.length)
    setAnswer('')
    setFeedback(null)
    setSpeechResult('')
  }

  function listenForPronunciation() {
    if (typeof window === 'undefined') return
    const SpeechRecognitionCtor = (window as unknown as {
      SpeechRecognition?: new () => any
      webkitSpeechRecognition?: new () => any
    }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => any }).webkitSpeechRecognition

    if (!SpeechRecognitionCtor) {
      setSpeechResult('Seu navegador não liberou reconhecimento de voz. Use “Ouvir modelo” e repita em voz alta.')
      return
    }

    const recognition = new SpeechRecognitionCtor()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = (event: any) => {
      const heard = event.results?.[0]?.[0]?.transcript ?? ''
      setAnswer(heard)
      setSpeechResult(`Entendi: “${heard}”`)
      submit(heard)
    }
    recognition.onerror = () => setSpeechResult('Não consegui ouvir. Tente novamente mais perto do microfone.')
    recognition.start()
  }

  const categories = Object.keys(categoryLabels) as Exercise['category'][]

  return (
    <main className="app-shell">
      <div className="status-space" />
      <header className="topbar">
        <div>
          <p className="eyebrow">ESSENTIALS 1</p>
          <h1>{tab === 'home' ? 'English' : tab === 'practice' ? categoryLabels[category] : 'Progresso'}</h1>
        </div>
        <button className="avatar" aria-label="Perfil">G</button>
      </header>

      <section className="content">
        {tab === 'home' && (
          <>
            <div className="hero-card">
              <div>
                <span className="pill">Meta de hoje</span>
                <h2>10 minutos de prática</h2>
                <p>Treinos rápidos usando o conteúdo do seu livro: vocabulário, conversação, números, gramática e pronúncia.</p>
              </div>
              <div className="ring" style={{ '--progress': `${accuracy * 3.6}deg` } as React.CSSProperties}>
                <div><strong>{accuracy}%</strong><span>acertos</span></div>
              </div>
            </div>

            <div className="section-title"><h3>Praticar agora</h3><span>{exercises.length} exercícios</span></div>
            <div className="lesson-grid">
              {categories.map((key) => {
                const count = exercises.filter((x) => x.category === key).length
                const item = stats.byCategory[key]
                const pct = item?.total ? Math.round((item.correct / item.total) * 100) : 0
                const icons: Record<Exercise['category'], string> = {
                  articles: 'Aa', numbers: '123', alphabet: 'ABC', greetings: 'Hi!', grammar: 'Do?', countries: '🌎', routines: '☀️',
                }
                return (
                  <button key={key} className="lesson-card" onClick={() => selectCategory(key)}>
                    <span className={`lesson-icon ${key}`}>{icons[key]}</span>
                    <strong>{categoryLabels[key]}</strong>
                    <small>{count} exercícios</small>
                    <div className="mini-progress"><span style={{ width: `${pct}%` }} /></div>
                  </button>
                )
              })}
            </div>

            <div className="section-title"><h3>Baseado no livro</h3><span>Lesson 1</span></div>
            <div className="ios-list">
              <div className="list-row"><span className="list-icon">👋</span><div><strong>Getting to know you</strong><small>Greetings, How are you?, Do you...?</small></div><span>›</span></div>
              <div className="list-row"><span className="list-icon">🌍</span><div><strong>Are you from New York?</strong><small>Countries, nationalities, Are you...?</small></div><span>›</span></div>
              <div className="list-row"><span className="list-icon">📘</span><div><strong>Workbook</strong><small>Questions, routines e revisão</small></div><span>›</span></div>
            </div>
          </>
        )}

        {tab === 'practice' && current && (
          <div className="practice-wrap">
            <div className="practice-meta">
              <span>{current.lesson}</span>
              <span>{index + 1} / {filtered.length}</span>
            </div>
            <div className="progress-track"><span style={{ width: `${((index + 1) / filtered.length) * 100}%` }} /></div>

            <div className={`question-card ${feedback ?? ''}`}>
              <span className="question-type">
                {current.type === 'listen' ? '🎧 Listening' : current.type === 'pronounce' ? '🎙️ Pronúncia' : current.type === 'choice' ? '✓ Escolha' : '⌨️ Escrita'}
              </span>
              <h2>{current.prompt}</h2>

              {(current.type === 'listen' || current.type === 'pronounce') && (
                <button className="listen-button" onClick={() => speak(current.speech || current.answer)}>
                  <span>🔊</span> Ouvir modelo
                </button>
              )}

              {current.type === 'choice' && current.options && (
                <div className="options">
                  {current.options.map((option) => (
                    <button
                      key={option}
                      className={answer === option ? 'selected' : ''}
                      disabled={!!feedback}
                      onClick={() => { setAnswer(option); if (!feedback) setTimeout(() => submit(option), 80) }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {(current.type === 'text' || current.type === 'listen') && (
                <div className="answer-area">
                  <input
                    value={answer}
                    disabled={!!feedback}
                    placeholder="Digite sua resposta"
                    autoCapitalize="none"
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                  />
                  {!feedback && <button className="primary" disabled={!answer.trim()} onClick={() => submit()}>Confirmar</button>}
                </div>
              )}

              {current.type === 'pronounce' && (
                <div className="answer-area">
                  {!feedback && <button className="primary mic" onClick={listenForPronunciation}>🎙️ Falar agora</button>}
                  {speechResult && <p className="speech-result">{speechResult}</p>}
                </div>
              )}

              {feedback && (
                <div className={`feedback ${feedback}`}>
                  <strong>{feedback === 'correct' ? 'Correto! 🎉' : 'Quase lá'}</strong>
                  {feedback === 'wrong' && <p>Resposta: <b>{current.answer}</b></p>}
                  {current.hint && <p>{current.hint}</p>}
                  <button className="primary" onClick={next}>Próximo</button>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'progress' && (
          <>
            <div className="stats-grid">
              <div className="stat-card"><span>🔥</span><strong>{stats.streak}</strong><small>dias seguidos</small></div>
              <div className="stat-card"><span>✅</span><strong>{stats.correct}</strong><small>acertos</small></div>
              <div className="stat-card"><span>🎯</span><strong>{accuracy}%</strong><small>precisão</small></div>
            </div>
            <div className="section-title"><h3>Por assunto</h3><span>{stats.total} respostas</span></div>
            <div className="ios-list progress-list">
              {categories.map((key) => {
                const item = stats.byCategory[key] ?? { total: 0, correct: 0 }
                const pct = item.total ? Math.round((item.correct / item.total) * 100) : 0
                return (
                  <div className="progress-row" key={key}>
                    <div><strong>{categoryLabels[key]}</strong><small>{item.correct}/{item.total} corretas</small></div>
                    <div className="progress-number">{pct}%</div>
                  </div>
                )
              })}
            </div>
            <button className="reset" onClick={() => setStats(emptyStats)}>Zerar progresso deste aparelho</button>
          </>
        )}
      </section>

      <nav className="tabbar" aria-label="Navegação principal">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}><span>⌂</span><small>Início</small></button>
        <button className={tab === 'practice' ? 'active' : ''} onClick={() => setTab('practice')}><span>◉</span><small>Praticar</small></button>
        <button className={tab === 'progress' ? 'active' : ''} onClick={() => setTab('progress')}><span>▥</span><small>Progresso</small></button>
      </nav>
    </main>
  )
}
