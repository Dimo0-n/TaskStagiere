# Instrucțiuni de rulare

## Cerințe preliminare

Pentru rularea aplicației sunt necesare următoarele componente:

* Java 24 sau versiune compatibilă;
* Node.js și npm;
* Docker;
* PostgreSQL (sau container Docker PostgreSQL);
* Git.

---

## Clonarea proiectului

```bash
git clone https://github.com/Dimo0-n/TaskStagiere.git
cd TaskStagiere
```

---

## Pornirea bazei de date

Aplicația utilizează PostgreSQL pentru stocarea documentelor și a datelor asociate.

Baza de date poate fi pornită utilizând Docker:

```bash
docker run -d \
  --name tehredact-db \
  -e POSTGRES_DB=tehredact \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=qwertyuiop \
  -p 5431:5432 \
  postgres:17
```
Verificarea containerului:

```bash
docker ps
```

---

## Configurarea backend-ului

În fișierul `application.properties` trebuie configurată conexiunea la baza de date:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5431/tehredact
spring.datasource.username=root
spring.datasource.password=qwertyuiop
```

---

## Pornirea backend-ului

Din directorul proiectului backend:

```bash
./gradlew bootRun
```

Aplicația va fi disponibilă la adresa:

```text
http://localhost:8080
```

---

## Pornirea frontend-ului

Din directorul frontend:

```bash
npm install
npm run dev
```

Interfața web va fi disponibilă la adresa:

```text
http://localhost:5173
```

---

## Utilizarea aplicației

1. Accesați interfața web cu:
```text
http://localhost:5173
```
2. Selectați tipul documentului dorit.
3. Completați formularul cu informațiile necesare.
4. Configurați opțiunile de formatare.
5. Generați documentul.
6. Vizualizați documentul în secțiunea de istoric.
7. Descărcați documentul în format DOCX.

---

## Observații

* Documentele generate sunt salvate în baza de date PostgreSQL.
* Istoricul documentelor este disponibil după generarea acestora.
* Funcționalitatea de export DOCX este complet implementată și poate fi utilizată pentru descărcarea documentelor generate.
