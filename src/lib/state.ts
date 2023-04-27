import { createStore } from 'zustand';
import { immer  } from 'zustand/middleware/immer';


type Pokemon = {
    id: number,
    name: string,
    sprite: string,
    // type1: 
}

type State = {
    team: [Pokemon | undefined, Pokemon | undefined, Pokemon | undefined, Pokemon | undefined, Pokemon | undefined, Pokemon | undefined]
    setPokemon: (index: number, pokemon: Pokemon) => void
}


export const usePokiStore = createStore<State>()(immer((set, get) => ({
    team: [undefined, undefined, undefined, undefined, undefined, undefined],
    setPokemon: (index, pokemon) => {
        if (index < 0 || index > 5) throw new Error('Invalid index');
        const newTeam = get().team;
        newTeam[index] = pokemon;
        set({ team: newTeam });
    }
})));