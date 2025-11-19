// main.js
import { addEntry, getAllEntries, deleteEntry } from './db.js';

const moodRange = document.getElementById('moodRange');
const moodValue = document.getElementById('moodValue');
const sleep = document.getElementById('sleep');
const noteEl = document.getElementById('note');
const saveBtn = document.getElementById('saveBtn');
const entriesList = document.getElementById('entriesList');
const exportBtn = document.getElementById('exportBtn');
const chartCanvas = document.getElementById('chart');

let moodChart = null;
let sleepChart = null;


moodRange.addEventListener('input', () => moodValue.textContent = moodRange.value);
saveBtn.addEventListener('click', saveEntry);
exportBtn.addEventListener('click', exportData);

async function saveEntry() {
  const entry = {
    date: new Date().toISOString(),
    mood: Number(moodRange.value),
    note: noteEl.value || '',
    sleep: Number(sleep.value)  
  };
  await addEntry(entry);
  noteEl.value = '';
  await refresh();
}

async function refresh() {
  const entries = await getAllEntries();
  renderList(entries);
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = Number(btn.getAttribute('data-id'));
      await deleteEntry(id);
      await refresh();
    });
  });
  renderMoodChart(entries);
  renderSleepChart(entries);

}

function renderList(entries) {
  entriesList.innerHTML = '';
  for (const e of entries) {
    const li = document.createElement('li');
    const d = new Date(e.date);
    li.innerHTML = `
      <strong>${d.toLocaleString()}</strong>
      — Stimmung: ${e.mood}
      — Schlaf: ${e.sleep}h
      <button data-id="${e.id}" class="deleteBtn" style="float:right;">🗑️</button>
      <div>${e.note || ''}</div>
    `;
    entriesList.appendChild(li);
  }
}

function renderMoodChart(entries) {
  const ctx = document.getElementById('moodChart').getContext('2d');

  const labels = entries.map(e => new Date(e.date).toLocaleDateString());
  const moods = entries.map(e => e.mood);

  if (moodChart) moodChart.destroy();

  moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Stimmung',
        data: moods,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          min: 1,
          max: 10,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

function renderSleepChart(entries) {
  const ctx = document.getElementById('sleepChart').getContext('2d');

  const labels = entries.map(e => new Date(e.date).toLocaleDateString());
  const sleepValues = entries.map(e => e.sleep);

  if (sleepChart) sleepChart.destroy();

  sleepChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Schlaf (Stunden)',
        data: sleepValues,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 12,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}

async function exportData() {
  const entries = await getAllEntries();
  const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mood-export-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('SW registered');
    }).catch(e => console.warn('SW failed', e));
  });
}

refresh();
