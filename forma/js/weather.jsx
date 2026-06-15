/* ============================================================
   WEATHER + CLOCK — real NYC data via Open-Meteo (keyless, CORS)
   window.WX = { useWeather, useClock, wxEmoji, wxLabel }
   ============================================================ */
(function () {
const { useState, useEffect } = React;
const CACHE_KEY = 'fc.weather.nyc';
const URL = 'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006' +
  '&current=temperature_2m,weather_code,is_day' +
  '&daily=temperature_2m_max,temperature_2m_min,weather_code' +
  '&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=16';

const CODES = {
  0: ['Clear', '\u2600\ufe0f'], 1: ['Mostly clear', '\ud83c\udf24\ufe0f'], 2: ['Partly cloudy', '\u26c5'], 3: ['Overcast', '\u2601\ufe0f'],
  45: ['Fog', '\ud83c\udf2b\ufe0f'], 48: ['Fog', '\ud83c\udf2b\ufe0f'],
  51: ['Drizzle', '\ud83c\udf26\ufe0f'], 53: ['Drizzle', '\ud83c\udf26\ufe0f'], 55: ['Drizzle', '\ud83c\udf26\ufe0f'],
  61: ['Rain', '\ud83c\udf27\ufe0f'], 63: ['Rain', '\ud83c\udf27\ufe0f'], 65: ['Heavy rain', '\ud83c\udf27\ufe0f'],
  71: ['Snow', '\ud83c\udf28\ufe0f'], 73: ['Snow', '\ud83c\udf28\ufe0f'], 75: ['Snow', '\ud83c\udf28\ufe0f'],
  80: ['Showers', '\ud83c\udf26\ufe0f'], 81: ['Showers', '\ud83c\udf26\ufe0f'], 82: ['Showers', '\ud83c\udf26\ufe0f'],
  95: ['Storm', '\u26c8\ufe0f'], 96: ['Storm', '\u26c8\ufe0f'], 99: ['Storm', '\u26c8\ufe0f'],
};
const wxLabel = (c) => (CODES[c] || ['\u2014', ''])[0];
const wxEmoji = (c) => (CODES[c] || ['', '\ud83c\udf21\ufe0f'])[1];

function useWeather() {
  const [wx, setWx] = useState(() => {
    try { const c = JSON.parse(localStorage.getItem(CACHE_KEY)); if (c && Date.now() - c.t < 36e5) return c.data; } catch (e) {}
    return null;
  });
  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (cached && Date.now() - cached.t < 36e5) { if (live) setWx(cached.data); return; }
        const r = await fetch(URL);
        const j = await r.json();
        const daily = {};
        (j.daily.time || []).forEach((d, i) => { daily[d] = { hi: Math.round(j.daily.temperature_2m_max[i]), lo: Math.round(j.daily.temperature_2m_min[i]), code: j.daily.weather_code[i] }; });
        const data = { current: { temp: Math.round(j.current.temperature_2m), code: j.current.weather_code, day: j.current.is_day }, daily };
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), data })); } catch (e) {}
        if (live) setWx(data);
      } catch (e) { /* offline / blocked — leave null */ }
    })();
    return () => { live = false; };
  }, []);
  return wx;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000 * 15); return () => clearInterval(id); }, []);
  const time = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString('en-US', { timeZone: 'America/New_York', weekday: 'long', month: 'long', day: 'numeric' });
  return { time, date };
}

window.WX = { useWeather, useClock, wxEmoji, wxLabel };
})();
