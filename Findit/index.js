const form = document.querySelector('#search-form');
const searchinput = form.querySelector('#search-input');
const limit = form.querySelector('#limit');

form.addEventListener('submit', e => {
    e.preventDefault();
    const sortby = document.querySelector('input[name="sortby"]:checked').value;
    const input = searchinput.value;
    const limitval = limit.value;

    if(searchinput.value === ''){
        showMessage('Please give us a search term !','alert-danger');
    }
    
    //Search Reditt here !
    function search(input,sortby,limitval){
        return fetch(`http://www.reddit.com/search.json?q=${input}&sort=${sortby}&limit=${limitval}`)
            .then(res => res.json())
            .then(data => data.data.children.map(data => data.data))
            .catch(err => console.log(err));
    }
    
    search(input,sortby,limitval)
        .then(results => {
            let output = '<div class="card-columns">';
            results.forEach(item => {
                let image = item.preview ? item.preview.images[0].source.url : 'https://www.affiliatemarketertraining.com/wp-content/uploads/2015/01/Reddit.jpg';
        
                output += `<div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${truncateString(item.selftext,100)}</p>
                  <a href="${item.url}" target="_blank" class="btn btn-primary">Read More</a>
                  <hr>
                  <span class="badge badge-secondary">${item.subreddit}</span>
                  <span class="badge badge-dark">${item.score}</span>
                </div>
              </div>`;
            })
            output += '</div>';
            document.getElementById('results').innerHTML = output;
        });

        searchinput.value = '';
});

function showMessage(message,className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const searchdiv = document.querySelector('#search');
    const searchcondiv = document.querySelector('#search-container');
    searchcondiv.insertBefore(div,search);
    setTimeout(() => document.querySelector('.alert').remove(),3000);
}

function truncateString(str, num) {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
  }



