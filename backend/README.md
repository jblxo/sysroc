# Backend systému na ročníkové práce

## Požadavky

### Nainstalované balíčky

TBC

### Služby

- Běžící [server s prostředníkem pro komunikaci se službou ActiveDirectory](https://github.com/jblxo/ActiveDirectoryJWTAuthServer).

## Konfigurace

Konfigurace systému se tahá z `.env` souborů dle typu prostředí, kdy konečný název souboru je
typ prostředí + `.env` (tj. např. `development.env`).  
Pro správný běh systému je vždy potřeba takový soubor vytvořit pro každý možný typ prostředí,
pro vývoj na lokálním prostředí stačí pouze soubor `development.env`.

### Hodnoty

|               | Možnosti | Popis                                                                               |
|---------------|----------|-------------------------------------------------------------------------------------|
| `AD_ENDPOINT` | `string` | Adresa na server s běžícím prostředníkem pro komunikaci se službou ActiveDirectory. |

## Plány

- **Uživatelské účty**
  - Přihlašování (registrování) propojené skrze školní systém
  - Systém rolí a permisí (je zde pravděpodobnost detekovat žácké účty podle E-mailu)
  - Správa a přehled studentských účtů učiteli
    - Lze spravovat přístup daného žáka k systému
    - Lze se podívat na všechny práce daného žáka atd.
    - To samé platí pro učitelské účty, které budou spravované nějakým rootem
- **Projekty**
  - Vytváření projektů pouze učitelskými účty
  - Cíle se dají upravovat real time (aplikace stejně bude nejspíše single page application, ale lepší to zmínit :))
    - Parsování seznam cílů z nějakého listu?
    - Všechny cíle poté budou v nějaké “bance”, které jdou žákem nebo učitelem přetáhnout k nějakému z měsíců
    - Cíle se dají označit jako hotové či nikoliv, dají se odstranit či přidat
    - U každého měsíce lze označit, zda-li to už bylo zkonzultováno či nikoliv, přidat známku a i nějakou poznámku(?) a přidání data, kdy daná konzultace proběhla. Následuje nějaká kontrola, zda konzultace proběhla v dané datum
    - Nastavování dat konzultací nebo podle měsíců?
  - K projektu lze přiřadit učitele, učitel může vidět projekty přiřazené projektu, ale i všechny projekty
  - “Klasifikace” - přehled všech projektů v nějaké tabulce se známkami k danému měsíci a zda proběhla konzultace včas či v náhradní termín
  - Ke každému projektu možnost přidat “typ”? Jestli se jedná o web, desktopovou aplikaci atd.
- **Správa projektů**
  - K projektům lze nahrát samotný projekt, prezentace, dokumentace, analýza a dokumentace
    - Nějaké verzování těchto souborů (vlastní složka pro každého studenta)?
    - Možnost stáhnout všechny soubory v nějakém archivu?
  - Webové projekty je možné spouštět ve virtuální mašině přes Docker
    - Budou muset studenti sami vytvářet nějaký malý vlastní Docker? Nebo vytvořit nějaký builder pro skript?
    - Nejlépe by se měl přikládat validní export databáze k projektu
    - Ideálně by stačilo vytvořit pro každý projekt dockerfile. Přidali by jsme k tomu nějaký návod. Z toho by se pak vytvořil docker container, který by se nahrál na nějaký školní server
    - Možná by mohlo být i nějaké rozšíření nebo pipeline pro GitHub kde by stačilo kliknout na tlačítko u repozitáře na GitHubu
  - _Možné propojení s Gitem (GitHub / Vlastní Git server)_
    - Zobrazení readme na hlavní stránce daného projektu
    - Zobrazení commits a branches přímo na stránce projektu
    - při použití Dockeru se (webový) projekt stáhne z Gitu a spustí
    - propojení účtu v našem systému s Gitem

# Rozepsané cíle

1. **Září**

- Analýza - řešení verzování projektů, možností školy, integrace GitHubu apod.
- Analýza komunikace s Active Directory - vyřešit získávání dat ze školní databáze případné vytvoření vrstvy mezi AD a Backendem
- Výběr technologického stacku - analýza použití možný frameworků - NestJS na Backend, React/Vue SPA, Prisma jako Data Layer nad DB, Postgres/MongoDB apod.
- Analýza integrace Dockeru do řešení hostování Web. aplikací

2. **Říjen**

- Návrh vlastní DB pro účely Systému
- Wireframe
- Návrh Backendu (REST API nebo GRAPHQL)
- Výkop projektu

3. **Listopad**

- Vytvoření databáze
- Vytvoření Backendu
- Základní endpointy - login apod.
- Autentifikace
- Uživatelské účty

4. **Prosinec**

- Výkop Frontendu
- Vytváření Projektů
- Vytváření cílů
- Známkování cílů

5. **Leden**

- Management cílů tj. přesouvání cílů na jiný měsíc, mazání apod.
- Upload souborů, které jsou součástí projektu
- Výkop integrace nějakého verzovacího systému
- Možnost nahrát PHP aplikaci a hostovat ji
- Příprava na obhajoby

6. **Únor**

- Propojení s gitem
- Role
- Permise
- Přidávání učitelů k projektům

7. **Březen**

- Klasifikace
- Práce na hostování projektů - podpora NodeJS

8. **Duben**

- Podpora Laravelu a ASP.NET

9. **Květen**

- Optimalizace
- Responzivita
- Design

## Dodatečné cíle

- Možnost přiřadit více studentů k jednomu projektu
- Notifikace ohledně projektu pro daného studenta/studenty - například, že už zbývá pouze x dní, aby se dostavili ke konzultacím včas pro daný měsíc
