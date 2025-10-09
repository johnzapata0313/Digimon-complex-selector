const url = "https://digimon-api.vercel.app/api/digimon";
const YOUTUBE_API_KEY = "AIzaSyDzKJzXm6w8k8v69KqATGY0NZTFCT94sl8"; // your key
const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";

document.getElementById("getDigimon").addEventListener("click", function() {
  // Step 1: Fetch random Digimon
  fetch(url)
    .then(response => response.json()) //parse response as JSON
    .then(digimonList => {
      const random = Math.floor(Math.random() * digimonList.length);
      const digimon = digimonList[random];

      // Display Digimon info
      document.getElementById("name").textContent = digimon.name;
      document.getElementById("level").textContent = "Level: " + digimon.level;
      document.getElementById("image").src = digimon.img;

      // Step 2: Fetch YouTube video
      const searchTerm = encodeURIComponent(digimon.name + " Digimon battle");
      const youtubeUrl = `${YOUTUBE_API}?part=snippet&q=${searchTerm}&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`;

      return fetch(youtubeUrl);
    })
    .then(res => res.json())
    .then(youtubeData => {
      if (youtubeData.items && youtubeData.items.length > 0) {
        const videoId = youtubeData.items[0].id.videoId;
        document.getElementById("video").src = `https://www.youtube.com/embed/${videoId}`;
      } else {
        document.getElementById("video").src = "";
        document.getElementById("videoContainer").innerHTML = "<p>No video found.</p>";
      }
    })
    .catch(error => console.error("Error randomizing Digimon:", err));
});
