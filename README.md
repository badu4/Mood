# Wie funktioniert die App?

Das ist eine Progressive Web App (PWA), also eigentlich keine richtige App sondern eine Website, die sich aber wie eine App verhält.
Die Einträge werden lokal auf dem Gerät im Browser gespeichert, das funktioniert auch offline.

# Nutzung

1. Aufrufen der App: https://badu4.github.io/Mood/
2. Auf dem Handy: „Zum Startbildschirm hinzufügen“ (in Chrome: oben rechts über die drei Punkte, keine Ahnung wie das für Apple aussieht)  
3. Die Einträge werden im Browser gespeichert.
4. Ab und zu kann man die Daten als json Datei herunterladen weil sobald der Browser Cache gelöscht wird (z.B. wenn was am Code verändert wird), sind auch die Einträge weg. 
5. Die heruntergeladene json Datei lässt sich in eine excel tabelle konvertieren:
   1. excel öffnen
   2. Daten > Daten abrufen > aus Datei > von JSON > dann die heruntergeladene Datei auswählen
   3. Power query editor öffnet sich: zu Tabelle konvertieren > Trennzeichen: keine
   5. in der obersten zeile der Tabellenvorschau auf das symbol mit den pfeilen klicken, alle auswählen, ok
   6. "schließen & laden"
      
# Dateistruktur

index.html:	"Gerüst" der App also alle sichtbaren Elemente (Slider, Buttons, Textfelder)
styles.css:	Bestimmt, wie alles aussieht (Farben, Abstände, Schrift, Layout)
main.js:	Steuert die App: Klicks, Speichern, Anzeigen, Diagramm bauen
db.js:	Kümmert sich um die lokale Datenbank (IndexedDB)
sw.js:	Macht die App offlinefähig (Service Worker)
manifest.json:	PWA-Einstellungen (App-Name, Icon, Startbildschirm etc.)

# Datenschutz

Die Datenbank (IndexedDB), wo die Einträge abgespeichert werden, existiert nur im Browser des jeweiligen Geräts. D.h. von keinem anderen Gerät können die Daten abgerufen werden.
Der Code dagegen ist öffentlich zugänglich (unter https://github.com/badu4/Mood). Alle können die App auf ihrem Gerät benutzen durch Aufrufen des Links: https://badu4.github.io/Mood/

# Änderungen

Boah, ich kann einfach alles ändern!!
Willst du andere Fragen, Antwortmöglichkeiten, Darstellung, Statistiken, irgendwas? --> Let me know

# Es funktioniert nicht?

Schade
