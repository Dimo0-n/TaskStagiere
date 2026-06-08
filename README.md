# 1. Introducere

## Despre proiect

**TehRedact** este o aplicație web destinată generării automate a documentelor juridice pe baza informațiilor introduse de utilizator. Scopul principal al aplicației este simplificarea procesului de redactare a documentelor și reducerea timpului necesar completării acestora.

Utilizatorul completează un formular specific tipului de document dorit, iar aplicația generează automat documentul într-un format standardizat, gata pentru descărcare și utilizare.

În versiunea actuală, aplicația permite generarea următoarelor documente:

* Plângere;
* Procură;
* Cerere de chemare în judecată.

Aplicația oferă, de asemenea, posibilitatea personalizării formatării documentului și păstrează un istoric al documentelor generate.

<img width="1807" height="910" alt="image" src="https://github.com/user-attachments/assets/da872382-362c-481d-87dd-e87a7685c79b" />

---

# 2. Funcționalități implementate

## 2.1 Generarea documentelor juridice

Aplicația pune la dispoziția utilizatorului formulare dedicate pentru fiecare tip de document juridic disponibil. Fiecare formular conține câmpurile necesare redactării documentului și include validări pentru a preveni introducerea datelor incorecte.

După completarea formularului și confirmarea datelor, informațiile sunt transmise către backend, unde documentul este generat automat în format DOCX.

Tipurile de documente implementate sunt:

### Plângere

Permite redactarea unei plângeri către o instituție sau autoritate competentă pe baza informațiilor furnizate de utilizator.

### Procură

Permite împuternicirea unei persoane pentru reprezentarea intereselor mandatarului în anumite situații prevăzute de lege.

### Cerere de chemare în judecată

Permite redactarea unei cereri de chemare în judecată pe baza datelor reclamantului, pârâtului și a circumstanțelor prezentate.

<img width="1828" height="942" alt="image" src="https://github.com/user-attachments/assets/6a150761-10a5-43f8-8b75-4709f8f2247f" />

---

# 3. Arhitectura aplicației

Aplicația este construită pe baza unei arhitecturi de tip client-server și este împărțită în trei componente principale:

### Frontend (React)

Frontend-ul este responsabil de interacțiunea cu utilizatorul și oferă:

* formulare pentru completarea documentelor;
* configurarea opțiunilor de formatare;
* vizualizarea istoricului documentelor;
* descărcarea documentelor generate.

### Backend (Java + Spring Boot)

Backend-ul gestionează logica aplicației și este responsabil de:

* validarea datelor primite;
* generarea documentelor DOCX;
* salvarea documentelor în baza de date;
* furnizarea API-urilor utilizate de frontend.

### Baza de date (PostgreSQL)

Baza de date stochează informațiile necesare gestionării documentelor generate, inclusiv datele introduse de utilizator, setările de formatare și conținutul documentelor.

Fluxul principal al aplicației este următorul:

```text
Utilizator
     ↓
Frontend (React)
     ↓
REST API
     ↓
Backend (Spring Boot)
     ↓
PostgreSQL
```

# 4. Tehnologii utilizate

Pentru dezvoltarea aplicației au fost utilizate următoarele tehnologii:

## Frontend

* **React** – dezvoltarea interfeței utilizatorului;
* **React Hook Form** – gestionarea și validarea formularelor;
* **Axios** – comunicarea cu backend-ul prin API-uri REST;
* **Tailwind CSS** – stilizarea interfeței;
* **Lucide React** – afișarea iconițelor.

## Backend

* **Java 24** – limbajul principal de programare;
* **Spring Boot** – dezvoltarea serviciilor REST;
* **Spring Data JPA** – interacțiunea cu baza de date;
* **Hibernate** – maparea obiect-relatională (ORM);
* **Lombok** – reducerea codului repetitiv.

## Baza de date

* **PostgreSQL** – stocarea informațiilor și a documentelor generate.

## Generarea documentelor

* **Apache POI** – generarea documentelor în format DOCX.

# 5. Fluxul de generare a documentelor

Procesul de generare a documentelor este realizat în mai multe etape.

### Pasul 1 – Completarea formularului

Utilizatorul selectează tipul documentului dorit și completează formularul corespunzător.

Pe lângă datele specifice documentului, utilizatorul poate configura și opțiunile de formatare, precum:

* fontul;
* dimensiunea fontului;
* marginile paginii;
* alinierea textului;
* spațierea dintre rânduri.

<img width="1828" height="942" alt="image" src="https://github.com/user-attachments/assets/28ede7a0-a732-4240-b24f-58fdf969b210" />


### Pasul 2 – Trimiterea datelor către backend

După completarea formularului, datele sunt trimise către backend prin intermediul unei cereri HTTP.

Datele sunt transmise sub forma unui obiect care conține:

* informațiile documentului;
* setările de formatare selectate de utilizator.

### Pasul 3 – Generarea documentului

Backend-ul validează datele primite și generează documentul DOCX utilizând biblioteca Apache POI.

În această etapă sunt aplicate:

* structura documentului;
* stilurile textului;
* marginile paginii;
* alinierea și spațierea.

### Pasul 4 – Salvarea documentului

Documentul generat este descarcat pentru prima data ca fisier DOCX si se salveaza sin folderul /Downloads si poate fi 
vizualizat deodata de catre user.Totodata documentul generat este convertit si într-un șir de octeți (*byte array*) și 
este salvat în baza de date împreună cu informațiile asociate.

### Pasul 5 – Accesarea documentului

Documentele salvate sunt afișate în pagina de istoric, de unde utilizatorul poate:

* previzualiza documentul;
* descărca documentul în format DOCX;
* descărca documentul în format PDF;
  
  <img width="851" height="323" alt="image" src="https://github.com/user-attachments/assets/24b5631f-a473-4f24-a1ee-bb4947a12631" />

# 6. Structura bazei de date

Pentru stocarea informațiilor au fost create 4 tabele specializate.

1. complaints
2. power_of_attorney
3. statement_of_claims
4. formatting_settings

<img width="763" height="765" alt="image" src="https://github.com/user-attachments/assets/5055e7f0-fcd7-4353-ade8-120e03766552" />


