const template = document.createElement('template');

template.innerHTML = `
  <style>
    /* $accent-color: #FFEC41; */

    body {
      align-items: center;
      background: #000046;
      background: linear-gradient(to right, #1CB5E0, #000046); 
      display: flex;
      height: 100vh;
      justify-content: center;
      margin: 0;
      padding: 0;
    }

    .player {
      max-width: 800px;
      border: 6px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
      
      &:hover {
        .progress {
          height: 10px;
        }
        
        .player-controls {
          transform: translateY(0);
        }
      }
    }

    .player:-webkit-full-screen,
    .player:fullscreen {
      max-width: none;
      width: 100%;
    }

    .play-btn {
      flex: 1;
    }

    .player-video {
      width: 100%;
      display: block;
    }

    .player-btn {
      background: none;
      border: 0;
      color: white;
      text-align: center;
      max-width: 60px;
      padding: 5px 8px;
      
      svg {
        fill: #FFFFFF;
      }
      
      &:hover,
      &:focus {
        /* border-color: $accent-color; */
        background: rgba(255, 255, 255, .2);
      }
    }

    .player-slider {
      width: 10px;
      height: 30px;
    }

    .player-controls {
      align-items: center;
      display: flex;
      position: absolute;
      bottom: 0;
      width: 100%;
      transform: translateY(100%) translateY(-5px);
      transition: all 0.3s;
      flex-wrap: wrap;
      background: rgba(0, 0, 0, 0.3);
    }

    .player-controls > * {
      flex: 1;
    }

    .progress {
      position: relative;
      display: flex;
      flex: 10;
      flex-basis: 100%;
      height: 4px;
      transition: height 0.3s;
      background: rgba(0, 0, 0, 0.5);
    }

    .filled-progress {
      width: 50%;
      background: accent-color;
      flex: 0;
      flex-basis: 50%;
    }

    .sliders {
      max-width: 200px;
      display: flex;
    }

    input[type=range] {
      /* -webkit-appearance: none; */
      background: transparent;
      width: 100%;
      margin: 0 5px;
    }

    input[type=range]:focus {
      outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
      background: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      border: 0.2px solid rgba(1, 1, 1, 0);
    }

    input[type=range]::-webkit-slider-thumb {
      height: 15px;
      width: 15px;
      border-radius: 50px;
      background: white;
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -3.5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
      background: rgba(255, 255, 255, 0.8);
    }

    input[type=range]::-moz-range-track {
      width: 100%;
      height: 8px;
      cursor: pointer;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
      background: #ffffff;
      border-radius: 10px;
      border: 0.2px solid rgba(1, 1, 1, 0);
    }

    input[type=range]::-moz-range-thumb {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);
      height: 15px;
      width: 15px;
      border-radius: 50px;
      background: white;
      cursor: pointer;
    }    
  </style>

  <div class="video-player">
    <video class="player-video" src="https://staging.coverr.co/s3/mp4/Down_by_the_River.mp4" type="video/mp4"></video>
    
    <div class="player-controls">
      
      <div class="progress">
        <div class="filled-progress"></div>
      </div>
  <div class="ply-btn">
      <button class="player-btn toggle-play" title="Toggle Play">
        <svg class="" width="16" height="16" viewBox="0 0 16 16"><title>play</title><path d="M3 2l10 6-10 6z"></path></svg>
      </button>
    </div>

      
      <div class="sliders">
      <input type="range" name="volume" class="player-slider" min="0" max="1" step="0.05" value="1">
      
      <input type="range" name="playbackRate" class="player-slider" min="0.5" max="2" step="0.1" value="1">
      </div>
      
      <button data-skip="-10" class="player-btn">« 10s</button>
      
      <button data-skip="10" class="player-btn">10s »</button>

    </div>
  </div>`;

class VideoPlayer extends HTMLVideoElement{
 constructor(){
     super();
     this.attachShadow({ mode: 'open'});
     this.shadowRoot.appendChild(template.content.cloneNode(true));
     this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
     this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    
     this.shadowRoot.querySelector('video') = this.classList("video");
     this.shadowRoot.querySelector('.progress') = this.classList("progress");
     this.shadowRoot.querySelector('.filled-progress') = this.classList("progressFilled");
     this.shadowRoot.querySelector('.toggle-play') = this.classList("toggle");
     this.shadowRoot.querySelectorAll('[data-skip]') = this.classList("skippers");
     this.shadowRoot.querySelectorAll('.player-slider') = this.classList("ranges");
 } 

 connectedCallback(){
   this.h3 = this.getAttribute("name")
   this.render();
 }

 render(){
   this.h3;
 }
}
 

// Logic
function togglePlay() {
  const playState = video.paused ? 'play' : 'pause';
  video[playState](); // Call play or paused method 
}

function updateButton() {
  const togglePlayBtn = document.querySelector('.toggle-play');
  
  if(this.paused) {
    togglePlayBtn.innerHTML = `<svg class="" width="16" height="16" viewBox="0 0 16 16"><title>play</title><path d="M3 2l10 6-10 6z"></path></svg>`;  
  } else {
    togglePlayBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16"><title>pause</title><path d="M2 2h5v12H2zm7 0h5v12H9z"></path></svg>`;
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
  video[this.name] = this.value;
}

function progressUpdate() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressUpdate);

toggle.addEventListener('click', togglePlay);
skippers.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


window.customElements.define("video-player", VideoPlayer, { extends: "video" });