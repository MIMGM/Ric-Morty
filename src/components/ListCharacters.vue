<template>
<section>
  <div class="characters">
      <div class="characters__item" v-for="character in characters" :key="character.id">

            <!-- <h2>characters</h2> -->
            <!-- {{ character.name }} -->
            <!-- traemos el nuevo componente creado  y luegoa para que reciba  las props y del for-->
            <CardCharacter :character="character" />
      </div>
  </div>
  </section>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
//importamos el nuevo conpnente creado
import CardCharacter from '@/components/CardCharacter'

export default {
    //agragarlo a nuestros componentes
    components:{ 
        CardCharacter
    },
    setup() {   
    const store = useStore()
    //computada para ingresar en los "states"
    const characters = computed(() => { 
       return store.state.charactersFilter 
    })
    //para usar el "actions de getCharacters" que hemos creado usamos onMounted
    onMounted(() => { 

        //con "dispatch" accedemos a las "actions" y el nombre de la funcion
        store.dispatch('getCharacters')
    })
    return {
        characters
    }
 }
}
</script>

<style lang="scss">
.characters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin: 3rem 0;
}

</style>