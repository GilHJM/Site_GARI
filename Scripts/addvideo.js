// Seleciona elementos HTML 
const urlvid = document.querySelector("#UrlVideo")
const dateurl = document.querySelector("#DateUrl")
const Id = document.querySelector("#Id")

const btn = document.querySelector("#btnAdicionarVideos")
const fileInput = document.querySelector("#fileInput");
const uploadBtn = document.querySelector("#uploadBtn");

// Adiciona um evento de clique ao botão de adicionar vídeo
btn.addEventListener("click", function() {
  // Cria um objeto para o novo vídeo com as informações inseridas nos campos
  const newVideo = {
    name: dateurl.value,
    src: "https://drive.google.com/file/d/"+urlvid.value+"/preview",
    id: "vid_"+Id.value
  };
  // Verifica se os campos estão vazios
  if (urlvid.value == "" || Id.value == "") {
    alert("Campo Nome & ID não pode ficar vazio");
  } else {
    // Recupera os dados armazenados no Local Storage ou cria um novo array vazio
    const existingVideo = allVideos.find(video => video.id === newVideo.id);
    const existingVideo2 = allVideos.find(video => video.src === newVideo.src);
    if (existingVideo) 
    {
      alert("Esse ID já foi utilizado, escolha outro!");
    }else if (existingVideo2) 
    {
      alert("Esse Link já foi utilizado, escolha outro!");
    } else 
    {
      allVideos.push(newVideo);
      localStorage.setItem("allVideos", JSON.stringify(allVideos));
    }
  }
});

uploadBtn.addEventListener("click", function() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function() 
  {
    localStorage.setItem("allVideos", reader.result.replace("let allVideos = ",""));
  };
  reader.readAsText(file);
});

const videosTable = document.querySelector("#videosTable");
const allVideos = JSON.parse(localStorage.getItem("allVideos")) || [];
for (const video of allVideos) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${video.name}</td>
    <td>${video.src}</td>
    <td>${video.id}</td>
  `;
  videosTable.appendChild(row);
}

function saveText() 
{
    let allVideos = JSON.parse(localStorage.getItem('allVideos'));
    allVideos = 'let allVideos = ['+ JSON.stringify(allVideos).slice(1,-1)+']'
    const jsonBlob = new Blob([allVideos], { type: 'text/plain;charset=utf-8' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = jsonUrl;
    downloadLink.download = 'allVideos.txt';
    downloadLink.click();
}