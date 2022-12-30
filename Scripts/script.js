// SELECIONA ELEMENTOS INICIO
const mainVideo = document.querySelector('#main-Video');
const musicList = document.querySelector('.music-list');
const playlist = document.getElementById('playlist');
const AllLessons = document.querySelector('.AllLessons');
const videoTitle = document.querySelector('.title');
const menu = document.querySelector('#menu-h');
const ulTag = document.querySelector("ul");
// SELECIONA ELEMENTOS FIM

// MENU INICIO
menu.innerHTML = ` <ul>
<li>
    <a href="index.html" class='btn-red'>Inicio</a>
</li>
<li><a>5° semestre</a>
    <ul>
        
            <li><a href="CategoriaMS.html">Modelagem Simulação</a></li>     
            <li><a href="CategoriaMN.html">Metodo Numerico</a></li>
            <li><a href="CategoriaIA.html">Inteligencia Artificial</a></li>
    </ul>
</li>
<li><a>6° semestre</a>
    <ul>
            <li><a href="CategoriaAD.html">Análise De Dados</a></li>
            <li><a href="CategoriaDNA.html">Desenvolvimento De Nego...</a></li>
            <li><a href="CategoriaGP.html">Gerência De Projetos Em TI</a></li>
            <li><a href="CategoriaPO.html">Pesquisa Operacional</a></li>
            <li><a href="CategoriaSI.html">Segurança Da Informação</a></li>
            <li><a href="CategoriaPDC.html">Geestão de Sist...</a></li>
    </ul>
</li>
</ul> `
// MENU FIM

AllLessons.innerHTML = `${allVideos.length} Aulas`;
let VideoIndex = 1;

window.addEventListener('load',()=>{
   loadVideo(VideoIndex);
   playingNow();
})

function loadVideo(indexNumb){
   mainVideo.src = `${allVideos[indexNumb - 1].src}`;
   videoTitle.innerHTML = `<a>aula ${indexNumb}. ${allVideos[indexNumb - 1].name}</a>`
   
}

for(let i = 0; i < allVideos.length; i++){
   let liTag = `<li li-index="${i + 1}">
      <div class="row">
         <span>${i + 1}. ${allVideos[i].name}</span>
      </div>
      <iframe class="${allVideos[i].id}" src="${allVideos[i].src}" style="display: none;" title="${allVideos[i].name}"></iframe>
      <span id="${allVideos[i].id}" class="duration"></span>
   </li>`;
   playlist.insertAdjacentHTML('beforeend',liTag); 

   let liVideoDuration = ulTag.querySelector(`#${allVideos[i].id}`)
   let liVideoTag = ulTag.querySelector(`.${allVideos[i].id}`);
   
}
// tocar video específico ao clicar
const allLiTags = playlist.querySelectorAll('li');
function playingNow(){
   for(let j = 0; j<allVideos.length; j++){
      if(allLiTags[j].classList.contains('playing')){
         allLiTags[j].classList.remove("playing")
      }
      if(allLiTags[j].getAttribute('li-index')==VideoIndex){
         allLiTags[j].classList.add('playing')
      }
      // adicionando o atributo onclick em todas as tags li
      allLiTags[j].setAttribute("onclick", "clicked(this)")
   }
}

function clicked(element){
   // obtendo o índice li de uma tag li clicada em particular
   let getIndex = element.getAttribute("li-index");
   VideoIndex = getIndex;
   loadVideo(VideoIndex);
   playingNow(VideoIndex);
}