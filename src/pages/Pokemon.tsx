import React, { useRef, useState } from 'react';
import {
  IonButton, IonCard, IonCardContent, IonChip,
  IonInput, IonLabel, IonSpinner,
} from '@ionic/react';
import Pagina from '../components/Pagina';

interface DatosPokemon {
  name: string;
  base_experience: number;
  abilities: { ability: { name: string } }[];
  sprites: {
    front_default: string | null;
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
  cries?: { latest?: string };
}

const Pokemon: React.FC = () => {
  const [nombre, setNombre] = useState('pikachu');
  const [pokemon, setPokemon] = useState<DatosPokemon | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Busca el pokemon por nombre en PokeAPI
  const buscar = async () => {
    const limpio = nombre.trim().toLowerCase();
    if (!limpio) {
      setError('Escribe el nombre de un pokemon');
      return;
    }
    setCargando(true);
    setError('');
    setPokemon(null);
    try {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(limpio)}`);
      if (resp.status === 404) throw new Error('No existe');
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      setPokemon(await resp.json());
    } catch (e) {
      setError(
        e instanceof Error && e.message === 'No existe'
          ? 'No se encontro ese pokemon'
          : 'No se pudo consultar PokeAPI'
      );
    } finally {
      setCargando(false);
    }
  };

  // Reproduce el sonido (cry) mas reciente del pokemon
  const reproducir = () => {
    const url = pokemon?.cries?.latest;
    if (!url) return;
    audioRef.current?.pause();
    audioRef.current = new Audio(url);
    audioRef.current.play().catch(() => setError('No se pudo reproducir el sonido'));
  };

  const foto =
    pokemon?.sprites.other?.['official-artwork']?.front_default ?? pokemon?.sprites.front_default;

  return (
    <Pagina titulo="Pokemon">
      <IonInput
        label="Nombre del pokemon"
        labelPlacement="floating"
        fill="outline"
        placeholder="Ej: pikachu"
        value={nombre}
        onIonInput={(e) => setNombre(String(e.detail.value ?? ''))}
      />
      <IonButton expand="block" style={{ marginTop: 16 }} onClick={buscar} disabled={cargando}>
        Buscar
      </IonButton>

      {cargando && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <IonSpinner />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && !cargando && (
        <IonCard>
          <IonCardContent style={{ textAlign: 'center' }}>
            {foto && <img src={foto} alt={pokemon.name} style={{ width: 220, maxWidth: '100%' }} />}
            <h2 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h2>
            <p>Experiencia base: {pokemon.base_experience}</p>
            <p>Habilidades:</p>
            <div>
              {pokemon.abilities.map((a) => (
                <IonChip key={a.ability.name}>
                  <IonLabel>{a.ability.name}</IonLabel>
                </IonChip>
              ))}
            </div>
            <IonButton onClick={reproducir} disabled={!pokemon.cries?.latest}>
              Escuchar sonido
            </IonButton>
          </IonCardContent>
        </IonCard>
      )}
    </Pagina>
  );
};

export default Pokemon;