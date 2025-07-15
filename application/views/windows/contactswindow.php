<div class="mainwindow closed card" id="contactswindow">
  <div class="mainwindowheader subfont" id="contactswindowheader">
    <h4>contacts</h4>
    <button class="minimize-btn" onclick="toggleMinimize(this)">[–]</button>
    <button class="close-btn" onclick="hideWindow('contactswindow')">[×]</button>
  </div>

  <div class="mainwindowcontent card-body text-center">
    <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 p-10 justify-content-center">

      <!-- Email -->
      <div class="col">
        <a href="mailto:johanczarpagba@gmail.com" target="_blank" class="text-decoration-none text-dark d-flex flex-column align-items-center contact-link">
          <img src="<?= base_url(); ?>assets/images/mail.png" alt="Email" class="img-fluid mb-2" style="width: 60px;">
          <span>Email</span>
        </a>
      </div>

      <!-- GitHub -->
      <div class="col">
        <a href="https://github.com/yohan241" target="_blank" class="text-decoration-none text-dark d-flex flex-column align-items-center contact-link">
          <img src="<?= base_url(); ?>assets/images/github.png" alt="GitHub" class="img-fluid mb-2" style="width: 60px;">
          <span>GitHub</span>
        </a>
      </div>

      <!-- Instagram -->
      <div class="col">
        <a href="https://instagram.com/yohanpagba" target="_blank" class="text-decoration-none text-dark d-flex flex-column align-items-center contact-link">
          <img src="<?= base_url(); ?>assets/images/instagram.png" alt="Instagram" class="img-fluid mb-2" style="width: 60px;">
          <span>Instagram</span>
        </a>
      </div>

      <!-- LinkedIn -->
      <div class="col">
        <a href="https://linkedin.com/in/johan-czar-pagba-8aa858361" target="_blank" class="text-decoration-none text-dark d-flex flex-column align-items-center contact-link">
          <img src="<?= base_url(); ?>assets/images/linkedin.png" alt="LinkedIn" class="img-fluid mb-2" style="width: 60px;">
          <span>LinkedIn</span>
        </a>
      </div>

      <div class="col">
        <a href="https://www.facebook.com/jozar.pagba/" target="_blank" class="text-decoration-none text-dark d-flex flex-column align-items-center contact-link">
          <img src="<?= base_url(); ?>assets/images/facebook.png" alt="fb" class="img-fluid mb-2" style="width: 60px;">
          <span>Facebook</span>
        </a>
      </div>

      <!-- yt -->
      <div class="col">
        <a href="https://www.youtube.com/@wisttwist" target="_blank" class="text-decoration-none text-dark d-flex flex-column align-items-center contact-link">
          <img src="<?= base_url(); ?>assets/images/youtube.png" alt="yt" class="img-fluid mb-2" style="width: 60px;">
          <span>Youtube</span>
        </a>
      </div>

     

    </div>
    <hr class="my-4">

<div class="text-center">
  <p class="mb-2">you can copy my email here!</p>
  <button onclick="copyEmail()" class="btn btn-outline-primary btn-sm">
    copy email address
  </button>
  <div id="copy-feedback" class="text-success mt-2" style="display: none;">
    Email copied to clipboard!
  </div>
</div>
  </div>
</div>

