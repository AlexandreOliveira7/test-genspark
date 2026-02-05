// Interface para tipagem dos dados do Pokémon
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  types?: Array<{
    type: {
      name: string;
    };
  }>;
  height?: number;
  weight?: number;
  abilities?: Array<{
    ability: {
      name: string;
    };
  }>;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Busca uma lista de Pokémons
 * @param limit - Quantidade de Pokémons a buscar
 * @param offset - Offset para paginação
 */
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar lista de Pokémons');
    }

    const data: PokemonListResponse = await response.json();
    
    // Extrai o ID da URL do Pokémon
    const pokemonList = data.results.map((pokemon, index) => {
      const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
      return {
        id,
        name: pokemon.name,
        url: pokemon.url,
      };
    });

    return pokemonList;
  } catch (error) {
    console.error('Erro ao buscar Pokémons:', error);
    throw error;
  }
}

/**
 * Busca detalhes de um Pokémon específico
 * @param id - ID ou nome do Pokémon
 */
export async function getPokemonDetails(id: number | string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar detalhes do Pokémon');
    }

    const data = await response.json();
    
    return {
      id: data.id,
      name: data.name,
      url: `${BASE_URL}/pokemon/${data.id}`,
      sprites: data.sprites,
      types: data.types,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities,
    };
  } catch (error) {
    console.error('Erro ao buscar detalhes do Pokémon:', error);
    throw error;
  }
}

/**
 * Busca Pokémons pelo nome (pesquisa)
 * @param searchTerm - Termo de pesquisa
 */
export async function searchPokemon(searchTerm: string): Promise<Pokemon[]> {
  try {
    // A PokeAPI não tem endpoint de busca, então vamos buscar mais Pokémons
    // e filtrar localmente
    const response = await fetch(`${BASE_URL}/pokemon?limit=1000`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar Pokémons');
    }

    const data: PokemonListResponse = await response.json();
    
    const searchLower = searchTerm.toLowerCase();
    const filtered = data.results
      .filter(pokemon => pokemon.name.includes(searchLower))
      .slice(0, 20) // Limita a 20 resultados
      .map(pokemon => {
        const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
        return {
          id,
          name: pokemon.name,
          url: pokemon.url,
        };
      });

    return filtered;
  } catch (error) {
    console.error('Erro ao pesquisar Pokémons:', error);
    throw error;
  }
}

/**
 * Formata o nome do Pokémon para exibição
 */
export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Retorna a cor baseada no tipo do Pokémon
 */
export function getPokemonTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  return typeColors[type] || '#777';
}
