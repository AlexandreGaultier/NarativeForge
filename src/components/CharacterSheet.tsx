import { FC, useState } from 'react';
import './CharacterSheet.css';

interface Item {
  id: string;
  name: string;
  effect: string;
}

interface Stat {
  name: string;
  value: number;
}

const CharacterSheet: FC = () => {
  const [stats, setStats] = useState<Stat[]>([
    { name: 'Force', value: 0 },
    { name: 'Défense', value: 0 },
    { name: 'Intelligence', value: 0 },
    { name: 'Dextérité', value: 0 },
    { name: 'Chance', value: 0 }
  ]);
  const [hp, setHp] = useState<number>(10);
  const [maxHp, setMaxHp] = useState<number>(10);
  const [gold, setGold] = useState<number>(0);
  const [diceResults, setDiceResults] = useState<[number, number]>([6, 6]);
  const [isEditingGold, setIsEditingGold] = useState(false);
  const [isEditingStat, setIsEditingStat] = useState<number | null>(null);
  const [isEditingMaxHp, setIsEditingMaxHp] = useState(false);

  const updateStat = (index: number, increment: number) => {
    const newStats = [...stats];
    newStats[index].value = Math.max(0, newStats[index].value + increment);
    setStats(newStats);
  };

  const rollSingleDie = (index: number) => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceResults(prev => {
      const newResults = [...prev];
      newResults[index] = newValue;
      return newResults as [number, number];
    });
  };

  const handleStatClick = (index: number) => {
    setIsEditingStat(index);
  };

  const handleStatBlur = () => {
    setIsEditingStat(null);
  };

  const handleGoldClick = () => {
    setIsEditingGold(true);
  };

  const handleGoldBlur = () => {
    setIsEditingGold(false);
  };

  const handleGoldInputChange = (value: string) => {
    const newValue = Math.max(0, Math.min(Number(value), 999));
    setGold(newValue);
  };

  const handleStatInputChange = (index: number, value: string) => {
    const newValue = Math.max(0, Math.min(Number(value), 99));
    const newStats = [...stats];
    newStats[index].value = newValue;
    setStats(newStats);
  };

  const updateMaxHp = (newMaxHp: number) => {
    const validMaxHp = Math.max(1, newMaxHp); // Pas moins de 1 PV max
    setMaxHp(validMaxHp);
    // Ajuste les PV actuels s'ils dépassent le nouveau maximum
    setHp(currentHp => Math.min(currentHp, validMaxHp));
  };

  const handleMaxHpChange = (value: string) => {
    const newValue = parseInt(value) || 1;
    updateMaxHp(newValue);
  };

  return (
    <div className="character-sheet">
      <h2>Fiche de Personnage</h2>
      
      <div className="resources-section">
        <div className="resource-row hp-row">
          <div className="hp-header">
            <span className="hp-label">Points de Vie</span>
            <div className="hp-max-controls">
              <div className="stat-controls">
                <button onClick={() => updateMaxHp(maxHp - 1)}>−</button>
                {isEditingMaxHp ? (
                  <input
                    type="number"
                    value={maxHp}
                    onChange={(e) => handleMaxHpChange(e.target.value)}
                    onBlur={() => setIsEditingMaxHp(false)}
                    className="stat-input"
                    autoFocus
                    min="1"
                  />
                ) : (
                  <span 
                    className="stat-value clickable" 
                    onClick={() => setIsEditingMaxHp(true)}
                  >
                    {hp}/{maxHp}
                  </span>
                )}
                <button onClick={() => updateMaxHp(maxHp + 1)}>+</button>
              </div>
            </div>
          </div>
          <div className="resource-bar">
            <input
              type="range"
              min="0"
              max={maxHp}
              value={hp}
              onChange={(e) => setHp(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="resource-row gold-row">
          <span>Or</span>
          <div className="stat-controls">
            <button onClick={() => setGold(Math.max(0, gold - 1))}>−</button>
            {isEditingGold ? (
              <input
                type="number"
                value={gold}
                onChange={(e) => handleGoldInputChange(e.target.value)}
                onBlur={handleGoldBlur}
                className="stat-input"
                autoFocus
              />
            ) : (
              <span 
                className="stat-value clickable" 
                onClick={handleGoldClick}
              >
                {gold}
              </span>
            )}
            <button onClick={() => setGold(gold + 1)}>+</button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Statistiques</h3>
        {stats.map((stat, index) => (
          <div key={stat.name} className="stat-row">
            <span className="stat-name">{stat.name}</span>
            <div className="stat-controls">
              <button onClick={() => updateStat(index, -1)}>−</button>
              {isEditingStat === index ? (
                <input
                  type="number"
                  value={stat.value}
                  onChange={(e) => handleStatInputChange(index, e.target.value)}
                  onBlur={handleStatBlur}
                  className="stat-input"
                  autoFocus
                />
              ) : (
                <span 
                  className="stat-value clickable" 
                  onClick={() => handleStatClick(index)}
                >
                  {stat.value}
                </span>
              )}
              <button onClick={() => updateStat(index, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="dice-section">
        <h3>Dés</h3>
        <div className="dice-container">
          <div 
            className="dice" 
            onClick={() => rollSingleDie(0)} 
            role="button" 
            tabIndex={0}
          >
            {diceResults[0]}
          </div>
          <div 
            className="dice" 
            onClick={() => rollSingleDie(1)} 
            role="button" 
            tabIndex={0}
          >
            {diceResults[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet; 