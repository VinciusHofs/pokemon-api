//FUNÇÃO DE CONSEGUIR RANDOMIZAR E JOGAR OS NUMÉROS ALEATÓRIOS PARA API
async function inputData() {
    //DECLARAÇÃO DE VARIAVEIS
    i=0
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
        for (var j = 0; j < 3;j++) {
            let randomIndex = Math.floor(Math.random() * valueSort.length);
            let randomValue = valueSort[randomIndex]; 
            console.log(valueSort);
            document.getElementById("optionsPokemon"+ (j+1)).innerText = randomValue.toUpperCase();
        }
        return namePokemonTrue;
        }catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function questionSelect() {
    document.getElementById("textoSelect").innerText="Você acertou, parabéns Treinador!";
}
