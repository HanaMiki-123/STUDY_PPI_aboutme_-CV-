document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("bg-music");
    const soundBtn = document.getElementById("sound-btn");
    let isPlaying = false;

    soundBtn.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            soundBtn.classList.remove("playing");
        } else {
            audio.play().catch(error => console.log("Audio play failed:", error));
            soundBtn.classList.add("playing");
        }
        isPlaying = !isPlaying;
    });

    const langBtn = document.getElementById("lang-btn");
    const langText = document.getElementById("lang-text");
    
    let currentLang = 'en';
    langBtn.addEventListener("click", () => {
        if (currentLang === 'en') {
            currentLang = 'km';
            langText.textContent = 'English';
        } else {
            currentLang = 'en';
            langText.textContent = 'ខ្មែរ';
        }
        loadLanguage(currentLang);
    });

    function loadLanguage(lang) {
        const jsonFile = lang === 'en' ? "./src/json/index.json" : "./src/json/index_km.json";

        document.documentElement.setAttribute("lang", lang);
        document.getElementById("cv-wrapper").innerHTML = "<div class='loading-spinner'>Loading CV...</div>";

        fetch(jsonFile)
            .then(response => response.json())
            .then(data => {
                renderCV(data);
            })
            .catch(error => {
                console.error("Error loading CV data:", error);
                document.getElementById("cv-wrapper").innerHTML = "<p style='text-align:center;'>Error loading CV data. Please try again.</p>";
            });
    }
    loadLanguage(currentLang);
});

function renderCV(data) {
    const wrapper = document.getElementById("cv-wrapper");

    let html = `
    <div class="slide-down-anim">
        <!-- Header -->
        <div class="header">
            <div class="avatar">
                <img src="${data.header.avatar}" alt="profile image">
            </div>
            <div class="header-info">
                <h1>${data.header.name}</h1>
                <p><i class="ti ti-map-pin"></i>${data.header.address}</p>
                <a href="tel:${data.header.phoneLink}">
                    <div class="phone-badge"><i class="ti ti-phone"></i>${data.header.phone}</div>
                </a>
            </div>
        </div>

        <!-- Personal Data -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.personalData.iconBg}">
                    <i class="ti ${data.personalData.icon}" style="color:${data.personalData.iconColor}"></i>
                </span>
                <h2>${data.personalData.title}</h2>
            </div>
            ${data.personalData.details.map(item => `
                <div class="row">
                    <span class="row-label"><i class="ti ${item.icon}"></i>${item.label}</span>
                    <span class="row-val">${item.value}</span>
                </div>
            `).join('')}
        </div>

        <!-- Education -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.education.iconBg}">
                    <i class="ti ${data.education.icon}" style="color:${data.education.iconColor}"></i>
                </span>
                <h2>${data.education.title}</h2>
            </div>
            <div class="timeline">
                ${data.education.items.map(item => `
                    <div class="tl-item">
                        <p class="tl-title">${item.school}</p>
                        <p class="tl-sub">${item.period}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Languages -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.languages.iconBg}">
                    <i class="ti ${data.languages.icon}" style="color:${data.languages.iconColor}"></i>
                </span>
                <h2>${data.languages.title}</h2>
            </div>
            <div class="lang-cards">
                ${data.languages.items.map(item => `
                    <div class="lang-card">
                        <p class="lang-name"><span>${item.name}</span></p>
                        <div class="bar-track">
                            <div class="bar-fill" style="--target-width:${item.percentage}%; animation-delay:${item.delay}"></div>
                        </div>
                        <p class="lang-level">${item.level}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Professional Skills -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.professionalSkills.iconBg}">
                    <i class="ti ${data.professionalSkills.icon}" style="color:${data.professionalSkills.iconColor}"></i>
                </span>
                <h2>${data.professionalSkills.title}</h2>
            </div>
            <p class="text-muted-desc">${data.professionalSkills.description}</p>
        </div>

        <!-- Work Experience -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.workExperience.iconBg}">
                    <i class="ti ${data.workExperience.icon}" style="color:${data.workExperience.iconColor}"></i>
                </span>
                <h2>${data.workExperience.title}</h2>
            </div>
            <p class="text-muted-desc">${data.workExperience.description}</p>
        </div>

        <!-- Hobbies -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.hobbies.iconBg}">
                    <i class="ti ${data.hobbies.icon}" style="color:${data.hobbies.iconColor}"></i>
                </span>
                <h2>${data.hobbies.title}</h2>
            </div>
            ${data.hobbies.items.map(item => `
                <div class="hobby-item">
                    <i class="ti ${item.icon}"></i>
                    <span>${item.text}</span>
                </div>
            `).join('')}

            <div class="badges">
                ${data.hobbies.badges.map(badge => `
                    <span class="badge ${badge.colorClass}">${badge.text}</span>
                `).join('')}
            </div>

            <div class="goal-box">
                <p class="goal-label"><i class="ti ti-target"></i>Goal</p>
                <p class="goal-text">${data.hobbies.goal}</p>
            </div>
        </div>

        <!-- Reference -->
        <div class="section">
            <div class="sec-head">
                <span class="sec-icon" style="background:${data.reference.iconBg}">
                    <i class="ti ${data.reference.icon}" style="color:${data.reference.iconColor}"></i>
                </span>
                <h2>${data.reference.title}</h2>
            </div>
            ${data.reference.cards.map(ref => `
                <div class="ref-card">
                    <div class="ref-avatar">
                        <img src="${ref.initials}" style="width: 100%; height: 100%; border-radius: 50%;" alt="profile image">
                    </div>
                    <div class="ref-info-container">
                        <p class="ref-name">${ref.name}</p>
                        <a href="${ref.mapLink}" target="_blank">
                            <p class="ref-info"><i class="ti ti-map-pin"></i>${ref.position}</p>
                        </a>
                        <a href="tel:${ref.phoneLink}">
                            <p class="ref-info"><i class="ti ti-phone"></i>${ref.phone}</p>
                        </a>
                        <a href="mailto:${ref.email}">
                            <p class="ref-email"><i class="ti ti-mail"></i>${ref.email}</p>
                        </a>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="footer-socials">
                ${data.footer.socials.map(social => `
                    <a href="${social.link}" target="_blank" class="footer-social" title="${social.title}">
                        <i class="${social.icon}"></i>
                    </a>
                `).join('')}
            </div>
            <p class="copyright">${data.footer.copyright}</p>
        </footer>
    </div>
    `;

    wrapper.innerHTML = html;
}
