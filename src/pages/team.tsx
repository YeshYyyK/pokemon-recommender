// Javascript

// Steps to do:
/**
 * 1. Make a picker that lets you select a pokemon and add it to your team
 * 2. Save the state of the current team (use zustand, ask chatgpt)
 * 3. Add a next button that let's you get the next pokemon selection based on your current
 *   team's state
 * 4. Make a table that shows your current team's strengths and weaknesses
 * 5. Make a button that let you replace a selection in your team
 *
 *
 * Logic:
 *
 * Mapping between pokemon -> strength and weakness
 *
 * For 2: Get team's state -> get weakness table -> get counter table -> get next pokemon
 * For 3: Get team's state -> get strength/weakness table
 */

import { PokemonClient } from "pokenode-ts";
import { useQuery } from "@tanstack/react-query";
import { PokemonPicker } from "~/lib/Components/PokemonPicker";


const Team = () => {
  const list = [1, 2, 3, 4, 5, 6];

  const api = new PokemonClient();

  const { data, isLoading } = useQuery(["list-pokemon"], () =>
    api.listPokemonSpecies(0, 1010)
  );

  console.log({ pokemon: data?.results });

  return (
    <div className="flex w-full justify-between bg-red-500 p-20">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {list.map((item, idx) => {
            return (
              <div
                className="bg-indigo-500 p-4"
                key={item}
              >
                {data?.results && <PokemonPicker index={idx} pokemon={data?.results}></PokemonPicker>}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Team;
