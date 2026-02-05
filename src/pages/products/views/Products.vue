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
          label="Pesquisar produtos"
          placeholder="Digite para filtrar..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
          density="comfortable"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Lista de Cards -->
    <v-row style="overflow-y: auto; flex: 1">
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card elevation="2" hover>
          <v-card-title class="text-h6">
            {{ product.name }}
          </v-card-title>
          <v-card-text>
            <p class="text-body-2">{{ product.description }}</p>
            <v-chip
              :color="product.category === 'Eletrônicos' ? 'blue' : product.category === 'Livros' ? 'green' : 'orange'"
              size="small"
              class="mt-2"
            >
              {{ product.category }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text">
              Ver Detalhes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Mensagem quando não há resultados -->
      <v-col v-if="filteredProducts.length === 0" cols="12" class="text-center">
        <v-icon size="64" color="grey">mdi-magnify-remove-outline</v-icon>
        <p class="text-h6 text-grey mt-4">
          Nenhum produto encontrado para "{{ searchQuery }}"
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Interface para tipagem dos produtos
interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
}

// Lista de produtos (exemplo)
const products = ref<Product[]>([
  {
    id: 1,
    name: 'Notebook Dell',
    description: 'Notebook Dell Inspiron 15, Intel i7, 16GB RAM',
    category: 'Eletrônicos',
  },
  {
    id: 2,
    name: 'Mouse Logitech',
    description: 'Mouse sem fio Logitech MX Master 3',
    category: 'Eletrônicos',
  },
  {
    id: 3,
    name: 'Teclado Mecânico',
    description: 'Teclado mecânico RGB, switches blue',
    category: 'Eletrônicos',
  },
  {
    id: 4,
    name: 'Clean Code',
    description: 'Livro sobre boas práticas de programação',
    category: 'Livros',
  },
  {
    id: 5,
    name: 'Cadeira Gamer',
    description: 'Cadeira ergonômica para escritório e games',
    category: 'Móveis',
  },
  {
    id: 6,
    name: 'Monitor LG 27"',
    description: 'Monitor ultrawide LG 27 polegadas, 144Hz',
    category: 'Eletrônicos',
  },
  {
    id: 7,
    name: 'JavaScript: The Good Parts',
    description: 'Livro sobre JavaScript por Douglas Crockford',
    category: 'Livros',
  },
  {
    id: 8,
    name: 'Webcam Logitech',
    description: 'Webcam Full HD 1080p com microfone',
    category: 'Eletrônicos',
  },
]);

// Campo de pesquisa
const searchQuery = ref('');

// Computed para filtrar produtos
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value;
  }

  const query = searchQuery.value.toLowerCase().trim();

  return products.value.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(query);
    const descriptionMatch = product.description.toLowerCase().includes(query);
    const categoryMatch = product.category.toLowerCase().includes(query);

    return nameMatch || descriptionMatch || categoryMatch;
  });
});
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>
