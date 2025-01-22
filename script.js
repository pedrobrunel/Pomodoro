(function (){

    let temporizador
    let minutos = 30
    let segundos = 0
    let intervalo
    let temporizadorRodando = false

    const displaytemporizador = document.getElementById('cronometro')
    const botaoIniciar = document.getElementById('btnIniciar')
    const botaoPausar = document.getElementById('btnPausar')
    const botaoReiniciar = document.getElementById('btnReiniciar')

    // Função para atualizar o display do timer
    function atualizarDisplayTemporizador (){
        const formatarMinutos = String(minutos).padStart(2,'0')
        const formatarSegundos = String(segundos).padStart(2,'0')
        displaytemporizador.textContent = `${formatarMinutos}:${formatarSegundos}`
    }

    function iniciouTemporizador (){
        if (temporizadorRodando) return /* Se estiver rodando, retorna true e sai */
        temporizadorRodando = true
        botaoIniciar.disabled = true //Desabilita o botão de iniciar
        botaoPausar.disabled = false //habilita o botão pause

        temporizador = setInterval (() => {
            if (segundos === 0){
                if (minutos === 0){
                   clearInterval(temporizador)
                   alert('Finalizou o contador')

                   resetarTemporizador()
                   return
                }else{
                    minutos --
                    segundos = 59
                }
            } else{
                segundos --
            }
            atualizarDisplayTemporizador()
        }, 1000)
    }


botaoIniciar.addEventListener('click', iniciouTemporizador())



}) ()

