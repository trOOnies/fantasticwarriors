function elegirImagenAleatoria(imgType) {
    var num = Math.floor(Math.random() * 10)
    path = `img/index/${imgType}/${imgType}_${num}.jpg`
    var imgStr = `<img class="img-inicio" src="${[path]}" alt = "Imagen de luchador (${imgType})">`
    document.write(imgStr); document.close()
}
