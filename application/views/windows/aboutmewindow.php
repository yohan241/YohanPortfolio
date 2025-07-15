<div class="mainwindow closed card" id="aboutmewindow">
  <div class="mainwindowheader subfont" id="aboutmewindowheader">
    <h4>about me</h4>
    <button class="minimize-btn" onclick="toggleMinimize(this)">[–]</button>
    <button class="close-btn" onclick="hideWindow('aboutmewindow')">[×]</button>
  </div>

  <div class="mainwindowcontent card-body d-flex flex-column text-start">
    <div class="card-header sticky-top bg-white py-3">
      <div class="d-flex align-items-center">
        <img class="rounded-circle me-3" src="<?= base_url(); ?>assets/images/profile.jpg" alt="self-portrait"
          style="width: 150px; height: 150px; object-fit: cover;">
        <div style="padding-left: 10px">
          <h1 class="card-title mb-0"><span class="text-primary fw-bold"> Johan Czar P. Pagba<span class="blockquote  fst-italic fw-lighter">(yohan)</span></span></h1>
          <medium class="card-text text-muted mb-1">Aspiring game developer, graphic designer, web developer</medium>
          <medium class="card-text text-muted">Currently pursuing a Bachelor's Degree on <br><a href="#"
              class="text-decoration-none">Computer Science</a> at <a href="#"
              class="text-decoration-none">Cavite State University - Imus Campus</a></medium>
        </div>
      </div>
    </div>

    <!-- Scrollable content -->
    <div class="p-3 overflow-auto" style="height: 30vh;">
      <p>hi! i'm yohan, a comsci undergraduate with an interest in web and game development. i...</p>
      <ul>
        <li>create <a href="#" class="text-decoration-none">video games</a>,</li>
        <li>create <a href="#" class="text-decoration-none">vector illustrations</a>, and</li>
        <li>try to do frontend web development!</li>
      </ul>
      <p>interested in working with me? send me an email at <a href="mailto:johanczarpagba@gmail.com!"
          class="text-decoration-none">johanczarpagba@gmail.com!</a> :)</p>

            <br>

          <h3 class="fw-bold ">EDUCATION</h3>
            <div class="my-2 border-start ps-3 border-gray-lightest ">
          <h5 class="mb-0">Bachelor of Science in Computer Science</h5>
           <span class="blockquote text-muted " style="font-size:2.2vh">(2022-PRESENT)</span>
            </div>
            <div class="my-2 border-start ps-3 border-gray-lightest ">
          <h5 class="mb-0">Science, Technology, Engineering, and Mathematics (STEM)</h5>
           <span class="blockquote text-muted " style="font-size:2.2vh">(GRADUATED WITH HONORS)</span>
            </div>

        <br>
        
          <h3 class="fw-bold ">OTHER INTERESTS</h3>
            <ul>
                <li>music! listening, singing, recording</li>
                <li>cute plushies</li>
                <li>pokemon franchise</li>
                <li>swimming eheh</li>
            </ul>

        <br>
        <h3 class="fw-bold ">LANGUAGES</h3>
            <div class="my-2 border-start ps-3 border-gray-lightest ">
                <p class="pl-3">    i am fluent in <span class="text-primary fw-bold"> English</span> and <span class="text-primary fw-bold"> Filipino</span>!!</p>
            </div>


      <!-- Long content continues... -->
    </div>
  </div>
</div>
