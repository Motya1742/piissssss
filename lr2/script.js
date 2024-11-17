const personalMovieDB = {
    privat: false,
    movies: {
      'Мёртвый бассейн': 9.5,
      'Побег из Шоушенка': 9.2,
      'Джанго Освобождённый': 8.9
    }
  };
  
  function displayMovieTable() {
    const movieTable = document.getElementById('movie-table');
    movieTable.innerHTML = '';
  
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse'; 
  
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    th1.textContent = 'Название фильма';
    th1.style.border = '1px solid black'; 
    th1.style.padding = '8px'; 
    const th2 = document.createElement('th');
    th2.textContent = 'Оценка';
    th2.style.border = '1px solid black'; 
    th2.style.padding = '8px'; 
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    for (const [title, rating] of Object.entries(personalMovieDB.movies)) {
      const row = document.createElement('tr');
      const cell1 = document.createElement('td');
      cell1.textContent = title;
      cell1.style.border = '1px solid black'; 
      cell1.style.padding = '8px'; 
      const cell2 = document.createElement('td');
      cell2.textContent = rating;
      cell2.style.border = '1px solid black'; 
      cell2.style.padding = '8px'; 
      row.appendChild(cell1);
      row.appendChild(cell2);
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
  
    movieTable.appendChild(table);
  }
  

  if (!personalMovieDB.privat) {
    displayMovieTable();
  }
  