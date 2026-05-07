import { useState, useMemo } from 'react';
import { 
  Sparkles, ArrowRight, Printer, Send, Brain, 
  MessageSquare, Rocket, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function CareerCompetenciesApp() {
  const [step, setStep] = useState<'welcome' | 'user-info' | 'test' | 'result'>('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ Riflessione: 0, Comunicazione: 0, Azione: 0 });

  const questions = [
    { id: 1, text: "Riflettere su cosa ritengo davvero importante nella mia vita professionale", dim: "Riflessione" },
    { id: 2, text: "Identificare i valori che guidano le mie scelte di carriera", dim: "Riflessione" },
    { id: 3, text: "Analizzare onestamente i miei punti di forza e le mie fragilità", dim: "Riflessione" },
    { id: 4, text: "Trasformare le mie passioni in opportunità concrete", dim: "Riflessione" },
    { id: 5, text: "Spiegare chiaramente agli altri le mie competenze e il mio valore", dim: "Comunicazione" },
    { id: 6, text: "Presentare i miei successi in modo professionale e convincente", dim: "Comunicazione" },
    { id: 7, text: "Creare e nutrire una rete di contatti utili per la mia crescita", dim: "Comunicazione" },
    { id: 8, text: "Chiedere e accogliere feedback per migliorare costantemente", dim: "Comunicazione" },
    { id: 9, text: "Cercare nuove sfide per non smettere mai di imparare", dim: "Azione" },
    { id: 10, text: "Pianificare passi concreti per raggiungere i miei obiettivi", dim: "Azione" },
    { id: 11, text: "Esplorare attivamente nuove strade nel mercato del lavoro", dim: "Azione" },
    { id: 12, text: "Cogliere al volo un'opportunità quando si presenta", dim: "Azione" },
    { id: 13, text: "Adattare i miei piani se il contesto lavorativo cambia improvvisamente", dim: "Azione" },
    { id: 14, text: "Coltivare relazioni con persone che stimolano la mia carriera", dim: "Comunicazione" },
    { id: 15, text: "Capire come il mio lavoro di oggi costruisce i miei sogni di domani", dim: "Riflessione" },
    { id: 16, text: "Trovare strade creative per superare gli intoppi professionali", dim: "Azione" },
    { id: 17, text: "Promuovere le mie idee con sicurezza all'interno di un team", dim: "Comunicazione" },
    { id: 18, text: "Verificare periodicamente se sono sulla strada giusta", dim: "Azione" },
    { id: 19, text: "Imparare dalle esperienze altrui per allargare i miei orizzonti", dim: "Comunicazione" },
    { id: 20, text: "Individuare quali nuove abilità mi serviranno nei prossimi anni", dim: "Riflessione" },
    { id: 21, text: "Cambiare con coraggio ciò che non mi soddisfa più nel lavoro", dim: "Azione" }
  ];

  const profiles: any = {
    Riflessione: {
      title: "Il Pensatore Strategico",
      desc: "Hai una straordinaria capacità di guardarti dentro. Non lasci nulla al caso: ogni tua mossa nasce da una profonda consapevolezza dei tuoi valori. Sei la bussola di te stesso, e questo ti rende solido anche nei momenti di incertezza.",
      tip: "Il tuo prossimo passo? Prova a trasformare queste riflessioni in azioni ancora più veloci per non restare troppo tempo nella fase di analisi!",
      icon: <Brain />,
      color: "#9333ea"
    },
    Comunicazione: {
      title: "Il Connettore di Valore",
      desc: "La tua forza è nelle relazioni e nel modo in cui sai raccontarti. Sai che il lavoro è fatto di persone e sai come farti apprezzare. La tua rete è la tua vera ricchezza e sai usarla con intelligenza e autenticità.",
      tip: "Continua così! Prova a usare questa tua dote per fare da mentor a qualcuno: insegnare agli altri consoliderà ancora di più il tuo prestigio.",
      icon: <MessageSquare />,
      color: "#d946ef"
    },
    Azione: {
      title: "Il Motore del Cambiamento",
      desc: "Sei pura energia pragmatica. Dove gli altri vedono problemi, tu vedi task da smarcare. La tua proattività è contagiosa e la tua capacità di adattarti ai cambiamenti ti rende una risorsa indispensabile in ogni contesto moderno.",
      tip: "Ricordati ogni tanto di fermarti a festeggiare i traguardi raggiunti prima di tuffarti nella prossima sfida. Ti aiuterà a mantenere alta l'energia a lungo termine!",
      icon: <Rocket />,
      color: "#4f46e5"
    }
  };

  const handleAnswer = (val: number) => {
    const dim = questions[currentIdx].dim;
    setScores(prev => ({ ...prev, [dim]: prev[dim] + val }));
    if (currentIdx < questions.length - 1) setCurrentIdx(currentIdx + 1);
    else setStep('result');
  };

  const dominant = useMemo(() => {
    return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  }, [scores, step]);

  const sendEmail = () => {
    const subject = encodeURIComponent(`Report Career Competencies - ${userData.name}`);
    const body = encodeURIComponent(
      `Ciao ${userData.name}!\n\nEcco i risultati del tuo test sulle competenze di carriera (Akkermans):\n\n` +
      `PROFILO DOMINANTE: ${profiles[dominant].title}\n` +
      `${profiles[dominant].desc}\n\n` +
      `CONSIGLIO PER TE: ${profiles[dominant].tip}\n\n` +
      `Continua a investire sul tuo talento!`
    );
    window.location.href = `mailto:${userData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="app-wrapper">
      <style>{`
        .app-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #FDFBFE; font-family: 'Segoe UI', Roboto, sans-serif; padding: 20px; }
        .card { max-width: 750px; width: 100%; background: white; border-radius: 45px; box-shadow: 0 40px 80px rgba(112,26,117,0.12); overflow: hidden; border: 1px solid #f3e8ff; }
        .content { padding: 50px; }
        .icon-header { background: #701a75; color: white; padding: 25px; border-radius: 28px; display: inline-flex; margin-bottom: 30px; box-shadow: 0 20px 40px rgba(112,26,117,0.2); rotate: 2deg; }
        h1 { color: #0f172a; font-size: 48px; font-weight: 900; margin: 0; letter-spacing: -2px; line-height: 1; }
        .text-accent { color: #701a75; }
        .subtitle { color: #64748b; font-size: 19px; margin: 25px 0 45px; line-height: 1.6; }
        .btn-main { background: #1e293b; color: white; width: 100%; padding: 22px; border-radius: 22px; font-weight: 800; font-size: 18px; border: none; cursor: pointer; transition: all 0.3s; }
        .btn-main:hover { background: #701a75; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .input-group { margin-bottom: 20px; text-align: left; }
        .input-label { display: block; margin-bottom: 8px; font-weight: 700; color: #475569; font-size: 14px; margin-left: 10px; }
        .input-field { width: 100%; padding: 20px; background: #f8fafc; border: 2px solid transparent; border-radius: 22px; font-size: 16px; outline: none; box-sizing: border-box; }
        .input-field:focus { border-color: #e9d5ff; background: white; }
        .likert-grid { display: grid; gap: 12px; margin-top: 35px; }
        .likert-btn { width: 100%; text-align: left; padding: 22px; background: white; border: 2px solid #f1f5f9; border-radius: 22px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: space-between; }
        .likert-btn:hover { border-color: #701a75; background: #faf5ff; transform: scale(1.01); }
        .likert-btn span { font-weight: 700; color: #334155; font-size: 17px; }
        .progress-container { height: 8px; background: #f1f5f9; width: 100%; }
        .progress-bar { height: 100%; background: linear-gradient(90deg, #701a75, #d946ef); transition: width 0.4s ease; }
        .result-box { background: #0f172a; color: white; padding: 45px; border-radius: 40px; margin: 30px 0; text-align: left; position: relative; overflow: hidden; }
        .result-box::after { content: ''; position: absolute; top: -50%; right: -50%; width: 100%; height: 100%; background: radial-gradient(circle, rgba(217,70,239,0.1) 0%, transparent 70%); }
        .tip-box { background: #f5f3ff; border-left: 5px solid #701a75; padding: 20px; border-radius: 15px; color: #4c1d95; font-style: italic; margin-top: 20px; text-align: left; }
        @media print { .no-print { display: none !important; } .card { box-shadow: none; border: none; } }
      `}</style>

      <div className="card">
        {step === 'test' && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${((currentIdx + 1) / 21) * 100}%` }}></div>
          </div>
        )}

        <div className="content">
          {step === 'welcome' && (
            <div style={{textAlign: 'center'}}>
              <div className="icon-header"><Sparkles size={45} /></div>
              <h1>Career<br/><span className="text-accent">Competencies</span></h1>
              <p className="subtitle">Scopri il tuo profilo di carriera con il modello scientifico Akkermans. Un viaggio di 2 minuti per sbloccare il tuo potenziale.</p>
              <button onClick={() => setStep('user-info')} className="btn-main">Comincia l'Analisi</button>
            </div>
          )}

          {step === 'user-info' && (
            <div style={{textAlign: 'center'}}>
              <h2 style={{fontSize: '36px', fontWeight: '900', letterSpacing: '-1px'}}>Piacere di conoscerti!</h2>
              <p className="subtitle">Inserisci i tuoi riferimenti per ricevere i risultati personalizzati.</p>
              <div className="input-group">
                <label className="input-label">Come ti chiami?</label>
                <input type="text" placeholder="Es. Mario Rossi" className="input-field" value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">La tua email migliore</label>
                <input type="email" placeholder="mario.rossi@esempio.it" className="input-field" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})} />
              </div>
              <button disabled={!userData.name || !userData.email} onClick={() => setStep('test')} className="btn-main" style={{opacity: !userData.name || !userData.email ? 0.3 : 1, marginTop: '20px'}}>Vai alle Domande</button>
            </div>
          )}

          {step === 'test' && (
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <span style={{color: '#701a75', fontWeight: '900', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'}}>Valutazione Competenze</span>
                <span style={{color: '#cbd5e1', fontWeight: 'bold'}}>{currentIdx + 1} / 21</span>
              </div>
              <h2 style={{fontSize: '30px', fontWeight: '800', lineHeight: '1.2', color: '#0f172a'}}>In che misura ti senti capace di <span style={{color: '#701a75'}}>{questions[currentIdx].text}</span>?</h2>
              
              <div className="likert-grid">
                {[
                  {l: "Ancora da sviluppare", d: "Sento di dover ancora acquisire questa capacità"},
                  {l: "In fase di crescita", d: "La sto praticando ma non sono ancora costante"},
                  {l: "Competenza solida", d: "Mi sento sicuro e la applico regolarmente"},
                  {l: "Punto di forza", d: "È una dote naturale che applico con successo"}
                ].map((choice, i) => (
                  <button key={i} onClick={() => handleAnswer(i + 1)} className="likert-btn">
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                      <span>{choice.l}</span>
                      <small style={{color: '#94a3b8', fontWeight: '500'}}>{choice.d}</small>
                    </div>
                    <ChevronRight size={22} color="#701a75" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'result' && (
            <div style={{textAlign: 'center'}}>
              <div style={{background: '#f0fdf4', width: '80px', height: '80px', borderRadius: '100%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 20px', color: '#22c55e'}}>
                <CheckCircle2 size={40} style={{margin: '0 auto'}} />
              </div>
              <h1>Analisi di {userData.name}</h1>
              
              <div className="result-box">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
                  <div style={{background: 'white', color: '#0f172a', padding: '10px', borderRadius: '12px'}}>
                    {profiles[dominant].icon}
                  </div>
                  <h3 style={{fontSize: '28px', margin: 0}}>{profiles[dominant].title}</h3>
                </div>
                <p style={{fontSize: '18px', lineHeight: '1.7', color: '#cbd5e1', fontWeight: '500'}}>
                  {profiles[dominant].desc}
                </p>
                <div className="tip-box">
                  <strong>💡 Un consiglio per te:</strong> {profiles[dominant].tip}
                </div>
              </div>

              <div style={{display: 'flex', gap: '15px', marginTop: '30px'}} className="no-print">
                <button onClick={() => window.print()} className="btn-main" style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                  <Printer size={20} /> Salva Report
                </button>
                <button onClick={sendEmail} className="btn-main" style={{flex: 1, background: 'white', color: '#1e293b', border: '2px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
                  <Send size={20} /> Invia via Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
