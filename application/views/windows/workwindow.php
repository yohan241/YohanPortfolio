<div class="mainwindow closed card" id="workwindow">
  <div class="mainwindowheader subfont" id="workwindowheader">
    <h4>work</h4>
    <button class="minimize-btn" onclick="toggleMinimize(this)">[–]</button>
    <button class="close-btn" onclick="hideWindow('workwindow')">[×]</button>
  </div>

  <div class="mainwindowcontent card-body d-flex flex-column text-start">
    <div class="p-3 overflow-auto" style="height: 70vh;">

      <!-- TOOLS & DEVELOPMENT -->
      <div class="row mb-4">
        <div class="col-md-6">
          <h5 class="fw-bold">TOOLS</h5>
          <div class="d-flex flex-wrap gap-2">
              <span class="badge tag hover-sound">Canva</span>
              <span class="badge tag hover-sound">Photoshop</span>
              <span class="badge tag hover-sound">Inkscape</span>
              <span class="badge tag hover-sound">XAMPP</span>
              <span class="badge tag hover-sound">Bandlab</span>
              <span class="badge tag hover-sound">VS Code</span>
              <span class="badge tag hover-sound">Google Workspace</span>
          </div>
        </div>
        <div class="col-md-6">
          <h5 class="fw-bold">LANGUAGES</h5>
          <div class="d-flex flex-wrap gap-2">
            <span class="badge tag hover-sound">C++</span>
            <span class="badge tag hover-sound">JavaScript</span>
            <span class="badge tag hover-sound">Python</span>
            <span class="badge tag hover-sound">HTML/CSS</span>
            <span class="badge tag hover-sound">PHP</span>
            <span class="badge tag hover-sound">Java</span>
            <span class="badge tag hover-sound">PHP</span>
            <span class="badge tag hover-sound">Bootstrap</span>
          </div>
        </div>
      </div>
        <br>
      <!-- ILLUSTRATIONS -->
      <h5 class="fw-bold">ILLUSTRATIONS</h5>
      <div class="row g-3 mb-4">
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(1).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(2).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(3).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(4).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(5).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(6).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(7).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(8).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12 col-md-4">
          <img src="<?= base_url(); ?>assets/images/img(9).png" class="img-fluid rounded shadow-sm w-100 h-100" style="object-fit: cover;" alt="">
        </div>
        <div class="col-12">
          <img src="<?= base_url(); ?>assets/images/Drawin2.png" class="img-fluid rounded shadow" style="object-fit: cover; width: 100%;" alt="">
        </div>
      </div>
        <br>
      <!-- PROJECTS -->
      <h5 class="fw-bold">PROJECTS</h5>
      <div class="row g-4 align-items-center mb-4">
        <div class="col-md-4">
          <img src="<?= base_url(); ?>assets/images/finance.png" class="img-fluid rounded" alt="Financial Tracker">
        </div>
        <div class="col-md-8">
          <h5 class="text-primary">Online Financial Tracker and Visualizer</h5>
          <p class="mb-1">made as a final project for school. it is built to keep track of your every transaction and visualize it cleanly via charts and graphs! :)</p>
          <p>made with Chart.js, PHP, HTML/CSS, JS </p>
          
        </div>
      </div>
      <div class="row g-4 align-items-center mb-4">
        <div class="col-md-4">
          <img src="<?= base_url(); ?>assets/images/cake.png" class="img-fluid rounded" alt="Birthday Cake">
        </div>
        <div class="col-md-8">
          <h5 class="text-primary">Cake4U</h5>
          <p class="mb-1">i wanted to make a small project just for practice and this idea came up! blow out your candle with your mic, customize your greeting and cake color, and share the link!</p>
          <p>here is the <a href="https://github.com/yohan241/Cake4U">github repository</a> for the project.</p> <br>
          <a href="https://yohan241.github.io/Cake4U/" class="btn btn-primary btn-sm text-white">visit it yourself</a>
        </div>
      </div>

      <div class="row g-4 align-items-center mb-4">
        <div class="col-md-4">
          <img src="<?= base_url(); ?>assets/images/gensoc.png" class="img-fluid rounded" alt="Info Website">
        </div>
        <div class="col-md-8">
          <h5 class="text-primary">Blog Landing Page</h5>
          <p class="mb-1">this is just a simple landing page for blog initially created for a school project :)</p>
          <p>here is the <a href="https://github.com/BS-CS-3B/GenderSociety">github repository</a> for the project.</p> <br>
          <a href="https://bs-cs-3b.github.io/GenderSociety/" class="btn btn-primary btn-sm text-white">visit it yourself</a>
        </div>
      </div>
        <br>
      <!-- OTHER PROJECTS -->
      <h5 class="fw-bold">OTHER PROJECTS</h5>
      <ul>
        <li>library management system</li>
        <li>simple calculator and note taker (browser)</li>
        <li>playable games on browser (check games section!!)</li>
      </ul>

    </div>
  </div>
</div>
