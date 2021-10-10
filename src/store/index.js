import { createStore } from 'vuex'

export default createStore({
  state: {
    characters: [], //donde guardamos los personajes
    charactersFilter: [] //para hacer las consultas filtros
  },
  mutations: { //para modificar los "state"
    /*recibe dos parametros (uno del state para acceder a las variables
      en el state y el otro del payload que es la data que le vamos a mandar)*/
    setCharacters(state, payload) {
      //para asignar el payload a characters en el state ponemos
      state.characters = payload  //payload es lo que mandamos
    },
    //hacemos lo mismo para el Filter
    setCharactersFilter(state, payload) { 
      state.charactersFilter = payload
    } 

  },
  actions: { //las mutaciones necesitan las actions
    //getCharacters nos permitira obtener todos los personajes de la API
    async getCharacters({commit}) {   //"commit" es el parametro que recibe para acceder a las mutation
     
      try{
        //"response" esperara la respuesta de la Api
        //seleccionamos la APIRest de la pagina web "rickandmortyapi.com la de los "characters personajes"
          const response = await fetch('https://rickandmortyapi.com/api/character')
          //como hacemos una peticion GET no hace falta especificar el metodo
          //Esperamos la respuesta  de la forma de un JSON
          const data = await response.json()
          //console.log(data)

          //de esta manera carga los personajes obtenidos en las dos variables
          //data es un objeto y tenemos que acceder a los personajes "results"
          commit('setCharacters', data.results)
          commit('setCharactersFilter', data.results)
      }
      catch (error){ 
          console.log(error)
      }
    },
    filterByStatus({commit, state}, status ) { 
      const results = state.characters.filter((character) => { 
          return character.status.includes(status)
      })
      commit('setCharactersFilter', results)
    },
    filterByName({commit, state}, name) {
        const formatName = name.toLowerCase()
        const results =state.characters.filter((character) => {
          const  characterName = character.name.toLowerCase()

            if(characterName.includes(formatName)){
              return character
            }
        })
        commit('setCharactersFilter', results)
    }

  },
  modules: {
  }
})
