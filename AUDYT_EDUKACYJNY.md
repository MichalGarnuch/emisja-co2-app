# emisja-co2-app — przewodnik i audyt edukacyjny

**Stan przeglądu:** 29 października 2026 r.  
**Gałąź bazowa:** `main`  
**Analizowany commit:** `1c6941fd704e30f18dce0f7a33a88a15ca6bb6b3`  
**Mapa wszystkich plików śledzonych przez Git:** [1](AUDYT_MAPA_01.md)

> To jest przegląd reprezentatywnych części projektu z inwentaryzacją wszystkich śledzonych plików, a nie pełna, ręczna weryfikacja każdego wiersza ani certyfikat bezpieczeństwa. Mapa jest automatyczna; wymienienie pliku nie oznacza, że został przetestowany lub dokładnie przeczytany. Wyniki odnoszą się do powyższego commita. Inne gałęzie mogą zawierać inne wersje.

## Co robi projekt

Repozytorium zbudowanej wersji aplikacji śladu węglowego publikowanej przez GitHub Pages.

## Jak czytać kod i jak przepływają dane

[`index.html`](index.html) ładuje wynikowy kod z [`assets/`](assets); [`models/`](models) i [`ort/`](ort) zawierają model i środowisko wnioskowania, a [`sw.js`](sw.js) obsługuje pracę PWA. Źródłowy projekt znajduje się w osobnym repozytorium `emisja-co2`.

Podczas czytania zacznij od punktu wejścia, przejdź do funkcji odpowiadającej za żądanie lub działanie użytkownika, a potem do operacji na danych i wyniku. Mapa plików podaje ścieżki i automatycznie rozpoznane nazwy wybranych deklaracji.

## Co jest wartościowe w obecnym rozwiązaniu

Rozdzielenie źródeł i statycznego wyniku umożliwia hostowanie aplikacji bez serwera aplikacyjnego.

## Ustalenia, luki i proponowany rozwój

- **Potwierdzone — artefakt:** README wskazuje, że to wynik budowania, a nie komplet czytelnych źródeł. Poprawki logiki należy wykonywać w repozytorium źródłowym, następnie ponownie budować i publikować.

- **Do rozwoju:** opisać identyfikator commita źródłowego i powtarzalną procedurę wydania, aby sprawdzić, która wersja obliczeń trafiła na Pages. Sprawdzać aktualizację cache service workera i licencje modelu.

## Sprawdzenia i ich granice

Nie wykonano testu działania modelu w przeglądarce ani porównania artefaktu z konkretnym buildem źródeł. Oceniono strukturę i README.

W kopii roboczej dostępne pliki Pythona sprawdzono dodatkowo parserem składni; sprawdzono też składnię odczytanych plików `package.json` i `composer.json`. Nie zastępuje to uruchomienia programu. Kod źródłowy tej gałęzi jest taki sam jak w commicie bazowym; dodane są wyłącznie dokumenty audytu i mapy.

## Jak zaplanować kolejne prace

Najpierw zajmij się punktami oznaczonymi jako krytyczne lub wysokie, następnie ustal, które uwagi wymagają testu na pełnym środowisku. Dla każdej zmiany przygotuj osobną gałąź, konkretny przypadek odtwarzający problem i test rezultatu. Nie traktuj propozycji jako potwierdzenia, że poprawka została już wdrożona.
