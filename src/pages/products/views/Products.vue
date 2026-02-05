<template>
  <v-container
    fluid
    class="px-4 bg-beige_dg d-flex flex-column"
    style="height: 100vh; overflow: hidden"
  >
    <!-- Campo de Pesquisa -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Pesquisar Pokémons"
          placeholder="Digite o nome do Pokémon..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          density="comfortable"
          @update:model-value="handleSearch"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-chip class="mr-2">
          <v-icon start>mdi-pokemon-go</v-icon>
          Total: {{ pokemons.length }} Pokémons
        </v-chip>
      </v-col>
    </v-row>

    <!-- Loading -->
    <v-row v-if="loading" class="justify-center align-center" style="flex: 1">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="text-h6 mt-4">Carregando Pokémons...</p>
      </v-col>
    </v-row>

    <!-- Lista de Cards -->
    <v-row v-else style="overflow-y: auto; flex: 1">
      <v-col
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card 
          elevation="2" 
          hover
          @click="openPokemonModal(pokemon)"
          style="cursor: pointer"
        >
          <v-img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
            height="200"
            cover
            class="bg-grey-lighten-4"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          
          <v-card-title class="text-h6">
            #{{ String(pokemon.id).padStart(3, '0') }} - {{ formatPokemonName(pokemon.name) }}
          </v-card-title>
          
          <v-card-text>
            <div class="d-flex flex-wrap gap-2">
              <v-chip
                v-for="type in pokemon.types"
                :key="type.type.name"
                :color="getPokemonTypeColor(type.type.name)"
                size="small"
                text-color="white"
              >
                {{ formatPokemonName(type.type.name) }}
              </v-chip>
            </div>
          </v-card-text>
          
          <v-card-actions>
            <v-btn color="primary" variant="text" block>
              <v-icon start>mdi-information</v-icon>
              Ver Detalhes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Mensagem quando não há resultados -->
      <v-col v-if="pokemons.length === 0 && !loading" cols="12" class="text-center">
        <v-icon size="64" color="grey">mdi-magnify-remove-outline</v-icon>
        <p class="text-h6 text-grey mt-4">
          Nenhum Pokémon encontrado para "{{ searchQuery }}"
        </p>
      </v-col>
    </v-row>

    <!-- Paginação -->
    <v-row v-if="!loading && !searchQuery" class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          @update:model-value="loadPokemons"
        ></v-pagination>
      </v-col>
    </v-row>

    <!-- Modal de Detalhes do Pokémon -->
    <v-dialog v-model="showModal" max-width="600">
      <v-card v-if="selectedPokemon">
        <v-card-title class="text-h5 d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-pokemon-go</v-icon>
          #{{ String(selectedPokemon.id).padStart(3, '0') }} - {{ formatPokemonName(selectedPokemon.name) }}
          <v-spacer></v-spacer>
          <v-btn icon @click="showModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-row>
            <!-- Imagem do Pokémon -->
            <v-col cols="12" class="text-center">
              <v-img
                :src="selectedPokemon.sprites?.other['official-artwork'].front_default || 
                      selectedPokemon.sprites?.front_default"
                max-height="300"
                contain
                class="mx-auto"
              ></v-img>
            </v-col>

            <!-- Informações -->
            <v-col cols="12">
              <v-card variant="outlined" class="pa-3">
                <h3 class="text-h6 mb-3">Informações</h3>
                
                <v-row dense>
                  <v-col cols="6">
                    <div class="text-caption text-grey">Altura</div>
                    <div class="text-body-1">{{ (selectedPokemon.height! / 10).toFixed(1) }} m</div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-caption text-grey">Peso</div>
                    <div class="text-body-1">{{ (selectedPokemon.weight! / 10).toFixed(1) }} kg</div>
                  </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <div class="mb-3">
                  <div class="text-caption text-grey mb-2">Tipos</div>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip
                      v-for="type in selectedPokemon.types"
                      :key="type.type.name"
                      :color="getPokemonTypeColor(type.type.name)"
                      size="small"
                      text-color="white"
                    >
                      {{ formatPokemonName(type.type.name) }}
                    </v-chip>
                  </div>
                </div>

                <v-divider class="my-3"></v-divider>

                <div>
                  <div class="text-caption text-grey mb-2">Habilidades</div>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip
                      v-for="ability in selectedPokemon.abilities"
                      :key="ability.ability.name"
                      size="small"
                      variant="outlined"
                    >
                      {{ formatPokemonName(ability.ability.name) }}
                    </v-chip>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="elevated" @click="showModal = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar para erros -->
    <v-snackbar v-model="showError" color="error" :timeout="3000">
      {{ errorMessage }}
      <template v-slot:actions>
        <v-btn variant="text" @click="showError = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  getPokemonList,
  getPokemonDetails,
  searchPokemon,
  formatPokemonName,
  getPokemonTypeColor,
  type Pokemon,
} from '../services/pokemonService';

// Estados
const pokemons = ref<Pokemon[]>([]);
const selectedPokemon = ref<Pokemon | null>(null);
const loading = ref(false);
const showModal = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const searchQuery = ref('');

// Paginação
const currentPage = ref(1);
const itemsPerPage = 20;
const totalPages = ref(10); // Existem cerca de 1000 Pokémons, então ~50 páginas

// Carrega lista de Pokémons
async function loadPokemons() {
  loading.value = true;
  try {
    const offset = (currentPage.value - 1) * itemsPerPage;
    const pokemonList = await getPokemonList(itemsPerPage, offset);
    
    // Busca detalhes de cada Pokémon para obter tipos
    const detailedPokemons = await Promise.all(
      pokemonList.map(pokemon => getPokemonDetails(pokemon.id))
    );
    
    pokemons.value = detailedPokemons;
  } catch (error) {
    errorMessage.value = 'Erro ao carregar Pokémons. Tente novamente.';
    showError.value = true;
    console.error(error);
  } finally {
    loading.value = false;
  }
}

// Busca Pokémons por nome
let searchTimeout: number | undefined;
async function handleSearch() {
  // Debounce para evitar muitas requisições
  clearTimeout(searchTimeout);
  
  if (!searchQuery.value) {
    loadPokemons();
    return;
  }

  searchTimeout = setTimeout(async () => {
    loading.value = true;
    try {
      const results = await searchPokemon(searchQuery.value);
      
      // Busca detalhes dos Pokémons encontrados
      const detailedPokemons = await Promise.all(
        results.map(pokemon => getPokemonDetails(pokemon.id))
      );
      
      pokemons.value = detailedPokemons;
    } catch (error) {
      errorMessage.value = 'Erro ao pesquisar Pokémons. Tente novamente.';
      showError.value = true;
      console.error(error);
    } finally {
      loading.value = false;
    }
  }, 500);
}

// Abre modal com detalhes do Pokémon
async function openPokemonModal(pokemon: Pokemon) {
  showModal.value = true;
  loading.value = true;
  
  try {
    // Busca detalhes completos do Pokémon
    const details = await getPokemonDetails(pokemon.id);
    selectedPokemon.value = details;
  } catch (error) {
    errorMessage.value = 'Erro ao carregar detalhes do Pokémon.';
    showError.value = true;
    console.error(error);
    showModal.value = false;
  } finally {
    loading.value = false;
  }
}

// Carrega Pokémons ao montar o componente
onMounted(() => {
  loadPokemons();
});
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.gap-2 {
  gap: 8px;
}
</style>
