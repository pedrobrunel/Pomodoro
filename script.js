(function () {
    let minutosEscolhido = 0;
    let segundosEscolhido = 0;
    const seletorMinutos = document.getElementById('inputMinutos');
    const seletorSegundos = document.getElementById('inputSegundos');
    const botaoConfigurar = document.getElementById('configurarTempo');

    const botaoAjustar = document.getElementById('btnAjustar');
    const popUpConfigurar = document.getElementById('popUpConfigurarId');

    let temporizador;
    let minutos = 0;
    let segundos = 0;
    let temporizadorRodando = false;

    const alarmeEscolhido = document.querySelectorAll('input[name="opcaoAlarme"]');
    let audioAlarme = null; // Declarado como let para permitir reatribuição

    const displaytemporizador = document.getElementById('cronometro');
    const botaoIniciar = document.getElementById('btnIniciar');
    const botaoPausar = document.getElementById('btnPausar');
    const botaoReiniciar = document.getElementById('btnReiniciar');

    // Função para atualizar o display do timer
    function atualizarDisplayTemporizador() {
        const formatarMinutos = String(minutos).padStart(2, '0');
        const formatarSegundos = String(segundos).padStart(2, '0');
        displaytemporizador.textContent = `${formatarMinutos}:${formatarSegundos}`;
    }

    function iniciouTemporizador() {



        if (temporizadorRodando) return; // Se estiver rodando, retorna true e sai
        temporizadorRodando = true;
        botaoIniciar.disabled = true; // Desabilita o botão de iniciar
        botaoPausar.disabled = false; // Habilita o botão pause

        temporizador = setInterval(() => {
            if (segundos === 0) {
                if (minutos === 0) {
                    if (audioAlarme) {
                        audioAlarme.play(); // Reproduz o áudio
                    }
                    clearInterval(temporizador);
                    temporizadorRodando = false; // Reinicia o estado do temporizador
                    botaoIniciar.disabled = false; // Reabilita o botão de iniciar
                    botaoPausar.disabled = false; // Desabilita o botão de pausar
                    return;
                } else {
                    minutos--;
                    segundos = 59;
                }
            } else {
                segundos--;
            }
            atualizarDisplayTemporizador();
        }, 1000);
    }

    function pausarTemporizador() {
    


        clearInterval(temporizador);
        temporizadorRodando = false;
        botaoIniciar.disabled = false; // Reabilita o botão de iniciar
        botaoPausar.disabled = false; // Desabilita o botão de pausar

        if (audioAlarme) {
            audioAlarme.pause(); // Pausa o áudio
            audioAlarme.currentTime = 0; // Reinicia o áudio
        }

    }

    function resetarTemporizador() {
        if (audioAlarme) {
            audioAlarme.pause(); // Pausa o áudio
            audioAlarme.currentTime = 0; // Reinicia o áudio
        }

        clearInterval(temporizador);
        temporizadorRodando = false;
        minutos = minutosEscolhido;
        segundos = segundosEscolhido;

        atualizarDisplayTemporizador();
        botaoIniciar.disabled = false; // Reabilita o botão de iniciar
        botaoPausar.disabled = false; // Desabilita o botão de pausar
    }

    function botaoConfigurarClicado() {
        if (audioAlarme) {
            audioAlarme.pause(); // Pausa o áudio
            audioAlarme.currentTime = 0; // Reinicia o áudio
        }
        // Captura e converte os valores dos inputs
        const valorMinutos = parseInt(seletorMinutos.value) || 0;
        const valorSegundos = parseInt(seletorSegundos.value) || 0;

        // Atualiza o áudio selecionado
        alarmeEscolhido.forEach(radio => {
            if (radio.checked) {
                audioAlarme = new Audio(radio.value); // Cria um novo objeto Audio com o valor selecionado
            }
        });

        // Valida os minutos
        if (valorMinutos > 60) {
            minutosEscolhido = 60; // Define o valor máximo como 60
            seletorMinutos.value = 60;
        } else {
            minutosEscolhido = valorMinutos; // Usa o valor digitado pelo usuário
        }

        // Valida os segundos
        if (valorSegundos > 60) {
            segundosEscolhido = 60; // Define o valor máximo como 60
            seletorSegundos.value = 60;
        } else {
            segundosEscolhido = valorSegundos; // Usa o valor digitado pelo usuário
        }

        // Atualiza o temporizador com os novos valores
        minutos = minutosEscolhido;
        segundos = segundosEscolhido;

        atualizarDisplayTemporizador();
        popUpConfigurar.close();
    }

    function abrePopUp() {
        popUpConfigurar.showModal();
    }

    function pararAudioNoClique(event){
        audioAlarme.pause()
        audioAlarme.currentTime = 0
    }

    document.addEventListener('click', pararAudioNoClique)

    botaoIniciar.addEventListener('click', iniciouTemporizador);
    botaoPausar.addEventListener('click', pausarTemporizador);
    botaoReiniciar.addEventListener('click', resetarTemporizador);
    botaoConfigurar.addEventListener('click', botaoConfigurarClicado);
    botaoAjustar.addEventListener('click', abrePopUp);

    atualizarDisplayTemporizador();
})();