import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

import { type NamedAPIResource } from 'pokenode-ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function PokemonPicker({ pokemon }: { pokemon: NamedAPIResource[] }) {
  
  const [query, setQuery] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<NamedAPIResource | null>(null);

  const filteredPokemon =
    query === "" 
      ? pokemon
      : pokemon.filter((pokemon) => {
          return pokemon.name.toLowerCase().startsWith(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedPokemon} onChange={setSelectedPokemon}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 capitalize bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => (person as NamedAPIResource)?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredPokemon.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPokemon.map((pokemon) => (
              <Combobox.Option
                key={pokemon.name}
                value={pokemon}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none capitalize py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {pokemon.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
