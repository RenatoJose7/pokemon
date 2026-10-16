const formulario = document.getElementById("formulario")
const input = document.getElementById("input")
const resultado = document.getElementById("resultado")

function mostrarMensagem(mensagem, classe = "error-state") {
    resultado.replaceChildren()
    const texto = document.createElement("p")
    texto.className = classe
    texto.textContent = mensagem
    resultado.appendChild(texto)
}

async function buscarPokemon(nome) {
    const identificador = nome.trim().toLowerCase()
    if (!identificador) {
        mostrarMensagem("Digite o nome ou número de um Pokémon.")
        return
    }

    mostrarMensagem("Procurando Pokémon...", "empty-state")

    try {
        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(identificador)}`
        )

        if (!resposta.ok) {
            mostrarMensagem("Pokémon não encontrado. Confira o nome ou número.")
            return
        }

        const dados = await resposta.json()
        const nomePokemon = document.createElement("h2")
        nomePokemon.textContent = dados.name

        const imagemPokemon = document.createElement("img")
        imagemPokemon.src =
            dados.sprites.other?.["official-artwork"]?.front_default ??
            dados.sprites.front_default ??
            ""
        imagemPokemon.alt = `Imagem de ${dados.name}`

        resultado.replaceChildren(nomePokemon, imagemPokemon)
    } catch {
        mostrarMensagem("Não foi possível buscar o Pokémon. Verifique sua conexão e tente novamente.")
    }
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    buscarPokemon(input.value)
})