//FUNÇÃO DE CONSEGUIR RANDOMIZAR E JOGAR OS NUMÉROS ALEATÓRIOS PARA API
async function inputData() {
    //DECLARAÇÃO DE VARIAVEIS
    i=0
    document.getElementById("textoSelect").innerText = "";
    valueFalse=Int8Array
    valueFalse1=Int8Array
    valueTrue=Int8Array
    //LOOP PARA RANDOMIZAR E SEPARAR OS VALORES DEFINIDOS
    while(i<3){ 
        randomNumber = Math.floor(Math.random()* 1025)+1;
        if(i==0){
            valueFalse=randomNumber;
        }else if(i==1){
            valueTrue=randomNumber;
        }
        else{
            valueFalse1=randomNumber;
        }
        i+=1
    }
    //RETORNO E JOGAR PARA API FAZER A BUSCA DE DADOS
    getPokemons(valueTrue,valueFalse,valueFalse1)
}
//FUNÇÃO DE FAZER REQUISIÇÃO DA API E TRAZER OS DADOS PARA CADA VARIAVEL ALEATÓRIA DECIDIDA
async function getPokemons() {
    //DECLARAÇÃO DE VARIAVEIS
    const url="https://pokeapi.co/api/v2/pokemon/";
    const endpointFalse = `${url}${valueFalse}`; 
    const endpointTrue = `${url}${valueTrue}`; 
    const endpointFalse1 = `${url}${valueFalse1}`; 
    // TENTATIVA E ERRO
    try {
        const responseTrue=await fetch(endpointTrue);
        const responseFalse=await fetch(endpointFalse);
        const responseFalse1=await fetch(endpointFalse1);

        const dataTrue = await responseTrue.json();
        const dataFalse = await responseFalse.json();
        const dataFalse1 = await responseFalse1.json();
        const imageApi_pokemonTrue = dataTrue.sprites.front_default;

        const namePokemonFalse = dataFalse.name;
        const namePokemonFalse1 = dataFalse1.name;
        const namePokemonTrue = dataTrue.name;
        document.getElementById("imagePoke").src = imageApi_pokemonTrue;
        const valueSort = [namePokemonFalse, namePokemonFalse1, namePokemonTrue];
        let usedIndexes = [];
        for (var j = 0; j < 3; j++) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * valueSort.length);
            } while (usedIndexes.includes(randomIndex));
            let randomValue = valueSort[randomIndex];
            usedIndexes.push(randomIndex);
            document.getElementById("optionsPokemon" + (j + 1)).innerText = randomValue.toUpperCase();
            if (randomValue===namePokemonTrue){
                correctIndex = j+1;
            }
        }
        return namePokemonTrue;
        }catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
let b = 0;
let x = 0;
async function questionSelect(selectOption) {
    if(selectOption==correctIndex){
        document.getElementById("textoSelect").innerText = "Você acertou o pokemon! parabéns pela tentativa, aguarde para próxima tentativa!"
        b++;
    }
    else{
        document.getElementById("textoSelect").innerText = "Você errou o pokemon! aguarde para próxima tentativa!"
        x++;
    }
    document.getElementById("correctPokemon").innerText="Sua contagem de acertos de pokemon foi de:"+b;
    document.getElementById("failedPokemon").innerText="Sua contagem de erros de pokemon foi de:"+x;
    setTimeout(() => {
        inputData();
    }, 2000); // 2000 milissegundos = 2 segundos
}

async function resetData() {
    document.getElementById("correctPokemon").innerText="Sua contagem de acertos de pokemon foi de:"+0;
    document.getElementById("failedPokemon").innerText="Sua contagem de erros de pokemon foi de:"+0;
    b=0;
    x=0;
}
