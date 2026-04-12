# Species Data

Esta carpeta guarda la fuente de datos editorial de las especies de Kodama.

Principios:
- Un archivo JSON por especie.
- El nombre del archivo debe coincidir con el `slug`.
- El formato sigue una plantilla simple por bloques: `placement`, `temperature`, `watering`, `fertilizing`, `pruning`, `repotting`, `substrate`, `risks`.
- Los datos estructurales van en el nivel raíz.
- Los textos traducibles viven dentro de `translations`.

Ejemplo:
- `acebuche.json`

Locales actuales recomendados:
- `es`
- `en`
- `ja`

Convenciones:
- Meses como enteros del `1` al `12`.
- Enums exactamente como los espera Prisma.
- `null` cuando un dato no aplique o no sea seguro.
- `frequencyDays` puede ser un número o `null`.
- `risks` usa códigos simples como `indoor`, `low_light`, `overwatering`.

Estructura recomendada:
- `slug`
- `placement`
- `temperature`
- `watering`
- `fertilizing`
- `pruning`
- `repotting`
- `substrate`
- `risks`
- `translations.es`
- `translations.en`
- `translations.ja`
