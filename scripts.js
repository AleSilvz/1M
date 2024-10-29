const tableContainer = document.getElementById('tableContainer');
    const totalElement = document.getElementById('total');
    let total = 0;

    // Função para atualizar a soma
    function updateTotal(value, add) {
      total = add ? total + value : total - value;
      totalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Função para salvar o estado no Local Storage
    function saveMarkedCells() {
      const markedCells = [];
      document.querySelectorAll('.cell.marked').forEach(cell => {
        markedCells.push(cell.dataset.value);
      });
      localStorage.setItem('markedCells', JSON.stringify(markedCells));
      localStorage.setItem('total', total); // Salva o total também
    }

    // Função para carregar o estado dos quadrados
    function loadMarkedCells() {
      const markedCells = JSON.parse(localStorage.getItem('markedCells')) || [];
      total = parseFloat(localStorage.getItem('total')) || 0;
      totalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
      
      markedCells.forEach(value => {
        const cell = document.querySelector(`.cell[data-value='${value}']`);
        if (cell) {
          cell.classList.add('marked');
          cell.innerText = "✔";
        }
      });
    }

    // Cria os quadrados de 1 até 100
    for (let i = 1; i <= 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = i;
      cell.dataset.value = i;

      // Adiciona o evento de clique para marcar e somar
      cell.addEventListener('click', function () {
        const value = parseInt(this.dataset.value);
        if (this.classList.contains('marked')) {
          this.classList.remove('marked');
          this.innerText = value; // Remove o "✔" e exibe o valor original
          updateTotal(value, false);
        } else {
          this.classList.add('marked');
          this.innerText = "✔";
          updateTotal(value, true);
        }
        saveMarkedCells(); // Salva o estado sempre que um quadrado é marcado/desmarcado
      });

      tableContainer.appendChild(cell);
    }

    // Carrega o estado salvo ao iniciar
    loadMarkedCells();