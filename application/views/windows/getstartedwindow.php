

<div class="mainwindow active homeframe" id="main">
    <div class="mainwindowheader subfont homeframeheader " id="mainheader">
        <h4>shortcuts</h4>

    </div>
    <div class="mainwindowcontent homeframecontent">
        <div class="container-fluid vh-50 d-flex justify-content-center align-items-center">
            <div class="desktop-grid d-flex flex-wrap justify-content-center gap-4">
                <div class="desktop-icon" onclick="loadWindowByName('home', 'homewindow')">
                <img src="<?= base_url(); ?>assets/images/home.png" alt="Home">
                <span>Home</span>
                </div>
                <div class="desktop-icon" onclick="loadWindowByName('about', 'aboutmewindow')">
                <img src="<?= base_url(); ?>assets/images/information.png" alt="About">
                <span>About Me</span>
                </div>
                <div class="desktop-icon" onclick="loadWindowByName('work', 'workwindow')">
                <img src="<?= base_url(); ?>assets/images/archive.png" alt="Projects">
                <span>Work</span>
                </div>
                <div class="desktop-icon" onclick="loadWindowByName('games', 'gameswindow')">
                <img src="<?= base_url(); ?>assets/images/launch.png" alt="Games">
                <span>Games</span>
                </div>
                <div class="desktop-icon" onclick="loadWindowByName('contacts', 'contactswindow')">
                <img src="<?= base_url(); ?>assets/images/email.png" alt="Contact Me">
                <span>Contact Me</span>
                </div>
                <!-- Add more icons as needed -->
            </div>
        </div>

    </div>
</div>