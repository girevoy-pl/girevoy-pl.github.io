// Sprawdzanie, czy użytkownik zaakceptował cookies
function userHasConsentedToCookies() {
    return document.cookie.split('; ').find(row => row.startsWith('cookiesAccepted='));
}

// Funkcja ładowania Google Analytics
function enableAnalytics() {
    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-BQZ54DGX70";
    script.async = true;
    document.head.appendChild(script);

    script.onload = function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-BQZ54DGX70', { 'anonymize_ip': true });
    };
}

// Wyświetlanie bannera, jeśli użytkownik jeszcze nie zaakceptował cookies
if (!userHasConsentedToCookies()) {
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML = `
        <span>
            Ta strona używa plików cookie do analizy ruchu. Klikając "Akceptuj", wyrażasz zgodę na używanie przez nas plików cookie. <a href="/polityka-prywatnosci">Dowiedz się więcej</a>.
        </span>
        <button id="accept-cookies">Akceptuj</button>
    `;
    document.body.appendChild(banner);

    // Zdarzenie kliknięcia przycisku "Akceptuj"
    document.getElementById('accept-cookies').addEventListener('click', function () {
        // Zapisujemy zgodę w pliku cookie na 90 dni
        document.cookie = "cookiesAccepted=true; path=/; max-age=" + 60 * 60 * 24 * 90; // 90 dni
        banner.style.display = 'none'; // Ukrywamy banner
        enableAnalytics(); // Ładujemy Google Analytics po zaakceptowaniu
    });
} else {
    // Jeśli użytkownik już zaakceptował cookies, ładowanie Google Analytics
    enableAnalytics();
}
