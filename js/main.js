$(document).ready(() => {
  $('#searchUser').on('keyup', (e) => {
    let username = e.target.value;

    // request
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id:'',
        client_secret:''
      }
    }).done((user) => {
      console.log(user.name);
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id:'',
          client_secret:'',
          sort:'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        console.log(repos);
        $.each(repos, (index, repo) => {
          $('#repos').append(`
            <div class="card card-body">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="badge bg-success">Forks: ${repo.forks_count}</span>
                  <span class="badge bg-warning">Watchers: ${repo.watchers_count}</span>
                  <span class="badge bg-danger">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-titlle">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img src="${user.avatar_url}" class="thumbnail avatar">
                <a  class="btn btn-primary btn-block" href="${user.html_url}">View profile</a>
              </div>
              <div class"col-md-9">
                <span class="badge bg-success">Public Repos: ${user.public_repos}</span>
                <span class="badge bg-warning">Public Gists: ${user.public_gists}</span>
                <span class="badge bg-danger">Followers: ${user.followers}</span>
                <span class="badge bg-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member SInce: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `)
    })
  })
})
