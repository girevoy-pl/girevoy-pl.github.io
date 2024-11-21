// Wyświetlanie bannera
if (!document.cookie.split('; ').find(row => row.startsWith('cookiesAccepted='))) {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <span>
            Ta strona używa plików cookie do analizy ruchu. Klikając "Akceptuj", wyrażasz zgodę na używanie przez nas plików cookie. <a href="/polityka-prywatnosci">Dowiedz się więcej</a>.
        </span>
        <button id="accept-cookies">Akceptuj</button>
    `;
    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', function () {
        document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60 * 60 * 24 * 90; // 90 days
        banner.style.display = 'none';
        loadGoogleAnalytics();
    });
} else {
    loadGoogleAnalytics();
}

// Funkcja ładowania Google Analytics
function loadGoogleAnalytics() {
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-BQZ54DGX70";
    script.async = true;
    document.head.appendChild(script);

    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-BQZ54DGX70');
    };
}
