document.addEventListener("DOMContentLoaded", function () {
  const requestUrl = "https://api.github.com/users/animeredits";
  const xhr = new XMLHttpRequest();
  xhr.open("GET", requestUrl);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      const profileImage = document.querySelector("#profile img");

      if (profileImage) {
        profileImage.crossOrigin = "anonymous";
        profileImage.src = response.avatar_url;

        profileImage.onload = function () {
          document.getElementById("userName").innerHTML = response.login;
          document.getElementById("Url").onclick = function () {
            window.open(response.html_url, "_blank");
          };
          document.getElementById("repo").innerHTML = response.public_repos;
          document.getElementById("following").innerHTML = response.following;
          document.getElementById("Followers").innerHTML = response.followers;
        };
      } else {
        console.error("Profile image not found in the DOM.");
      }
    } else if (xhr.readyState === 4) {
      console.error("Failed to fetch the GitHub user data.");
    }
  };
  xhr.send();

  const outlineHeartIcon = document.querySelector('.far.fa-heart.heartIcon');
  const filledHeartIcon = document.querySelector('.fas.fa-heart.heartIcon');
  const followersCount = document.getElementById('Followers');

  outlineHeartIcon.addEventListener('click', () => {
    outlineHeartIcon.style.display = 'none';
    filledHeartIcon.style.display = 'inline-block';

    // Increase the follower count by 1
    let currentFollowers = parseInt(followersCount.innerText);
    currentFollowers += 1;
    followersCount.innerText = currentFollowers;
  });

  filledHeartIcon.addEventListener('click', () => {
    filledHeartIcon.style.display = 'none';
    outlineHeartIcon.style.display = 'inline-block';

    // Decrease the follower count by 1
    let currentFollowers = parseInt(followersCount.innerText);
    currentFollowers -= 1;
    followersCount.innerText = currentFollowers;
  });

  document.getElementById("Download").addEventListener("click", function () {
    window.print();
  });

  const followButton = document.getElementById('Url');

  followButton.addEventListener('click', function () {
    // Get the current number of followers
    let currentFollowers = parseInt(followersCount.innerText);

    // Increase the follower count by 1
    currentFollowers += 1;

    // Update the follower count on the page
    followersCount.innerText = currentFollowers;
  });
});
