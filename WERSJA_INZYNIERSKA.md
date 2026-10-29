# emisja-co2-app: kontrola integralności wydania bez udawania źródeł

Branch: `wersja-inzynierska-2026`. Stan bazowy: `main` / `1c6941fd704e30f18dce0f7a33a88a15ca6bb6b3`. Data wykonania: 29.10.2026.

To autorski wariant rozwojowy konkretnego fragmentu projektu. Branch zachowuje pełne drzewo kodu z wersji bazowej i zawiera opisane poniżej zmiany. [Wcześniejszy audyt](https://github.com/MichalGarnuch/emisja-co2-app/tree/audyt-edukacyjny-2026) jest na osobnym branchu. Nie wykonywano merge ani wdrożenia.

## Rzeczywisty charakter repozytorium

To repozytorium zawiera gotowy artefakt aplikacji. Z minifikowanego pakietu nie da się wiarygodnie odzyskać pierwotnych komponentów, komentarzy, testów ani procesu budowania. Dlatego moja wersja dodaje kontrolę pochodzenia i integralności istniejącego wydania.

`release-manifest.json` zawiera bazowy commit artefaktu, ścieżki 19 plików uruchomieniowych, rozmiary i SHA-256. `sourceCommit` pozostaje jawnie `null`: źródłowego commitu nie ustalono. Manifest nie przypisuje artefaktowi niepotwierdzonego pochodzenia.

## Jak działa kontrola

`scripts/verify-release.mjs` odczytuje pliki strumieniowo, sprawdza rozmiar i oblicza skrót. Nie ładuje całych dużych pakietów do pamięci. Odrzuca ścieżki wychodzące poza katalog oraz niepoprawny format wpisu. Działa na ścieżkach plikowych z `fileURLToPath`, również tam, gdzie URL i ścieżka systemu różnią się kodowaniem lub składnią.

Jeżeli któregokolwiek pliku brakuje albo zmieni się choć jeden bajt, polecenie kończy się kodem błędu. Samo przeliczenie nowego manifestu nie jest sposobem naprawienia nieznanej modyfikacji: trzeba najpierw ustalić źródło zmiany.

## Zaufanie i wdrożenie

Uruchom `node --test scripts/*.test.mjs` i `node scripts/verify-release.mjs`. Pierwsze polecenie sprawdza wykrywanie podmienionych bajtów i próbę wyjścia przez `..`; drugie weryfikuje faktyczny zestaw plików.

Hash przechowywany obok pliku wykrywa przypadkową zmianę, ale nie potwierdza autora. Kto zmienia pliki i manifest, może wyliczyć nowe skróty. Docelowo manifest powinien powstawać w CI z repozytorium źródłowego, zawierać commit źródeł i wersję narzędzi oraz być powiązany z podpisanym wydaniem. Kolejnym krokiem jest odnalezienie projektu źródłowego i publikacja reprodukowalnego procesu budowania. Ten branch nie dodaje fikcyjnego kodu aplikacji do dystrybucji.

## Weryfikacja wykonana w tej sesji

| Sprawdzenie | Wynik i znaczenie |
|---|---|
| node --test scripts/*.test.mjs | PASS: test podmiany zawartości i ścieżki poza katalog |
| node scripts/verify-release.mjs | PASS: 19 oryginalnych plików runtime |

### Granice weryfikacji

Brak źródeł, więc nie wykonano testów jednostkowych aplikacji ani rebuilda. Manifest nie jest podpisem kryptograficznym autora i nie jest sandboxem do uruchamiania niezaufanych pakietów.

## Mapa zmian

- [`release-manifest.json`](release-manifest.json)
- [`scripts/verify-release.mjs`](scripts/verify-release.mjs)
- [`scripts/verify-release.test.mjs`](scripts/verify-release.test.mjs)
